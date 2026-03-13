const express = require('express');
const cors = require('cors');
const { db, admin } = require('./firebase');

const app = express();
const PORT = 5000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Scoring system for green credits
const SCORES = {
  plastic: 8,
  paper: 5,
  metal: 15,
  ewaste: 20
};

/**
 * 1. POST /society/register
 * Register a new society
 */
app.post('/society/register', async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ error: "Name and location are required." });
    }

    const societyRef = db.collection('societies').doc();
    const societyData = {
      id: societyRef.id,
      name,
      location,
      totalCredits: 0
    };

    await societyRef.set(societyData);
    res.status(201).json(societyData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 2. POST /pickup/request
 * Request a pickup for a society
 */
app.post('/pickup/request', async (req, res) => {
  try {
    const { societyId, societyName, location, wasteType } = req.body;
    if (!societyId || !wasteType) {
      return res.status(400).json({ error: "societyId and wasteType are required." });
    }

    const pickupRef = db.collection('pickups').doc();
    const pickupData = {
      id: pickupRef.id,
      societyId,
      societyName: societyName || "Unknown Society",
      location: location || "No location provided",
      wasteType,
      weight: 0,
      status: "requested",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await pickupRef.set(pickupData);
    res.status(201).json(pickupData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 3. POST /pickup/confirm
 * Kabadiwala confirms pickup, updates weight, and calculates credits
 */
app.post('/pickup/confirm', async (req, res) => {
  try {
    const { pickupId, weight } = req.body;
    if (!pickupId || weight === undefined) {
      return res.status(400).json({ error: "pickupId and weight are required." });
    }

    const pickupRef = db.collection('pickups').doc(pickupId);
    const pickupDoc = await pickupRef.get();

    if (!pickupDoc.exists) {
      return res.status(404).json({ error: "Pickup not found." });
    }

    const pickupData = pickupDoc.data();
    const wasteType = pickupData.wasteType.toLowerCase();
    
    // Calculate credits
    const scorePerKg = SCORES[wasteType] || 0;
    const credits = weight * scorePerKg;

    // Update pickup status
    await pickupRef.update({
      status: "completed",
      weight: weight
    });

    // Update society total credits
    const societyId = pickupData.societyId;
    const societyRef = db.collection('societies').doc(societyId);
    
    await societyRef.update({
      totalCredits: admin.firestore.FieldValue.increment(credits)
    });

    res.status(200).json({
      message: "Pickup confirmed",
      creditsGenerated: credits
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 4. GET /pickups
 * Get all pickups (for Kabadiwala dashboard)
 */
app.get('/pickups', async (req, res) => {
  try {
    const pickupsSnapshot = await db.collection('pickups')
      .orderBy('createdAt', 'desc')
      .get();

    const pickups = pickupsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(pickups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 5. GET /leaderboard
 * Get societies sorted by totalCredits descending
 */
app.get('/leaderboard', async (req, res) => {
  try {
    const societiesSnapshot = await db.collection('societies')
      .orderBy('totalCredits', 'desc')
      .get();

    const leaderboard = societiesSnapshot.docs.map(doc => ({
      name: doc.data().name,
      totalCredits: doc.data().totalCredits
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

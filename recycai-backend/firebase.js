const admin = require('firebase-admin');

// IMPORTANT: Download your service account key from Firebase Console
// (Project Settings > Service Accounts > Generate new private key)
// and save it as 'serviceAccountKey.json' in the project root.

try {
  const serviceAccount = require('./serviceAccountKey.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  console.log("✅ Firebase Admin initialized successfully.");
} catch (error) {
  console.error("❌ Firebase Admin initialization failed.");
  console.log("\nINSTRUCTIONS:");
  console.log("1. Go to Firebase Console > Project Settings > Service Accounts.");
  console.log("2. Click 'Generate new private key'.");
  console.log("3. Save the JSON file as 'serviceAccountKey.json' inside the 'recycai-backend' folder.");
  console.log("\nTechnical Error:", error.message);
}

// Export db only if admin is initialized (or export null to let server fail gracefully)
let db;
try {
  db = admin.firestore();
} catch (e) {
  db = null;
}

module.exports = { db, admin };

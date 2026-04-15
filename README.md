# EcoLoop

**Competitive Municipal Recycling Platform**

EcoLoop is a full-stack web application that digitises the municipal solid waste recycling pipeline. It connects housing societies (waste generators) with authorised recycling collectors, rewards verified recycling behaviour through a Green Credits system, and surfaces community performance on a citywide leaderboard.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution Overview](#solution-overview)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Green Credits System](#green-credits-system)
6. [AI-Powered Modules](#ai-powered-modules)
7. [Technology Stack](#technology-stack)
8. [Project Structure](#project-structure)
9. [API Reference](#api-reference)
10. [Setup and Installation](#setup-and-installation)
11. [Environment Variables](#environment-variables)
12. [Future Roadmap](#future-roadmap)
13. [License](#license)

---

## Problem Statement

Recyclable materials are routinely discarded into general waste streams due to three compounding factors:

- Households lack a convenient, trusted channel to connect with authorised waste collectors.
- There is no measurable incentive for responsible segregation and disposal at the source.
- Municipal recycling data is fragmented, making it difficult to track progress or foster community accountability.

Informal collectors (commonly known as *kabadiwala*) handle the bulk of last-mile recycling in Indian cities but operate without digital tools, preventing them from managing requests or logging accurate weights at scale.

---

## Solution Overview

EcoLoop introduces a structured digital layer over the existing informal recycling network:

- **Frictionless Scheduling** — Registered societies request pickups in seconds, selecting the waste type from a standardised list.
- **Verified Weight Logging** — Collectors confirm pickups by entering the actual weight, which triggers automatic credit calculation.
- **Green Credits** — A point-based reward system that assigns credits per kilogram based on the environmental impact of each waste type.
- **Gamification** — Societies earn achievement badges as their recycling history grows and compete on a live municipal leaderboard.
- **Analytics** — Interactive dashboards display monthly recycling trends, waste composition breakdowns, and EPA-standard CO2 savings estimates.
- **AI-Assisted Features** — An image-based waste classifier identifies the waste type from a photograph and provides recycling guidance. An in-app conversational assistant (EcoBot) answers recycling and platform queries in real time using a locally hosted large language model.

---

## Architecture

```
Browser (React + Vite)
        |
        | HTTP / SSE
        v
Express API Server (Node.js, port 5000)
        |                   |
        v                   v
Firebase Firestore    Ollama (localhost:11434)
(societies,           llama3.2 — EcoBot chat
 pickups,
 collectors)
        |
        v
Python Inference Script (TensorFlow / Keras)
waste_detector/predict.py — image classification
```

All components run locally. No third-party AI API keys or paid services are required.

---

## Features

### Society Portal

- Register a housing society with name and location.
- Request a waste pickup by selecting from 13 waste categories.
- View all pickup requests (pending, accepted, completed) in a live-updating table.
- Track lifetime statistics: total Green Credits earned, total weight recycled, total CO2 saved, and number of pickups.
- Visualise recycling data via an interactive monthly line chart and waste composition donut chart (Recharts).
- Unlock achievement badges automatically as recycling milestones are reached.
- View the society's unique identifier for future logins.

### Collector Portal

- View all incoming pickup requests assigned to the collector.
- Accept requests and confirm pickups by entering the measured weight.
- Credits are automatically calculated and awarded to the requesting society on confirmation.

### Leaderboard

- Displays all registered societies ranked by total Green Credits in descending order.
- Accessible without login, providing public visibility into citywide performance.

### Home Page

- Immersive scrollytelling hero section with scroll-driven animations.
- Live citywide statistics fetched from the backend (waste diverted, active societies, credits issued).
- Sections covering estimated material values, platform features, the credit milestone reward programme, the Reduce-Reuse-Recycle principles, a step-by-step workflow guide, and a recycling tips panel with an animated decomposition timeline.

---

## Green Credits System

Credits are awarded per kilogram of waste by type, calibrated to reflect relative environmental impact and processing difficulty.

| Waste Type              | Credits per kg |
|-------------------------|----------------|
| Chemicals               | 35             |
| Medical / Bio-hazard    | 30             |
| Batteries               | 25             |
| E-Waste                 | 20             |
| Metal                   | 15             |
| Glass                   | 6              |
| Fabric / Textile        | 7              |
| Plastic                 | 8              |
| Paper / Cardboard       | 5              |
| Rubber                  | 5              |
| Wood                    | 4              |
| Organic / Food Waste    | 3              |
| Construction debris     | 3              |

### Achievement Badges

Badges are awarded dynamically based on the society's pickup history:

| Badge           | Condition                                         |
|-----------------|---------------------------------------------------|
| First Step      | First completed pickup                            |
| Consistent      | Five or more completed pickups                    |
| Green Champion  | Ten or more completed pickups                     |
| E-Warrior       | At least one completed e-waste pickup             |
| Century Club    | 100 kg or more of total verified waste recycled   |

### CO2 Savings Calculation

CO2 savings are estimated using EPA-aligned offset factors applied per waste type (e.g., metal: 4.0 kg CO2/kg, e-waste: 20.0 kg CO2/kg). These figures are displayed on the society dashboard.

---

## AI-Powered Modules

### Waste Image Classifier

- Endpoint: `POST /detect-waste`
- Accepts an image upload (JPEG, PNG, up to 10 MB).
- Passes the image to `waste_detector/predict.py`, a TensorFlow/Keras inference script using the `MINC_best.keras` model.
- Returns the predicted waste category, decomposition time estimate, recycling guidance, and model confidence score.
- The result is mapped to one of the 13 supported waste types for consistent downstream handling.

### EcoBot — Conversational Recycling Assistant

- Endpoint: `POST /api/chat`
- Responds over a Server-Sent Events (SSE) stream for real-time token-by-token display.
- Powered by Ollama running `llama3.2` locally — no API key or internet connection required after initial model download.
- System prompt restricts the assistant strictly to recycling, waste disposal, EcoLoop features, and Indian municipal context.
- Credit values, badge names, and CO2 figures in the prompt match the application's backend exactly.
- The widget floats persistently across all pages of the application.

---

## Technology Stack

### Frontend

| Library / Tool | Purpose |
|----------------|---------|
| React 18 (Vite) | UI framework and build tooling |
| Tailwind CSS | Utility-first styling |
| Lucide React | Icon library |
| Recharts | Interactive data visualisation (line chart, donut chart) |
| Axios | HTTP client for API calls |

### Backend

| Library / Tool | Purpose |
|----------------|---------|
| Node.js | Runtime |
| Express 5 | HTTP server and routing |
| Firebase Admin SDK | Firestore database access |
| Multer | Multipart image upload handling |
| Native `fetch` (Node 18+) | Proxying SSE stream to Ollama |

### AI and Machine Learning

| Tool | Purpose |
|------|---------|
| TensorFlow / Keras (Python) | Waste image classification model |
| Ollama | Local LLM runtime |
| llama3.2 | Conversational AI model for EcoBot |

### Database

| Service | Purpose |
|---------|---------|
| Firebase Firestore | NoSQL document store for societies, pickups, and collectors |

---

## Project Structure

```
PBL/
|
+-- recycai-frontend/               React application (Vite)
|   +-- public/
|   +-- src/
|   |   +-- assets/                 Logo and static images
|   |   +-- components/
|   |   |   +-- BadgesSection.jsx   Achievement badge display
|   |   |   +-- EcoBot.jsx          Floating AI chat widget
|   |   |   +-- InfoCard.jsx        Generic information card
|   |   |   +-- LeaderboardTable.jsx Ranked society table
|   |   |   +-- PickupCard.jsx      Individual pickup request card
|   |   |   +-- ResultCard.jsx      Waste detection result display
|   |   |   +-- StatCard.jsx        Summary statistic card
|   |   |   +-- WasteDetectionCard.jsx Image upload and detection UI
|   |   +-- pages/
|   |   |   +-- CollectorDashboard.jsx  Collector-facing pickup management
|   |   |   +-- HomePage.jsx            Scrollytelling landing page
|   |   |   +-- Leaderboard.jsx         Public citywide leaderboard
|   |   |   +-- LoginPage.jsx           Society and collector login
|   |   |   +-- RequestPickup.jsx       Waste pickup request form
|   |   |   +-- SignupPage.jsx          Society registration
|   |   |   +-- SocietyDashboard.jsx    Society analytics and history
|   |   +-- App.jsx                 Root component, routing, navbar
|   |   +-- main.jsx                Application entry point
|   +-- index.html
|   +-- package.json
|
+-- recycai-backend/                Express API server
|   +-- server.js                   All routes, scoring logic, EcoBot endpoint
|   +-- firebase.js                 Firebase Admin SDK initialisation
|   +-- waste_detector/
|   |   +-- predict.py              Python inference script (Keras model)
|   +-- serviceAccountKey.json      Firebase credentials (excluded from Git)
|   +-- seed.js                     General database seeding script
|   +-- seedTestUser.js             Test society and historical pickup seeder
|   +-- clearDb.js                  Database reset utility
|   +-- package.json
|
+-- MINC_best.keras                 Trained waste classification model weights
+-- models.py                       Model definition and training utilities
+-- README.md
```

---

## API Reference

### Society

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/society/register` | Register a new society. Body: `{ name, location }` |

### Pickups

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/pickup/request` | Create a pickup request. Body: `{ societyId, societyName, location, wasteType }` |
| POST | `/pickup/confirm` | Collector confirms pickup with weight. Body: `{ pickupId, weight }` |
| GET | `/pickups` | List all pickups. Query: `?collectorId=<id>` (optional) |
| GET | `/pickup/list` | Alias for `/pickups`, used by the society dashboard |

### Statistics and Leaderboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leaderboard` | Societies sorted by total Green Credits descending |
| GET | `/stats/citywide` | Aggregate: total waste diverted, active societies, total credits |

### AI Features

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/detect-waste` | Multipart image upload. Returns waste type, decomposition time, and recycling guidance |
| POST | `/api/chat` | SSE stream. Body: `{ messages: [{role, content}] }`. Proxies to Ollama llama3.2 |

---

## Setup and Installation

### Prerequisites

- Node.js 18 or later
- Python 3.9 or later with TensorFlow installed (`pip install tensorflow`)
- A Firebase project with Firestore enabled and a service account key
- Ollama installed and the `llama3.2` model pulled

### 1. Clone the repository

```bash
git clone <repository-url>
cd PBL
```

### 2. Install Ollama and pull the model

```bash
# Download Ollama from https://ollama.com, then:
ollama pull llama3.2
ollama serve
```

### 3. Backend setup

```bash
cd recycai-backend
npm install
```

Place your Firebase service account JSON file at `recycai-backend/serviceAccountKey.json`.

Start the server:

```bash
node server.js
# Server starts on http://localhost:5000
```

### 4. Frontend setup

```bash
cd recycai-frontend
npm install
npm run dev
# Development server starts on http://localhost:5173
```

### 5. Seed initial data (optional)

```bash
cd recycai-backend
node seed.js          # Creates collector accounts
node seedTestUser.js  # Creates a test society with pickup history
```

---

## Environment Variables

The backend does not use a `.env` file. Firebase credentials are loaded directly from `serviceAccountKey.json` via the Firebase Admin SDK initialised in `firebase.js`.

If you wish to use environment variables instead, update `firebase.js` to read credentials from `process.env`.

---

## Future Roadmap

- Real-time collector GPS tracking integrated into the society dashboard map view.
- Extended municipal administrator dashboard with ward-level analytics.
- Blockchain-based tamper-proof ledger for Green Credit issuance and audit trails.
- SMS and WhatsApp notifications for pickup status updates via a messaging gateway.
- Progressive Web App (PWA) support for offline access on low-connectivity devices.
- Integration with Swachh Bharat Mission civic reward infrastructure.

---

## License

This project was developed as part of a **Project Based Learning (PBL)** academic initiative. All rights reserved by the respective authors.

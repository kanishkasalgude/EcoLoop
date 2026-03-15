# RecycAI — Setup Guide

Complete instructions to get the **backend** and **frontend** running locally.

---

## Prerequisites

| Tool       | Minimum Version | Check Command      |
| ---------- | --------------- | -------------------|
| **Node.js** | 18+            | `node -v`          |
| **npm**     | 9+             | `npm -v`           |
| **Git**     | any            | `git --version`    |

You also need a **Firebase project** with **Firestore** enabled.

---

## 1 · Backend Setup (`recycai-backend`)

The backend is a **Node.js / Express** server that connects to **Firebase Firestore** via the Admin SDK.

### 1.1 Install Dependencies

```bash
cd recycai-backend
npm install
```

### 1.2 Add Firebase Service Account Key

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Open **Project Settings → Service Accounts**.
3. Click **"Generate new private key"** and download the JSON file.
4. Rename it to `serviceAccountKey.json` and place it inside the `recycai-backend/` folder.

> [!CAUTION]
> **Never commit `serviceAccountKey.json` to Git.** It is already listed in `.gitignore`.

### 1.3 Start the Server

```bash
node server.js
```

The server will start on **http://localhost:5000**.

### 1.4 Verify

Open a browser or use `curl`:

```bash
curl http://localhost:5000/leaderboard
```

You should receive a JSON response (an empty array `[]` is fine for a fresh database).

### 1.5 API Endpoints Reference

| Method | Endpoint             | Description                                     |
| ------ | -------------------- | ----------------------------------------------- |
| POST   | `/society/register`  | Register a new society (`name`, `location`)      |
| POST   | `/pickup/request`    | Request a pickup (`societyId`, `wasteType`, …)   |
| POST   | `/pickup/confirm`    | Confirm pickup & award credits (`pickupId`, `weight`) |
| GET    | `/pickups`           | List all pickups (newest first)                  |
| GET    | `/leaderboard`       | Societies ranked by green credits                |

---

## 2 · Frontend Setup (`recycai-frontend`)

The frontend is a **React 19** app powered by **Vite 8** with **Tailwind CSS 3** for styling.

### 2.1 Install Dependencies

```bash
cd recycai-frontend
npm install
```

### 2.2 Configure the Backend URL

By default the frontend calls `http://localhost:5000`. If your backend runs on a different port or host, update the base URL in the Axios calls inside `src/`.

You can also create a `.env` file in `recycai-frontend/`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Then reference it in code as `import.meta.env.VITE_BACKEND_URL`.

### 2.3 Start the Dev Server

```bash
npm run dev
```

Vite will start on **http://localhost:5173** (default) and open in your browser.

### 2.4 Build for Production

```bash
npm run build
```

The optimised output is written to the `dist/` folder.

### 2.5 Preview the Production Build

```bash
npm run preview
```

---

## 3 · Running Both Together

Open **two terminals** side-by-side:

| Terminal | Directory            | Command         |
| -------- | -------------------- | --------------- |
| 1        | `recycai-backend`    | `node server.js`|
| 2        | `recycai-frontend`   | `npm run dev`   |

The frontend (port 5173) will make API requests to the backend (port 5000). CORS is already enabled on the backend.

---

## 4 · Project Structure

```
PBL/
├── recycai-backend/
│   ├── firebase.js             # Firebase Admin SDK initialisation
│   ├── server.js               # Express server & API routes
│   ├── serviceAccountKey.json  # 🔒 YOUR Firebase key (git-ignored)
│   └── package.json
│
├── recycai-frontend/
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── main.jsx            # Vite entry point
│   │   └── pages/              # Page components
│   ├── index.html              # HTML shell
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── vite.config.js          # Vite configuration
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 5 · Troubleshooting

| Problem | Solution |
| ------- | -------- |
| `Firebase Admin initialization failed` | Make sure `serviceAccountKey.json` exists in `recycai-backend/` and is valid. |
| `CORS error` in browser console | Ensure the backend is running and `cors()` middleware is active in `server.js`. |
| `npm install` fails | Delete `node_modules/` and `package-lock.json`, then run `npm install` again. |
| Vite port conflict | Vite will auto-pick the next available port; check terminal output. |
| API returns empty data | Verify that Firestore is enabled in your Firebase project and collections exist. |

---

**Happy coding! 🚀**

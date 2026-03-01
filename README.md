# Contest‑Forge

**Contest‑Forge** is a React/Vite based web application for hosting, joining and managing coding contests.  
Participants can browse challenges, submit solutions, track results and earn prizes.  
Creators and admins have tools to create contests, review entries and oversee the community.

### Live Site Link (Client): https://contest-forge.web.app/

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 with Vite |
| **Styling** | Tailwind CSS + DaisyUI |
| **Icons** | `react-icons` (FaTrophy, FaUsers, etc.) |
| **Routing** | `react-router` v6 |
| **State & Data** | Firebase (Auth/Firestore) via a custom `api.js` wrapper |
| **Server State** | TanStack Query (`@tanstack/react-query`) |
| **HTTP Client** | Axios with `useAxiosSecure` hook |
| **Notifications** | `react-toastify`, `sweetalert2` |
| **Build Tooling** | ESLint, Prettier, Vite |
| **Hosting** | Firebase (see `.firebaserc`, `firebase.json`) |

---



## 📁 Directory Structure

```
Contest-Forge/
├── client/
│   ├── public/                  # Static assets & sample JSON datasets
│   ├── src/
│   │   ├── components/          # Reusable UI pieces (spinners, cards, etc.)
│   │   ├── pages/               # Route-level views (Home, ContestDetails, Dashboard, etc.)
│   │   ├── layouts/             # Root and dashboard layout components
│   │   ├── contexts/            # Authentication context / provider
│   │   ├── hooks/               # Custom React hooks (useAuth, useAxiosSecure, useRole, etc.)
│   │   ├── firebase/            # Firebase initialization
│   │   └── routes/              # Guarded route wrappers (RequireAuth, RequireAdmin, etc.)
│   ├── .env.local               # Environment variables (not committed)
│   ├── vite.config.js
│   └── package.json
├── .firebaserc
├── firebase.json
└── README.md
```

---

## ✨ Key Features

- 🏠 **Hero banner** with "How it works" section
- 🔍 **Browse and search** contests by category (Apps, Logo, Art, etc.)
- 🏆 **Real-time leaderboards** and countdown timers
- 📝 **Solution submission** modal with textarea input
- 👤 **Role-based protected routes** — `user`, `creator`, `admin`
- 🎨 **Creator/admin dashboards** for contest management and entry review
- 🥇 **Winner announcement** with profile avatar display
- 📊 **Profile pages**, reviews, winners and statistics
- 🌙 **Light/Dark mode** toggle
- 📱 **Responsive design** with full-width mobile cards

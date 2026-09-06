<div align="center">

# 🛡️ SafeScape AR

### *Augmented Reality Industrial Safety Training Platform*

[![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-orange?style=for-the-badge)](https://sih.gov.in)
[![Problem Statement](https://img.shields.io/badge/Problem-SIH26041-blue?style=for-the-badge)]()
[![Platform](https://img.shields.io/badge/Platform-Android-green?style=for-the-badge&logo=android)](https://developer.android.com)
[![Unity](https://img.shields.io/badge/Engine-Unity%20+%20ARCore-black?style=for-the-badge&logo=unity)](https://unity.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**An affordable Android AR-based platform where industrial workers can practice dangerous emergency scenarios virtually, get assessed, earn verified digital certificates, and be monitored through a real-time admin dashboard.**

[Features](#-features) · [Why SafeScape AR?](#-why-safescape-ar) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Tech Stack](#-tech-stack) · [Screenshots](#-screenshots) · [Team](#-team)

</div>

---

## 📌 The Problem

Workers in high-risk industries — **mining ⛏️, manufacturing 🏭, and industrial plants 🔥** — face life-threatening hazards every day. They need safety training to handle emergencies like fires, gas leaks, and confined-space dangers.

**Current training methods fall short:**

| Traditional Method | Limitation |
|---|---|
| 📚 Classroom lectures | Passive learning, low retention |
| 📺 Video demonstrations | No hands-on experience |
| 📖 Safety manuals | Language barriers, hard to engage |
| 🏗️ Physical drills | Expensive, risky, hard to repeat |

> **The core problem:** You cannot create a real gas leak or fire just to train someone. Workers never truly experience emergencies until they face one — and by then, mistakes can be fatal.

### Real-World Impact

- **India records 48,000+ factory accidents annually** (DGFASLI Report)
- **38% of industrial fatalities** are due to inadequate safety training
- Workers in remote mining/industrial areas often lack access to quality training
- Language barriers prevent effective training for workers speaking Hindi, Santali, and other regional languages

---

## 💡 Our Solution

**SafeScape AR** transforms industrial safety training through **Augmented Reality on Android smartphones** — making immersive, life-saving training accessible to every worker, anywhere.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   Worker opens app → Points camera at surroundings →    │
│   Virtual emergency appears in AR → Worker responds →   │
│   System evaluates actions → Certificate issued         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### How It Works

1. **📱 Open the App** — Worker launches SafeScape AR on their Android phone
2. **📷 Scan the Environment** — AR camera detects the real-world surfaces around them
3. **🔥 Emergency Appears** — A virtual fire, gas leak, or other hazard materializes in AR
4. **🧠 Worker Responds** — They must identify the hazard, select correct safety equipment, and follow evacuation procedures
5. **✅ Get Evaluated** — The system scores their decisions and response time
6. **🎓 Earn Certificate** — Passing workers receive a QR-verifiable digital certificate

---

## 🤔 Why SafeScape AR?

### Why AR instead of VR?

| Factor | VR Training | SafeScape AR |
|--------|------------|--------------|
| **Hardware** | Expensive VR headset ($300–$1000+) | Any Android phone with camera |
| **Deployment** | Limited to training centers | Train anywhere — factory floor, mine site, home |
| **Scalability** | 1 headset = 1 worker at a time | Every worker already has a phone |
| **Cost per worker** | High | Near zero marginal cost |
| **Awareness of surroundings** | Fully blocked (safety risk) | Full environmental awareness |
| **Setup time** | Complex calibration | Open app and start |

### Why not just videos or lectures?

| Factor | Passive Training | SafeScape AR |
|--------|-----------------|--------------|
| **Engagement** | Low (watch and forget) | High (do and remember) |
| **Retention** | ~20% after 1 week | ~75% with hands-on practice |
| **Skill assessment** | Written test | Real-time action evaluation |
| **Repeatability** | Limited | Unlimited practice |
| **Language support** | Usually only English | Hindi, Santali, English with voice |
| **Offline access** | Requires materials | Works without internet |

> 💡 **"Tell me and I forget. Teach me and I remember. Involve me and I learn."** — Benjamin Franklin
>
> SafeScape AR *involves* the worker in their own safety training.

---

## ✨ Features

### 📱 Mobile AR Application

- **🔥 Fire Safety Module** — Virtual fire simulation with extinguisher selection, hazard identification, and evacuation route guidance
- **☠️ Gas Leak Module** — Gas cloud visualization with danger zone boundaries, PPE selection, and safe exit navigation
- **📊 Real-time Assessment** — Step-by-step performance evaluation with weighted scoring
- **🎓 QR Certificates** — Tamper-proof digital certificates with QR code verification
- **🌐 Multilingual Support** — English, Hindi, and Santali with audio voice guidance
- **📡 Offline Mode** — Full training capability without internet; auto-sync when connected
- **🔊 Voice Guidance** — Audio instructions in the worker's preferred language

### 🖥️ Admin Dashboard

- **👥 Worker Management** — Track and manage all registered workers
- **📈 Training Analytics** — Completion rates, pass/fail trends, performance charts
- **✅ Certificate Verification** — Verify any certificate by scanning its QR code
- **📋 Compliance Reports** — Track mandatory training completion across the organization
- **🔍 Search & Filter** — Find workers by status, organization, training progress

### 🔧 Backend API

- **🔐 JWT Authentication** — Secure token-based auth for workers and admins
- **📦 Full CRUD Operations** — Workers, modules, sessions, certificates
- **🔄 Offline Sync** — Batch upload training sessions completed offline
- **📊 Analytics Engine** — Dashboard statistics, per-module metrics, compliance data
- **📜 API Documentation** — Interactive Swagger/OpenAPI docs

---

## 🏗️ Architecture

```
                    ┌──────────────────────────────────┐
                    │         SAFESCAPE AR              │
                    │    System Architecture            │
                    └──────────┬───────────────────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
   ┌───────────────┐   ┌──────────────┐   ┌──────────────┐
   │  Android App  │   │   Backend    │   │  Dashboard   │
   │  (Unity + AR) │   │  (FastAPI)   │   │   (React)    │
   │               │   │              │   │              │
   │ • AR Training │   │ • REST API   │   │ • Analytics  │
   │ • Assessment  │   │ • JWT Auth   │   │ • Workers    │
   │ • Offline DB  │   │ • PostgreSQL │   │ • Certs      │
   │ • Multilingual│   │ • QR Verify  │   │ • Reports    │
   │ • Certificates│   │ • Sync       │   │ • Compliance │
   └───────┬───────┘   └──────┬───────┘   └──────┬───────┘
           │                   │                   │
           │    ┌──────────────┤                   │
           │    │              │                   │
           ▼    ▼              ▼                   ▼
      ┌──────────────┐   ┌──────────┐        ┌────────┐
      │ SQLite       │   │PostgreSQL│        │  Vite  │
      │ (Offline)    │   │(Database)│        │ (Build)│
      └──────────────┘   └──────────┘        └────────┘
```

### Training Flow

```
WORKER                                    SYSTEM
  │                                         │
  │  1. Select Language                     │
  │────────────────────────────────────────>│
  │                                         │
  │  2. Choose Training Module              │
  │────────────────────────────────────────>│
  │                                         │
  │  3. Scan Environment with Camera        │
  │────────────────────────────────────────>│
  │                                         │
  │         4. AR Hazard Appears            │
  │<────────────────────────────────────────│
  │                                         │
  │  5. Identify Hazard                     │
  │────────────────────────────────────────>│  ✅ / ❌
  │                                         │
  │  6. Select Safety Equipment             │
  │────────────────────────────────────────>│  ✅ / ❌
  │                                         │
  │  7. Follow Evacuation Route             │
  │────────────────────────────────────────>│  ✅ / ❌
  │                                         │
  │         8. Assessment Results           │
  │<────────────────────────────────────────│
  │                                         │
  │         9. Certificate (if passed)      │
  │<────────────────────────────────────────│
  │                                         │
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Required | Purpose |
|------|---------|----------|---------|
| [Python](https://www.python.org/downloads/) | 3.10+ | ✅ | Backend API |
| [Node.js](https://nodejs.org/) | 18+ | ✅ | Admin Dashboard |
| [Unity](https://unity.com/download) | 2022.3 LTS | ⚠️ For AR app | Mobile AR build |
| [PostgreSQL](https://www.postgresql.org/download/) | 14+ | ⚠️ Optional | Database (or use Docker) |
| [Docker](https://www.docker.com/products/docker-desktop/) | Latest | ⚠️ Optional | Containerized setup |

### Quick Start (One Command)

```bash
# Clone the repository
git clone https://github.com/Phoenix05420/SafeScape-AR.git
cd SafeScape-AR

# Run the automated setup
start.bat           # Windows — interactive menu
```

Or set up each component manually:

### 1️⃣ Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with your database URL

# Run database migrations
alembic upgrade head

# Seed sample data
python -m app.seed

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

📖 API docs at: **http://localhost:8000/docs**

### 2️⃣ Admin Dashboard (React)

```bash
cd dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

🖥️ Dashboard at: **http://localhost:5173**

> **Note:** Dashboard includes built-in mock data — works standalone without the backend for demo purposes.

### 3️⃣ Unity AR App (Android)

1. Open `unity-app/` in **Unity 2022.3 LTS** or later
2. Unity will auto-install packages (AR Foundation, ARCore)
3. Go to **File → Build Settings → Android**
4. Set **Minimum API Level** to **24** (Android 7.0)
5. Connect an ARCore-supported device
6. Click **Build and Run**

### 🐳 Docker Setup (Backend + Database)

```bash
cd backend
docker-compose up
```

This starts both **FastAPI** and **PostgreSQL** in containers.

---

## 🛠️ Tech Stack

| Layer | Technology | Why? |
|-------|-----------|------|
| **AR Engine** | Unity + AR Foundation + ARCore | Industry-standard AR, cross-device support |
| **Mobile** | Android (API 24+) | Largest user base in India, affordable devices |
| **Backend** | FastAPI (Python) | High performance async API, auto-generated docs |
| **Database** | PostgreSQL | Reliable, supports complex queries for analytics |
| **Offline Storage** | JSON/PlayerPrefs | Zero-dependency offline data persistence |
| **Dashboard** | React + Vite + TypeScript | Fast, type-safe, modern developer experience |
| **Styling** | Tailwind CSS | Rapid UI development, consistent design |
| **Charts** | Recharts | Beautiful, responsive data visualizations |
| **Auth** | JWT (python-jose) | Stateless, scalable token-based authentication |
| **Certificates** | QR Code Generation | Instant, scannable verification |

---

## 📁 Project Structure

```
SafeScape-AR/
│
├── 📱 unity-app/                    # Unity AR Mobile Application
│   └── Assets/
│       ├── Scripts/
│       │   ├── AR/                  # ARCore session, plane detection
│       │   ├── Training/
│       │   │   ├── FireSafety/      # 🔥 Fire safety scenario
│       │   │   └── GasLeak/         # ☠️ Gas leak scenario
│       │   ├── Assessment/          # Scoring & evaluation
│       │   ├── Certificate/         # QR certificate generation
│       │   ├── Localization/        # EN / HI / SAT support
│       │   ├── Offline/             # Local storage & sync
│       │   ├── Networking/          # API client
│       │   ├── UI/                  # All UI controllers
│       │   └── Audio/               # Voice guidance
│       └── Resources/               # Config & language files
│
├── 🔧 backend/                      # FastAPI REST API
│   ├── app/
│   │   ├── auth/                    # JWT authentication
│   │   ├── models/                  # SQLAlchemy ORM models
│   │   ├── routers/                 # API endpoint handlers
│   │   ├── schemas/                 # Pydantic validation
│   │   ├── services/                # Business logic
│   │   └── utils/                   # QR code generation
│   ├── alembic/                     # Database migrations
│   ├── docker-compose.yml
│   └── requirements.txt
│
├── 🖥️ dashboard/                    # React Admin Dashboard
│   └── src/
│       ├── components/              # Layout + reusable UI
│       ├── pages/                   # Dashboard, Workers, Certs...
│       ├── services/                # API integration
│       ├── hooks/                   # Custom React hooks
│       ├── context/                 # Auth state management
│       └── types/                   # TypeScript interfaces
│
├── start.bat                        # 🚀 Main launcher
├── setup.bat                        # 📦 Auto-setup script
├── check-requirements.bat           # 🔍 Dependency checker
├── start-backend.bat                # Start backend server
├── start-dashboard.bat              # Start dashboard
├── stop-all.bat                     # Stop all services
└── README.md
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Register new user | — |
| `POST` | `/auth/login` | Login & get JWT token | — |
| `GET` | `/auth/me` | Get current user profile | 🔒 |
| `GET` | `/workers` | List all workers (paginated) | 🔒 Admin |
| `GET` | `/workers/{id}` | Get worker details | 🔒 |
| `GET` | `/workers/{id}/progress` | Worker training progress | 🔒 |
| `POST` | `/training/sessions` | Start a training session | 🔒 |
| `PUT` | `/training/sessions/{id}` | Update/complete session | 🔒 |
| `POST` | `/assessment/submit` | Submit assessment results | 🔒 |
| `GET` | `/assessment/session/{id}` | Get session assessment | 🔒 |
| `POST` | `/certificates/generate` | Generate certificate | 🔒 |
| `GET` | `/certificates/{num}/verify` | Verify certificate by QR | Public |
| `GET` | `/analytics/dashboard` | Dashboard statistics | 🔒 Admin |
| `GET` | `/analytics/compliance` | Compliance report | 🔒 Admin |
| `POST` | `/sync/sessions` | Sync offline sessions | 🔒 |

---

## 🎯 Training Modules

### 🔥 Module 1: Fire Safety

```
Start Training
      │
      ▼
Scan Environment (AR plane detection)
      │
      ▼
🔥 Virtual Fire Appears (particle effects on AR plane)
      │
      ▼
Identify the Hazard Type (tap fire → classification quiz)
      │
      ▼
Select Correct Extinguisher (Water / CO2 / Foam / Dry Chemical)
      │
      ▼
Follow AR Evacuation Arrows (3D arrows on floor)
      │
      ▼
Assessment: Score ≥ 80% → PASS ✅ → Certificate
                        → FAIL ❌ → Retry
```

### ☠️ Module 2: Gas Leak / Confined Space

```
Start Training
      │
      ▼
Scan Environment
      │
      ▼
☠️ Gas Cloud Appears (translucent volumetric effect)
      │
      ▼
🚫 Danger Zone Boundary Visualized (red pulsing circle)
      │
      ▼
🦺 Select Required PPE (Gas Mask, Goggles, Suit, Boots, etc.)
      │
      ▼
➡️ Navigate Safe Exit Route (avoid danger zone)
      │
      ▼
Assessment: Score ≥ 80% → PASS ✅ → Certificate
```

---

## 📊 Assessment & Scoring

Each training session evaluates the worker across **4 weighted categories**:

| Category | Weight | What's Measured |
|----------|--------|----------------|
| Hazard Identification | 25% | Did they correctly identify the danger? |
| Equipment Selection | 25% | Did they choose the right safety equipment? |
| Procedure Compliance | 25% | Did they follow correct safety procedures? |
| Evacuation Execution | 25% | Did they follow the exit route correctly? |

**Passing Score: 80%**

### Sample Result

| Task | Result | Points |
|------|--------|--------|
| Identified fire type | ✅ Correct | 25/25 |
| Selected CO2 extinguisher | ✅ Correct | 25/25 |
| Wore safety helmet | ✅ Correct | 25/25 |
| Followed evacuation route | ❌ Wrong exit | 5/25 |
| **Total** | | **80/100 — PASSED** |

---

## 🌍 Multilingual Support

SafeScape AR supports training in:

| Language | Code | Status |
|----------|------|--------|
| 🇬🇧 English | `en` | ✅ Complete |
| 🇮🇳 Hindi | `hi` | ✅ Complete |
| 🇮🇳 Santali | `sat` | ✅ Complete |

All UI text, training instructions, assessment messages, and voice guidance are localized. Workers select their preferred language at app startup.

---

## 📡 Offline Architecture

Mining and industrial sites often have **poor or no internet connectivity**. SafeScape AR is designed offline-first:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ Download    │     │ Train        │     │ Sync When   │
│ Module      │────>│ Offline      │────>│ Online      │
│ (WiFi/4G)   │     │ (No Internet)│     │ (Auto)      │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │ Local JSON  │
                    │ Storage     │
                    │ • Sessions  │
                    │ • Scores    │
                    │ • Certs     │
                    └─────────────┘
```

- ✅ Training modules downloaded once, stored locally
- ✅ Full AR training works without internet
- ✅ Results saved to local storage
- ✅ Auto-sync with server when connectivity returns
- ✅ Conflict resolution for duplicate sessions

---

## 🎓 Digital Certificate with QR Verification

After passing a training module, workers receive a **digital certificate** with:

- Worker name and ID
- Training module completed
- Completion date and score
- Unique certificate number
- **QR code** for instant verification

**Verification flow:**
```
Supervisor scans QR code
        │
        ▼
Opens public verification URL
        │
        ▼
System confirms:
  ✅ Certificate is authentic
  ✅ Worker: Ravi Kumar
  ✅ Module: Fire Safety
  ✅ Score: 85%
  ✅ Date: 2026-09-06
```

---

## 🖥️ Admin Dashboard Preview

The web-based admin dashboard provides:

- **📊 Overview** — Total workers, completion rates, pass/fail statistics
- **📈 Charts** — Training trends, module performance, compliance rates
- **👥 Worker Management** — Search, filter, view individual progress
- **📜 Certificate Management** — Issue, verify, and track certificates
- **📋 Compliance Reports** — Identify workers missing mandatory training

---

## 🗺️ Roadmap

- [x] Fire Safety Training Module
- [x] Gas Leak / Confined Space Module
- [x] Multilingual Support (EN, HI, SAT)
- [x] Offline Mode with Auto-Sync
- [x] QR Certificate Generation
- [x] Admin Dashboard with Analytics
- [ ] Electrical Safety Module
- [ ] AI Voice Assistant for adaptive guidance
- [ ] Real-time multiplayer training scenarios
- [ ] Integration with national skill certification systems
- [ ] iOS Support
- [ ] Wearable AR device support (smart glasses)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ for **Smart India Hackathon 2026**

**Problem Statement:** SIH26041 — AR-based Industrial Safety Training Platform

---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

*SafeScape AR — Making industrial safety training accessible, affordable, and effective.*

</div>

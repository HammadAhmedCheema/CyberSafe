# CyberSafe - Modern Cybersecurity Platform

CyberSafe is a high-performance, community-driven cybersecurity awareness and incident reporting platform. It bridges the gap between technical security experts and everyday users by providing a professional, real-time interface for reporting threats, tracking breaches, and accessing verified security intel.

---

## 📖 About the Project

In an era of increasing digital threats, **CyberSafe** serves as a centralized hub for proactive security management. The platform is designed with a **Cyber-Theme (Glassmorphism)** aesthetic, providing a premium, high-tech experience that reflects the seriousness of cybersecurity while maintaining peak usability.

### Mission
To democratize cybersecurity awareness by making incident reporting simple, visual, and immediate, while providing users with real-time news and AI-driven expert guidance.

---

## 🎯 Core Use Cases

### 1. Security Incident Reporting
Users can quickly document and upload evidence (screenshots/descriptions) of potential security breaches, phishing attempts, or malware discoveries. Every report is time-stamped and linked to the user's secure profile.

### 2. Community Threat Monitoring
The **Alerts Feed** provides a real-time stream of incidents reported by the community. Users can monitor local or platform-wide trends to stay ahead of emerging phishing campaigns or data leaks.

### 3. Professional Admin Oversight
A dedicated **Control Center (Dashboard)** allows authorized security administrators to manage reports, update incident statuses (from "Open" to "In-Progress" or "Resolved"), and terminate false flags.

### 4. Interactive Learning & News
Through the **AI Cyber Expert** (powered by Gemini) and the **Live News Feed** (Hacker News API), users have instant access to best practices and the latest global security headlines.

---

## 🛠️ Modern Tech Stack

The platform is built on a cutting-edge, **Serverless Architecture** for maximum performance and security:

- **Frontend Core**: [React 19](https://react.dev/) — Utilizing the latest concurrent rendering features for a smooth, app-like experience.
- **Build Tooling**: [Vite](https://vitejs.dev/) — Lightning-fast HMR and optimized production bundling.
- **Styling Strategy**: [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) + [Tailwind CSS](https://tailwindcss.com/) — A custom design system utilizing **Glassmorphism** (translucent backdrops, neon borders, and glowing effects).
- **Backend-as-a-Service**: [Supabase](https://supabase.com/)
  - **Database**: PostgreSQL with Row Level Security (RLS) for ironclad data isolation.
  - **Auth**: Secure JWT-based authentication with instant profile synchronization.
  - **Storage**: S3-compatible bucket for secure evidence/image hosting.
- **AI Engine**: [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/) — Integrated via secure API for real-time security consultations.

---

## ⚙️ Quick Start

### 1. Environment Configuration
Create a `.env.development` file in the root:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GEMINI_API_KEY=your_api_key
```

### 2. Initialization
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📂 Architecture Overview

The repository has been restructured to a clean, flat architecture at the root level for simplified deployment and maintenance:

```bash
CyberSafe/
├── src/
│   ├── components/  # Atomic UI (Header, Hero, Glass Cards)
│   ├── context/     # Auth hooks & global state
│   ├── pages/       # Route-level views
│   ├── services/    # Data layer (Supabase, HackerNews)
│   └── tests/       # Vitest suites
├── public/          # Static assets & PDF resources
└── index.css        # Global design tokens (Glassmorphism engine)
```

---

## 📄 License
This platform is a demonstration of modern web engineering and cybersecurity patterns. 
**Stay Safe. Stay Cyber.**

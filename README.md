# CyberSafe - Modern Cybersecurity Platform

CyberSafe is a comprehensive cybersecurity platform designed to empower users with information, tools, and a community-driven reporting system for security incidents.

The platform has been migrated to a **serverless architecture** using **Supabase**, providing a scalable, secure, and performant backend for authentication, data storage, and file hosting.

## 🚀 Features

- **User Authentication**: Secure sign-up and login powered by Supabase Auth, with automatic profile synchronization.
- **Incident Reporting**: Community-driven security incident reporting with image upload support.
- **Interactive Dashboard**: Manage and track the status of reported incidents.
- **AI Cyber Expert**: Integrated Gemini AI chat for instant cybersecurity advice and guidance.
- **Live Security News**: Real-time cybersecurity news feed powered by the Hacker News API.
- **Modern UI/UX**: Fully responsive design with Dark/Light mode support, built with React and Tailwind CSS.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend / Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for incident images)
- **AI Integration**: Google Gemini API
- **News Integration**: Hacker News API

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Supabase Account**: A Supabase project with a `profiles` and `incidents` table, and an `incident-images` bucket.

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/HammadAhmedCheema/CyberSafe.git
cd CyberSafe
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.development` (for local dev) or `.env.production` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI API
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

### 4. Database Setup

Ensure your Supabase project has the following schema:

#### Tables

- `profiles`: Linked to `auth.users` for user metadata.
- `incidents`: For storing reported incidents.

#### Storage

- `incident-images`: A storage bucket for image attachments.

> [!TIP]
> Use Row Level Security (RLS) in Supabase to ensure that users can only modify their own reports and profiles.

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

## 📂 Project Structure

```bash
CyberSafe/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── context/     # Auth and state management
│   ├── pages/       # Page components (Home, Dashboard, etc.)
│   ├── services/    # API clients (Supabase, News API)
│   └── assets/      # Styles and images
├── index.html       # Entry point
├── tailwind.config.js
└── vite.config.js
```

## 🛡️ Security Features

- **RLS (Row Level Security)**: Database-level access control.
- **Secure File Storage**: Restricted access to user-uploaded content.
- **Client-Side Validation**: Robust form handling for incident reports.

## 📄 License

This project is for educational purposes.

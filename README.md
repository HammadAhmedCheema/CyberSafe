# CyberSafe Platform - Installation & Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (or local MongoDB installation)

## Project Structure

```
assignment_3/
├── client/          # React frontend (Vite)
├── server/          # Express backend
└── README.md        # This file
```

## Installation Steps

### 1. Clone/Download the Project

If you received this project without `node_modules`:

```bash
cd assignment_3
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

This will install all packages listed in `server/package.json`:

- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- express-validator
- express-rate-limit
- multer
- nodemon (dev dependency)

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

This will install all packages listed in `client/package.json`:

- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- vite
- And other development dependencies

### 4. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd ../server
touch .env
```

Add the following content to `server/.env`:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Important:** Replace the values:

- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A random secure string (you can generate one online)

### 5. Create Admin User (Optional)

```bash
cd server
node seedAdmin.js
```

This creates an admin account:

- Email: admin@cybersafe.com
- Password: admin123

## Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend Server:**

```bash
cd server
npm run dev
```

Server will start on: http://localhost:5001

**Terminal 2 - Frontend Server:**

```bash
cd client
npm run dev
```

Frontend will start on: http://localhost:5173

### Option 2: Production Build

**Build Frontend:**

```bash
cd client
npm run build
```

**Run Backend:**

```bash
cd ../server
npm start
```

## Quick Start Commands

### First Time Setup:

```bash
# Install all dependencies
cd server && npm install
cd ../client && npm install

# Configure .env file (see step 4 above)

# Create admin user
cd ../server && node seedAdmin.js

# Start development servers
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev
```

## Available Scripts

### Backend (server/)

- `npm run dev` - Start development server with nodemon (auto-restart)
- `npm start` - Start production server
- `node seedAdmin.js` - Create admin user

### Frontend (client/)

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Default Ports

- Backend API: http://localhost:5001
- Frontend: http://localhost:5173

## Features

- User Authentication (Register/Login)
- Incident Reporting with Image Upload
- Public Incident Feed
- User Dashboard
- Admin Dashboard (status updates, delete reports)
- AI Chat (Gemini API)
- News Feed (Hacker News API)
- Dark/Light Theme Toggle
- Mobile Responsive

## Troubleshooting

### Port Already in Use

If port 5001 or 5173 is already in use:

```bash
# Kill process on port 5001 (Linux/Mac)
lsof -ti:5001 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Issues

- Verify your MongoDB Atlas connection string
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure network access is configured

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Dependencies

### Backend Dependencies:

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.0.1",
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.3",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express-validator": "^7.3.1",
  "express-rate-limit": "^8.2.1",
  "multer": "^2.0.2"
}
```

### Frontend Dependencies:

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.1.1",
  "axios": "^1.7.9"
}
```

## Support

For issues or questions, please check:

1. All dependencies are installed
2. Environment variables are configured
3. MongoDB is accessible
4. Ports are not in use

## License

This project is for educational purposes.

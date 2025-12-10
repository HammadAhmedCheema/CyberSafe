# Deployment Guide

## Environment Variables Setup

This project uses environment variables to configure the backend API URL for different environments.

### Local Development

For local development, the app uses `.env.development`:

```bash
VITE_API_URL=http://localhost:5001/api
```

### Production (Vercel)

For production deployment on Vercel, you need to set up environment variables in the Vercel dashboard.

#### Option 1: Using Vercel Dashboard (Recommended)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://cybersafe-ubqf.onrender.com/api`
   - **Environment**: Select "Production" (and optionally "Preview" and "Development")

4. Add the Gemini API variables:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSyAfHXpbcTozcg9gV9F_elGkfgPwJP3G-4E` (or your own key)
   - **Environment**: Select "Production"

   - **Name**: `VITE_GEMINI_API_URL`
   - **Value**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
   - **Environment**: Select "Production"

5. Redeploy your application

#### Option 2: Using .env.production file

If you prefer to use a `.env.production` file:

1. Copy the example file:

   ```bash
   cp .env.production.example .env.production
   ```

2. The file already contains the correct URL:

   ```bash
   # Backend API URL
   VITE_API_URL=https://cybersafe-ubqf.onrender.com/api

   # Gemini AI API
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
   ```

**Note**: `.env.production` is gitignored for security, so you'll need to set environment variables in Vercel dashboard anyway.

## Vercel Deployment Steps

1. **Install Vercel CLI** (optional):

   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Push your code to GitHub
   - Import the repository in Vercel
   - Set the root directory to `client`
   - Add environment variables as described above
   - Deploy!

3. **Deploy via CLI**:

   ```bash
   cd client
   vercel
   ```

## Important Notes

- The backend URL is: `https://cybersafe-ubqf.onrender.com/api`
- Make sure your backend CORS settings allow requests from your Vercel domain
- All environment variables in Vite must be prefixed with `VITE_`
- After changing environment variables in Vercel, you need to redeploy

## Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

This will use the `.env.production` file if it exists, otherwise it will use the fallback URL in the code.

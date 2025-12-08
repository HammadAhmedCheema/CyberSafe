# CyberSafe Platform - Deployment Guide

## Free Hosting Options for MERN Stack

### Overview

Your application has two parts that need hosting:

1. **Frontend (React + Vite)** - Static files
2. **Backend (Express + Node.js)** - Server application

## Recommended Free Hosting Services

### 🎯 Best Options for Your Project

#### Option 1: Vercel (Frontend) + Render (Backend) ⭐ RECOMMENDED

- **Frontend**: Vercel (Free, Fast, Easy)
- **Backend**: Render (Free tier available)
- **Database**: MongoDB Atlas (Already using, Free tier)

#### Option 2: Netlify (Frontend) + Railway (Backend)

- **Frontend**: Netlify (Free, Great for React)
- **Backend**: Railway (Free tier with limitations)
- **Database**: MongoDB Atlas

#### Option 3: All-in-One Solutions

- **Render**: Can host both frontend and backend
- **Railway**: Can host full-stack apps
- **Cyclic**: Specialized for Node.js apps

---

## 📋 Step-by-Step Deployment Guide

### Part 1: Deploy Backend to Render

#### 1. Prepare Backend for Deployment

**Update `server/package.json`:**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Create `server/.gitignore`:**

```
node_modules/
.env
uploads/
*.log
```

#### 2. Deploy to Render

1. **Sign up**: Go to https://render.com and sign up (free)
2. **Connect GitHub**: Link your GitHub account
3. **Create New Web Service**:

   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: cybersafe-api
     - **Root Directory**: `server`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

4. **Add Environment Variables** in Render Dashboard:

   ```
   PORT=5001
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```

5. **Deploy**: Click "Create Web Service"

Your backend will be live at: `https://cybersafe-api.onrender.com`

---

### Part 2: Deploy Frontend to Vercel

#### 1. Prepare Frontend for Deployment

**Update `client/src/services/api.js`:**

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

**Create `client/.env.production`:**

```
VITE_API_URL=https://cybersafe-api.onrender.com/api
```

**Create `client/vercel.json`:**

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 2. Deploy to Vercel

**Method 1: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client folder
cd client

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? cybersafe-platform
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

**Method 2: Using Vercel Dashboard**

1. Go to https://vercel.com and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://cybersafe-api.onrender.com/api`
6. Click "Deploy"

Your frontend will be live at: `https://cybersafe-platform.vercel.app`

---

## 🔧 Alternative Deployment Options

### Deploy to Netlify (Frontend Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to client
cd client

# Build the project
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**Netlify Configuration (`client/netlify.toml`):**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Deploy to Railway (Backend Alternative)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - **Root Directory**: `server`
   - Add environment variables
6. Railway will auto-detect Node.js and deploy

---

## 📝 Complete Deployment Checklist

### Before Deployment:

- [ ] MongoDB Atlas is set up and accessible
- [ ] Environment variables are documented
- [ ] `.gitignore` files are configured
- [ ] Code is pushed to GitHub
- [ ] API endpoints are tested locally
- [ ] CORS is configured for production URLs

### Backend Deployment:

- [ ] Backend deployed to Render/Railway
- [ ] Environment variables added
- [ ] Database connection verified
- [ ] API endpoints accessible
- [ ] Note down backend URL

### Frontend Deployment:

- [ ] Update API URL in frontend
- [ ] Build command works locally
- [ ] Deploy to Vercel/Netlify
- [ ] Environment variables added
- [ ] Test all features on live site

---

## 🔒 Security Considerations

### Update CORS in `server/server.js`:

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: ["https://cybersafe-platform.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
```

### Protect Sensitive Data:

1. Never commit `.env` files
2. Use environment variables for all secrets
3. Rotate JWT secrets regularly
4. Use HTTPS only in production

---

## 🚀 Quick Deployment Commands

### Full Deployment Script:

```bash
# 1. Deploy Backend to Render
cd server
git add .
git commit -m "Prepare for deployment"
git push origin main
# Then deploy via Render dashboard

# 2. Deploy Frontend to Vercel
cd ../client
vercel --prod
```

---

## 📊 Free Tier Limitations

### Render Free Tier:

- ✅ 750 hours/month
- ✅ Auto-sleep after 15 min inactivity
- ⚠️ Cold starts (slow first request)
- ✅ 512 MB RAM

### Vercel Free Tier:

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Fast global CDN

### MongoDB Atlas Free Tier:

- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Good for small projects

---

## 🐛 Troubleshooting

### Backend Issues:

**Problem**: API not responding

```bash
# Check Render logs
# Go to Render dashboard → Your service → Logs
```

**Problem**: Database connection failed

- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Render)
- Check connection string in environment variables

### Frontend Issues:

**Problem**: API calls failing

- Check VITE_API_URL is correct
- Verify CORS settings on backend
- Check browser console for errors

**Problem**: 404 on refresh

- Ensure `vercel.json` or `netlify.toml` is configured
- Check rewrite rules

---

## 📱 Post-Deployment Testing

Test these features on your live site:

1. [ ] User registration
2. [ ] User login
3. [ ] Submit incident report
4. [ ] Upload image with report
5. [ ] View public feed
6. [ ] Admin login and dashboard
7. [ ] Theme toggle
8. [ ] AI chat
9. [ ] News feed

---

## 🎓 Learning Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app

---

## 💡 Pro Tips

1. **Use GitHub**: Push your code to GitHub first - makes deployment easier
2. **Environment Variables**: Always use environment variables, never hardcode
3. **Test Locally**: Build and test production build locally before deploying
4. **Monitor**: Check logs regularly after deployment
5. **Custom Domain**: Both Vercel and Render support custom domains (free)

---

## 🆘 Need Help?

If deployment fails:

1. Check service logs (Render/Vercel dashboard)
2. Verify all environment variables
3. Test API endpoints with Postman
4. Check CORS configuration
5. Ensure MongoDB Atlas allows connections

---

## Next Steps After Deployment

1. Share your live URL
2. Monitor usage and performance
3. Set up custom domain (optional)
4. Enable analytics (Vercel Analytics is free)
5. Set up error monitoring (Sentry has free tier)

Good luck with your deployment! 🚀

# Deployment Checklist

## Pre-Deployment

- [ ] Code is pushed to GitHub
- [ ] MongoDB Atlas is configured and accessible
- [ ] All features tested locally
- [ ] Environment variables documented

## Backend Deployment (Render)

- [ ] Sign up at https://render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set Root Directory to `server`
- [ ] Add environment variables:
  - [ ] PORT=5001
  - [ ] MONGO_URI=your_connection_string
  - [ ] JWT_SECRET=your_secret
  - [ ] NODE_ENV=production
- [ ] Deploy and note the URL: **\*\***\_\_\_\_**\*\***11

## Frontend Deployment (Vercel)

- [ ] Create `.env.production` with backend URL
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Navigate to client folder: `cd client`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel --prod`
- [ ] Note the URL: **\*\***\_\_\_\_**\*\***

## Post-Deployment Testing

- [ ] User registration works
- [ ] User login works
- [ ] Submit incident report
- [ ] Image upload works
- [ ] View public feed
- [ ] Admin dashboard accessible
- [ ] Theme toggle works
- [ ] AI chat responds
- [ ] News feed loads

## Final Steps

- [ ] Update CORS in backend with frontend URL
- [ ] Test all features on live site
- [ ] Share URLs with team/instructor
- [ ] Monitor logs for errors

## URLs

- Frontend: https://________________.vercel.app
- Backend API: https://________________.onrender.com
- MongoDB: Already configured ✓

## Notes

- Render free tier may sleep after 15 min of inactivity
- First request after sleep will be slow (cold start)
- Vercel deployments are instant and always fast

# 🚀 DEPLOY FRONTEND TO RAILWAY - COMPLETE GUIDE

**Date**: May 2, 2026  
**Objective**: Deploy Next.js frontend to Railway  
**Status**: ✅ **STEP-BY-STEP GUIDE**

---

## 🎯 OVERVIEW

Instead of Vercel, you'll deploy frontend on Railway:

```
Your Current Setup:          Your New Setup:
Vercel (Frontend)      →     Railway (Frontend)
Railway (Backend)      →     Railway (Backend)
MongoDB Atlas                MongoDB Atlas
```

**Advantages**:
- ✅ Everything in one place (Railway)
- ✅ Easy to manage
- ✅ Both services can communicate internally
- ✅ Same billing/dashboard
- ✅ Easier CORS configuration

---

## 📋 PRE-REQUISITES

Before starting, make sure:
- [ ] You have Railway account (logged in)
- [ ] Backend is already deployed on Railway
- [ ] You have git access
- [ ] Next.js project is ready

---

## 🔧 STEP 1: PREPARE YOUR FRONTEND PROJECT

### Update package.json

Your frontend `package.json` should have proper build script.

Check `/web/package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

✅ These scripts are already there (verified)

### Check Next.js Configuration

Verify `/web/next.config.ts` is correct:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your config here
};

export default nextConfig;
```

✅ Already configured

### Create Railway Configuration

Check if `/web/nixpacks.toml` exists:
```toml
[languages]
nodes = ["20.17.1"]

[phases.install]
cmds = ["npm install"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
```

✅ Already created (from previous fixes)

---

## 📍 STEP 2: CREATE NEW RAILWAY PROJECT FOR FRONTEND

### Method 1: From Railway Dashboard (RECOMMENDED)

1. **Go to Railway Dashboard**
   - URL: https://railway.app/dashboard

2. **Create New Project**
   - Click: "+ New Project" button
   - Or: "Create" button

3. **Select GitHub**
   - Click: "Deploy from GitHub"
   - Select: `Team-Task-Manager-Full-Stack-`
   - Select: `/web` directory (Important!)

4. **Configure**
   - Project Name: `quantum-web` (or `frontend`)
   - Service Name: `web`
   - Environment: `production`
   - Branch: `main`

### Method 2: From CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to web folder
cd /Users/hariomkasaundhan/Documents/New\ project\ 2/web

# Create new Railway project
railway init

# Deploy
railway up
```

---

## 🔐 STEP 3: SET ENVIRONMENT VARIABLES FOR FRONTEND

Once Railway project is created:

### Go to Railway Dashboard

1. **Select your web project** (frontend)
2. **Click: "Variables" tab**
3. **Add These Variables**:

```
NEXT_PUBLIC_API_URL=http://quantum-api:4000

(Note: quantum-api is the internal Railway service name of your backend)

OR

NEXT_PUBLIC_API_URL=https://[your-backend-railway-url]

(If backends in different Railway teams)
```

### Why `http://quantum-api:4000`?

If both services are in **same Railway project**:
- They can communicate internally via service name
- No need for full URL
- Faster communication

If services are in **different Railway projects**:
- Use full Railway URL: `https://your-backend-railway-url`

---

## 🔄 STEP 4: LINK BACKEND TO FRONTEND (IF SAME PROJECT)

If you want both in **same Railway project**:

### Move Backend to Same Project

1. **Go to Railway Dashboard**
2. **Create new service in frontend project**
3. **Add existing backend GitHub repo**
4. **Configure as before**

Or keep them separate (easier initially):
- Frontend project: `quantum-web`
- Backend project: `quantum-api`

---

## 🌐 STEP 5: CONFIGURE BACKEND FOR FRONTEND

Update backend to accept requests from Railway frontend:

### Edit `/api/.env`

```properties
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
JWT_EXPIRES_IN=14d
CLIENT_URL=https://quantum-web-production.up.railway.app
```

**Update**: `CLIENT_URL` to your Railway frontend URL

### How to Get Frontend Railway URL

1. **Go to Railway Dashboard**
2. **Select web project**
3. **Go to Settings → Domains**
4. **Copy the URL** (looks like: `https://quantum-web-xxx.up.railway.app`)
5. **Update `/api/.env`** with this URL

### Commit and Push

```bash
cd /api
git add .env
git commit -m "Update CLIENT_URL for Railway frontend"
git push origin main

# Backend will auto-redeploy on Railway
```

---

## 🔗 STEP 6: CONNECT FRONTEND TO BACKEND

### Check Frontend Environment Variable

Your `/web/src/lib/store.tsx` already uses:
```typescript
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api`
```

✅ This is correct!

### Add to Railway Variables

In Railway Dashboard for frontend project:

**Variable Name**: `NEXT_PUBLIC_API_URL`  
**Variable Value**: `https://your-backend-railway-url`

Or (if same project): `http://quantum-api:4000`

---

## 🚀 STEP 7: TRIGGER DEPLOYMENT

### Option 1: Auto-Deploy (RECOMMENDED)

Railway auto-deploys when you push to GitHub:

```bash
cd /web
git add .
git commit -m "Deploy frontend to Railway"
git push origin main

# Railway automatically detects changes and redeploys
```

### Option 2: Manual Deploy

1. **Go to Railway Dashboard**
2. **Select web project**
3. **Go to Deployments**
4. **Click: "Redeploy" or "Deploy"**

---

## 🧪 STEP 8: VERIFY DEPLOYMENT

### Check Deployment Status

1. **Go to Railway Dashboard**
2. **Select web project**
3. **Check status**:
   - ✅ Status should be "Running"
   - ✅ Shows green checkmark

### Test Frontend

1. **Get the Railway URL**
   - Settings → Domains → Copy URL

2. **Visit in Browser**
   - Example: `https://quantum-web-xxx.up.railway.app`
   - Should see frontend loaded

3. **Try Login**
   - Email: `admin@quantum.team`
   - Password: `password123`
   - Should redirect to dashboard

4. **Check DevTools**
   - Press F12 → Network tab
   - Make a request (try login)
   - Should see API calls to backend
   - Status should be 200 (success)

5. **Check Console**
   - No errors should appear
   - No CORS errors
   - No "Cannot fetch" errors

---

## 📊 COMPARISON: VERCEL vs RAILWAY

| Feature | Vercel | Railway |
|---------|--------|---------|
| Ease of Setup | Very Easy | Easy |
| Pricing | Free tier generous | Free tier generous |
| Build Speed | Very fast | Fast |
| Cold Starts | Minimal | Possible |
| Frontend | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Backend | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Both in one | ❌ No | ✅ Yes |
| CORS Setup | More complex | Simpler |
| **Recommendation** | **Best for frontend only** | **Best for full-stack** |

---

## 🎯 QUICK CHECKLIST

### Before Deployment
- [ ] Next.js project builds locally (`npm run build`)
- [ ] Environment variables configured
- [ ] Backend deployed on Railway
- [ ] Backend URL known
- [ ] nixpacks.toml is present

### During Deployment
- [ ] Git push successful
- [ ] Railway detects changes
- [ ] Build starts
- [ ] Build completes without errors
- [ ] Deployment shows "Running"

### After Deployment
- [ ] Frontend loads
- [ ] Environment variable set
- [ ] API calls go to backend
- [ ] Login works
- [ ] Dashboard displays data
- [ ] No console errors

---

## 🔄 STEP-BY-STEP QUICK START

### 5-Minute Quick Deploy

```bash
# 1. Make sure everything is committed
cd /Users/hariomkasaundhan/Documents/New\ project\ 2
git status  # Should be clean

# 2. Push to GitHub (Railway auto-deploys)
git push origin main

# 3. Go to Railway Dashboard
# https://railway.app/dashboard

# 4. Create new project → Deploy from GitHub
# Select Team-Task-Manager-Full-Stack- → /web directory

# 5. Add environment variable in Railway
# NEXT_PUBLIC_API_URL = https://your-backend-url

# 6. Monitor deployment (2-3 minutes)
# Check status becomes "Running"

# 7. Visit Railway URL
# Should see your frontend!
```

---

## 🔐 ENVIRONMENT VARIABLES REFERENCE

### Frontend (.env on Railway)
```
NEXT_PUBLIC_API_URL=https://your-backend-railway-url
```

### Backend (.env on Railway)
```
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
JWT_EXPIRES_IN=14d
CLIENT_URL=https://your-frontend-railway-url
```

---

## 🚨 TROUBLESHOOTING

### Build Fails

**Error**: Build fails during deployment

**Solutions**:
1. Check build logs in Railway
2. Verify `npm run build` works locally
3. Check Node.js version (should be 20.17.1)
4. Verify all dependencies installed

### Frontend Loads but API Doesn't Work

**Error**: Login doesn't work, API calls fail

**Solutions**:
1. Check `NEXT_PUBLIC_API_URL` in Railway variables
2. Verify backend is running
3. Check CORS configuration in backend
4. Verify `CLIENT_URL` in backend .env

### CORS Errors

**Error**: 
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions**:
1. Update backend `CLIENT_URL` to match frontend URL
2. Restart backend on Railway
3. Check CORS middleware is enabled

### Can't Connect to Backend

**Error**: API endpoint not responding

**Solutions**:
1. Verify backend service is "Running"
2. Test backend health endpoint: `https://backend-url/health`
3. Check network connectivity
4. Verify firewall allows HTTPS

---

## 📚 FILES YOU'LL MODIFY

### Frontend
- `.env.production` (if using local)
- `railway.json` (if exists)
- `nixpacks.toml` (already created)
- `next.config.ts` (likely no changes)

### Backend (for CORS)
- `api/.env` → Update `CLIENT_URL`
- `api/src/app.js` → CORS config (usually no changes needed)

---

## ✨ ADVANTAGES OF RAILWAY DEPLOYMENT

Once deployed on Railway:

1. **Single Dashboard**
   - Both frontend and backend visible
   - Easy to manage environment variables

2. **Internal Communication**
   - Frontend can call backend via `http://service-name:4000`
   - No need for full URL in same project
   - Faster network communication

3. **Easy Scaling**
   - Add more resources easily
   - Monitor both services together

4. **Simplified CORS**
   - Internal services communicate without CORS issues
   - External requests still go through API gateway

5. **Unified Logs**
   - See both frontend and backend logs in one place
   - Easier debugging

---

## 🎊 FINAL ARCHITECTURE

After deploying frontend to Railway:

```
┌─────────────────────────────────┐
│      Browser / User             │
└────────────┬────────────────────┘
             │ HTTPS
             ↓
┌─────────────────────────────────┐
│    Railway Frontend (Next.js)    │
│    https://quantum-web.railway  │
└────────────┬────────────────────┘
             │ Internal HTTP
             ↓
┌─────────────────────────────────┐
│    Railway Backend (Express)     │
│    http://quantum-api:4000       │
│    (or https://quantum-api...)   │
└────────────┬────────────────────┘
             │ HTTPS
             ↓
┌─────────────────────────────────┐
│      MongoDB Atlas Cloud         │
└─────────────────────────────────┘
```

---

## 📝 SUMMARY

### What You're Doing
Deploying your Next.js frontend to Railway instead of Vercel

### What You Need
- Railway account
- GitHub connected
- Frontend project ready
- Backend already on Railway

### What Changes
- Frontend URL: `https://quantum-web.railway.app` (instead of Vercel)
- CORS configuration: Simpler (internal communication)
- Everything in one Railway dashboard

### Time Required
- Setup: 10 minutes
- First deployment: 5 minutes
- Total: 15 minutes

---

## 🚀 READY TO DEPLOY?

Follow these steps in order:

1. ✅ Prepare frontend (already done)
2. ⏳ Create Railway project for frontend
3. ⏳ Set environment variables
4. ⏳ Update backend CLIENT_URL
5. ⏳ Push to GitHub
6. ⏳ Monitor deployment
7. ⏳ Test frontend

**Let me know if you need help with any step!** 🎉

---

**Status**: ✅ **READY TO DEPLOY ON RAILWAY**  
**Next Action**: Create new Railway project for frontend  
**Time to Live**: 15-20 minutes

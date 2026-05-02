# 🚀 Production Deployment Guide - Railway + Vercel

## ✅ Pre-Deployment Checklist

- [x] Backend Node.js 20.x configured
- [x] Frontend Node.js 20.x configured
- [x] Environment variables prepared
- [x] CORS configured for production domains
- [x] MongoDB Atlas connected
- [x] Railway.json configured
- [x] Procfile created

---

## 🔧 STEP 1: Deploy Backend to Railway

### 1.1 Create Railway Project
1. Go to https://railway.app/dashboard
2. Click "Create New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account (sangamyo/Team-Task-Manager-Full-Stack-)
5. Select the repository

### 1.2 Configure Backend Service
1. In Railway Dashboard, click your project
2. Click "New Service" → "GitHub Repo"
3. Select the repository branch (main)
4. In Railway service settings:
   - **Service Name**: `quantum-task-api`
   - **Root Directory**: `/api`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 1.3 Set Environment Variables in Railway

Go to your service → **Variables** tab and add:

```env
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
JWT_EXPIRES_IN=14d
CLIENT_URL=https://your-frontend-url.vercel.app
```

**IMPORTANT**: Replace `https://your-frontend-url.vercel.app` with your actual Vercel frontend URL after deploying frontend!

### 1.4 Deploy Backend
1. Click the service
2. Go to **Deployments** tab
3. Click **Deploy** button
4. Wait for deployment to complete (you'll see green checkmark)

### 1.5 Get Railway Backend URL
1. In your Railway service, go to **Settings**
2. Look for "Domains" section
3. Copy the public URL (should be like `https://quantum-task-api-prod.up.railway.app`)

**Save this URL!** You'll need it for frontend.

---

## 🎨 STEP 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Project
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository (sangamyo/Team-Task-Manager-Full-Stack-)
4. Select repository

### 2.2 Configure Frontend
**Project Settings:**
- **Framework Preset**: Next.js
- **Root Directory**: `./web`
- **Build Command**: `npm run build`
- **Start Command**: `npm start` (or leave default)
- **Install Command**: `npm install`

### 2.3 Set Environment Variables
1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-railway-backend-url.up.railway.app` (use the URL from Step 1.5)
   - **Environments**: Select `Production`, `Preview`, and `Development`
3. Click **Save**

### 2.4 Deploy Frontend
1. Click **Deploy** button
2. Wait for deployment to complete
3. You'll get a Vercel URL (e.g., `https://quantum-task-manager.vercel.app`)

---

## 🔄 STEP 3: Connect Backend ↔ Frontend

Now you need to update the backend's `CLIENT_URL` to your Vercel frontend URL.

### 3.1 Update Backend CLIENT_URL
1. Go to Railway Dashboard → your service
2. Go to **Variables** tab
3. Update `CLIENT_URL` to your Vercel URL (e.g., `https://quantum-task-manager.vercel.app`)
4. Click **Save**

### 3.2 Redeploy Backend
1. In Railway, click **Deployments**
2. Click **Redeploy** button
3. Wait for new deployment to complete

### 3.3 Redeploy Frontend (Optional)
1. In Vercel, click **Deployments**
2. Find latest deployment, click three dots
3. Select **Redeploy**
4. Wait for completion

---

## 🧪 STEP 4: Test Production

### 4.1 Test Backend Health
```bash
curl https://your-railway-backend-url.up.railway.app/health
```

Expected response:
```json
{
  "status": "OK",
  "service": "quantum-task-api",
  "uptime": 123.45
}
```

### 4.2 Test Frontend Access
1. Go to your Vercel URL: `https://your-vercel-frontend.vercel.app`
2. Click Login
3. Enter credentials:
   - Email: `admin@quantum.team`
   - Password: `password123`
4. Should see dashboard load successfully

### 4.3 Check Network in DevTools
1. Open DevTools (F12)
2. Go to **Network** tab
3. Try login
4. Check POST request to `/api/auth/login`
5. Should see `200` status code
6. Response should contain `token` and `user` data

### 4.4 Check Browser Console
- Should have no red errors
- Should see successful authentication messages

---

## 📝 Environment Variables Summary

### Railway Backend (.env)
```env
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
JWT_EXPIRES_IN=14d
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
```

### Vercel Frontend
```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

---

## 🚨 Troubleshooting

### Issue: "Failed to fetch" or Network Error
**Solution:**
1. Check backend is running: Visit `https://your-railway-url/health`
2. Verify `NEXT_PUBLIC_API_URL` in Vercel matches your Railway URL
3. Check CORS: Backend's `CLIENT_URL` should match Vercel URL
4. Check Railway logs: Dashboard → Service → Logs

### Issue: CORS Error
**Solution:**
1. Update `CLIENT_URL` in Railway to exact Vercel URL
2. Redeploy backend after changing variable
3. Clear browser cache and try again
4. Check DevTools Console for exact error message

### Issue: 404 on Login
**Solution:**
1. Verify endpoint exists: `https://your-railway-url/api/auth/login`
2. Check backend logs for route errors
3. Verify authentication routes are properly imported in app.js

### Issue: MongoDB Connection Failed
**Solution:**
1. Check `MONGODB_URI` in Railway environment variables
2. Verify MongoDB Atlas connection string is correct
3. Check IP whitelist in MongoDB Atlas (allow all IPs with 0.0.0.0/0)
4. Test connection locally first

### Issue: Invalid JWT Token
**Solution:**
1. Verify `JWT_SECRET` is same across deployments
2. Don't change `JWT_SECRET` after tokens are issued
3. Clear browser storage (`quantum-teams-token`) and try login again
4. Check token expiration time

---

## 📊 Deployment Architecture

```
┌─────────────────────────────────────────┐
│   Browser                               │
│   https://quantum-task-manager.vercel.app │
└────────────────┬────────────────────────┘
                 │ HTTP/HTTPS
                 ↓
┌─────────────────────────────────────────┐
│   Frontend (Next.js on Vercel)          │
│   ✓ React + TypeScript + Tailwind       │
│   ✓ Port: 443 (HTTPS only)              │
│   ✓ Auto-deployed from /web folder      │
└────────────────┬────────────────────────┘
                 │ API Calls
                 ↓
┌─────────────────────────────────────────┐
│   Backend (Express on Railway)          │
│   ✓ Node.js 20.x                        │
│   ✓ Port: 4000                          │
│   ✓ Auto-deployed from /api folder      │
│   ✓ https://your-railway-url.up.railway.app │
└────────────────┬────────────────────────┘
                 │ Database Calls
                 ↓
┌─────────────────────────────────────────┐
│   MongoDB Atlas (Cloud)                 │
│   ✓ Production Database                 │
│   ✓ Secure Connection                   │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist: Before Going Live

- [ ] Backend deployed on Railway
- [ ] Frontend deployed on Vercel
- [ ] Backend URL obtained from Railway
- [ ] Frontend environment variables set
- [ ] Backend CLIENT_URL updated and redeployed
- [ ] Backend health endpoint tested
- [ ] Frontend loads without errors
- [ ] Login works with test credentials
- [ ] API requests show in Network tab
- [ ] No CORS errors in console
- [ ] MongoDB connection verified
- [ ] JWT tokens working
- [ ] Dashboard displays data
- [ ] All features tested

---

## 🎯 Local Development vs Production

### Local
```
Frontend: http://localhost:3000
Backend: http://localhost:4000
Database: MongoDB (Local 27017)
Env: .env.local, .env.local
```

### Production
```
Frontend: https://your-project.vercel.app
Backend: https://your-project-xyz.up.railway.app
Database: MongoDB Atlas (Cloud)
Env: Vercel Dashboard, Railway Dashboard
```

---

## 📞 Support Resources

- **Railway Docs**: https://railway.app/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Express on Railway**: https://railway.app/templates/express

---

## 🔐 Security Notes

1. **Keep JWT_SECRET Safe**: Don't share it in code, only in Railway Dashboard
2. **MongoDB Credentials**: Already in MONGODB_URI, keep secure
3. **CORS Policy**: Only allows specified domains
4. **Environment Variables**: Never commit .env files (already in .gitignore)
5. **HTTPS Only**: All production traffic is encrypted

---

## 🎉 Deployment Complete!

After following all steps, you'll have:
- ✅ Production-ready backend on Railway
- ✅ Production-ready frontend on Vercel
- ✅ Real-time data sync with MongoDB Atlas
- ✅ Secure JWT authentication
- ✅ Scalable infrastructure
- ✅ Zero downtime deployments

**Your application is now live!** 🚀

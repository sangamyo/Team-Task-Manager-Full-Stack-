# 🚀 QUICK START: Railway + Vercel Deployment

## 📋 What Was Fixed

✅ **Backend (Node.js/Express)**
- Port changed from 5000 → **4000**
- Node.js engine: **20.x**
- MongoDB URI: **MongoDB Atlas** configured
- Environment files created for local and production
- Procfile: `web: npm start`
- Railway.json: `startCommand: npm start`

✅ **Frontend (Next.js/React)**
- Node.js engine: **20.x**
- Environment files for development and production
- API URL configured for localhost:4000 (development)
- Ready for Railway backend URL (production)

✅ **Security**
- JWT authentication: **14 days**
- CORS: Allows Vercel domains
- MongoDB Atlas: Production database
- Secrets in environment variables only

---

## 🎯 Deployment Steps (5 Minutes)

### Step 1: Deploy Backend to Railway (2 minutes)
1. Go to https://railway.app/dashboard
2. Click "New Project" → "GitHub Repo"
3. Select: `sangamyo/Team-Task-Manager-Full-Stack-`
4. Set **Root Directory**: `/api`
5. Click "Deploy"
6. Go to Variables tab, add these:
```
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
JWT_EXPIRES_IN=14d
CLIENT_URL=https://your-vercel-url.vercel.app
```
7. **Copy Railway URL** (you'll need it)

### Step 2: Deploy Frontend to Vercel (2 minutes)
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select: `sangamyo/Team-Task-Manager-Full-Stack-`
4. Set **Root Directory**: `./web`
5. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-url.up.railway.app` (from Step 1.7)
6. Click "Deploy"
7. **Copy Vercel URL** (you'll need it)

### Step 3: Update Backend with Frontend URL (1 minute)
1. Go to Railway Dashboard
2. Click your service
3. Go to Variables
4. Update `CLIENT_URL` to your Vercel URL (from Step 2.7)
5. Click "Redeploy"

---

## ✅ Test Your Deployment

### Test Backend
```bash
curl https://your-railway-url.up.railway.app/health
```
Should return: `{"status":"OK","service":"quantum-task-api",...}`

### Test Frontend
1. Go to `https://your-vercel-url.vercel.app/login`
2. Login with: `admin@quantum.team` / `password123`
3. Should see dashboard

---

## 📁 File Changes Summary

### Backend
- `api/package.json` - Added Node 20.x
- `api/.env` - Set to production MongoDB Atlas
- `api/.env.local` - Local development setup
- `api/.env.production` - Production template
- `api/src/server.js` - Port 4000, better logging
- `api/Procfile` - `web: npm start`
- `railway.json` - Added `startCommand`

### Frontend
- `web/.env.local` - Localhost backend
- `web/.env.production.local` - Production template
- All Next.js configs verified

### Documentation
- `PRODUCTION_DEPLOYMENT.md` - Complete guide
- `DEPLOYMENT_CHECKLIST.md` - Full checklist

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check Railway logs for errors |
| Frontend can't reach API | Verify `NEXT_PUBLIC_API_URL` in Vercel |
| CORS error | Update `CLIENT_URL` in Railway to exact Vercel URL |
| Login fails | Check backend MongoDB connection in Railway logs |
| 404 on API | Verify Railway backend is running |

---

## 🔐 Important URLs

Once deployed, you'll have:

```
Frontend:  https://your-project.vercel.app
Backend:   https://your-project-xyz.up.railway.app
Login:     https://your-project.vercel.app/login
API:       https://your-project-xyz.up.railway.app/api
```

**Test Credentials:**
- Email: `admin@quantum.team`
- Password: `password123`

---

## 📚 Full Documentation

For complete details, see:
- `PRODUCTION_DEPLOYMENT.md` - Step-by-step guide
- `DEPLOYMENT_CHECKLIST.md` - Full checklist
- `api/.env.template` - Backend environment reference
- `web/.env.template` - Frontend environment reference

---

## ✨ You're Ready!

Your full-stack app is production-ready. Follow the 3 deployment steps above and you'll be live in minutes! 🎉

**Questions?** Check the full documentation files or Railway/Vercel docs.

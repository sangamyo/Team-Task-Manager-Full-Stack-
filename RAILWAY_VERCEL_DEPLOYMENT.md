# 🚀 RAILWAY BACKEND + VERCEL FRONTEND DEPLOYMENT GUIDE

## 📋 STEP-BY-STEP DEPLOYMENT SETUP

### ✅ STEP 1: Get Your Railway Backend URL

1. Go to **https://railway.app**
2. Login to your account
3. Navigate to your project
4. Go to **Deployments** tab
5. Find your backend service
6. Copy the **URL** (should look like: `https://your-project-name.up.railway.app`)

**Save this URL - you'll need it!**

---

### ✅ STEP 2: Update Vercel Frontend Environment Variables

1. Go to **https://vercel.com/dashboard**
2. Select your **web** project
3. Go to **Settings** → **Environment Variables**
4. **Add new variable:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-backend-url.up.railway.app` (replace with your actual URL)
   - Environments: Select **Production**, **Preview**, and **Development**
5. Click **Save**

---

### ✅ STEP 3: Update Railway Backend Environment Variables

1. Go to **https://railway.app**
2. Select your project
3. Click your **backend service**
4. Go to **Variables** tab
5. Update/Add these variables:
   - `CLIENT_URL`: Your Vercel frontend URL (e.g., `https://your-frontend.vercel.app`)
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: Set to `production`

---

### ✅ STEP 4: Redeploy Both Applications

**Frontend (Vercel):**
1. Go to Vercel Dashboard
2. Select your project
3. Click **Deployments**
4. Click the three dots menu
5. Select **Redeploy**
6. Confirm and wait for deployment

**Backend (Railway):**
1. Go to Railway Dashboard
2. Select your project
3. Click your service
4. Go to **Deployments** tab
5. Click **Deploy** or **Redeploy**

---

## 📝 LOCAL CONFIGURATION

### For Local Development

**File: web/.env.local**
```bash
# Local development - use localhost
NEXT_PUBLIC_API_URL=http://localhost:4000

# Production - use Railway backend (uncomment for testing production)
# NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

**File: api/.env**
```bash
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/quantum-teams
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=14d
CLIENT_URL=http://localhost:3000
```

---

## 🔗 PRODUCTION CONFIGURATION

### Railway Backend Environment Variables

```bash
# Server
PORT=4000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=14d

# Frontend URL (for CORS)
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
```

### Vercel Frontend Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

---

## 🧪 TESTING YOUR DEPLOYMENT

### Test Backend is Working
```bash
curl https://your-railway-backend-url.up.railway.app/api/health

# Expected response:
# {"status":"ok","service":"quantum-task-api"}
```

### Test Login on Deployed Frontend
1. Go to `https://your-frontend.vercel.app/login`
2. Enter credentials:
   - Email: `admin@quantum.team`
   - Password: `password123`
3. Should login successfully

### Check Network in DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Try login
4. Should see POST request to `https://your-railway-backend-url.up.railway.app/api/auth/login`
5. Status should be 200

---

## ✅ CHECKLIST

- [ ] Got Railway backend URL
- [ ] Added NEXT_PUBLIC_API_URL to Vercel environment variables
- [ ] Updated CLIENT_URL in Railway backend environment
- [ ] Redeployed frontend on Vercel
- [ ] Redeployed backend on Railway
- [ ] Tested backend health endpoint
- [ ] Tested login on frontend
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] Successfully logging in

---

## 🚨 COMMON ISSUES & FIXES

### Issue: "Failed to fetch" or "Network error"
**Solution:**
- Check backend is running on Railway (go to Deployments)
- Verify NEXT_PUBLIC_API_URL is correct in Vercel
- Check Railway backend logs for errors
- Make sure MongoDB connection is working

### Issue: CORS error
**Solution:**
- Check CLIENT_URL is correct in Railway backend
- It should match your Vercel frontend URL exactly
- Include the `https://` protocol
- Redeploy backend after changing CLIENT_URL

### Issue: 404 on login
**Solution:**
- Verify API endpoint exists: `https://your-railway-backend-url.up.railway.app/api/auth/login`
- Check backend routes are correctly defined
- Check backend logs for route errors

### Issue: Invalid JWT token
**Solution:**
- Make sure JWT_SECRET is same on backend
- Don't change JWT_SECRET after deployment
- Clear browser storage and try again

---

## 📱 URLS TO REMEMBER

| Service | URL |
|---------|-----|
| **Frontend** | https://your-frontend.vercel.app |
| **Backend API** | https://your-railway-backend-url.up.railway.app |
| **Login Page** | https://your-frontend.vercel.app/login |
| **API Health** | https://your-railway-backend-url.up.railway.app/api/health |

---

## 🔄 DEPLOYMENT WORKFLOW

```
Local Development:
├─ Backend on localhost:4000
├─ Frontend on localhost:3000
└─ MongoDB on localhost:27017

↓↓↓ Deploy ↓↓↓

Production:
├─ Backend on Railway
├─ Frontend on Vercel
└─ MongoDB Atlas (or Railway)
```

---

## 🎯 NEXT STEPS

1. **Get your Railway backend URL**
2. **Update Vercel environment variable** with the URL
3. **Redeploy frontend** on Vercel
4. **Test the login** on your production URL
5. **Monitor logs** if there are any issues

---

## 📞 SUPPORT

If you encounter any issues:
1. Check Railway logs: Dashboard → Project → Service → Logs
2. Check Vercel logs: Dashboard → Project → Deployments → Logs
3. Check browser console (F12) for client-side errors
4. Check Network tab in DevTools for API errors


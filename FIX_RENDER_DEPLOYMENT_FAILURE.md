# 🔧 FIX: Render Backend Deployment Failure

**Error**: `Exited with status 1 while building your code`

**Cause**: Render is trying to deploy the entire monorepo instead of just the `/api` folder

---

## ❌ WHAT WENT WRONG

```
Render tried to:
❌ Deploy root directory (has both /web and /api)
❌ Build failed because can't find proper configuration
❌ Attempted to use root .node-version file
```

---

## ✅ HOW TO FIX IT

### **Option 1: Redeploy with Correct Configuration (Recommended)**

1. **Go to Render Dashboard**
   - https://render.com/dashboard

2. **Delete the Failed Service**
   - Click: Your failed backend service
   - Click: **Settings**
   - Scroll down: **Delete service**
   - Confirm: Click **Delete**

3. **Create New Web Service - CORRECTLY**
   - Click: **New +** button
   - Select: **Web Service**
   - Connect GitHub: `sangamyo/Team-Task-Manager-Full-Stack-`
   - Configure:
     ```
     Name: quantum-task-api
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     Root Directory: api     ← THIS IS IMPORTANT!
     ```
   - Save

4. **Add Environment Variables**
   - After service creates, go to: **Environment**
   - Add all 6 variables:
     ```
     PORT=4000
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
     JWT_EXPIRES_IN=14d
     CLIENT_URL=https://team-task-manager-full-stack-production-669d.up.railway.app
     ```

5. **Wait for Deploy**
   - Status changes: Building → Deploying → Running
   - Check logs for: "Server running on port 4000"

---

### **Option 2: Fix Without Deleting (If Deletion Failed)**

1. **Go to Service Settings**
   - Render dashboard → Your service → **Settings**

2. **Update Root Directory**
   - Find: **Root Directory** field
   - Change: from empty → `api`
   - Click: **Save**

3. **Trigger Redeploy**
   - Click: **Manual Deploy**
   - Or: Push new commit to GitHub (auto-redeploy)

---

## 📋 STEP-BY-STEP DEPLOY GUIDE

### **New Render Backend Deployment**

```
1. Go to: https://render.com
   ↓
2. Sign in / Create account
   ↓
3. Click: New +
   ↓
4. Select: Web Service
   ↓
5. Connect GitHub Repo
   - Select: Team-Task-Manager-Full-Stack-
   ↓
6. Configure Service
   - Name: quantum-task-api
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   - Root Directory: api  ← IMPORTANT!
   ↓
7. Choose Plan
   - Free: $0 (cold starts after 15 min)
   - Paid: $7/month (always on)
   ↓
8. Create Web Service
   ↓
9. Wait for deployment (5-10 minutes)
   ↓
10. Get your URL: https://quantum-task-api-xxxx.onrender.com
    ↓
11. Add 6 Environment Variables
    ↓
12. Service auto-redeploys
    ↓
13. Test: Visit /health endpoint
    ↓
✅ Backend running!
```

---

## 🎯 KEY CONFIGURATION POINTS

**What Render Needs:**

| Setting | Value | Why |
|---------|-------|-----|
| **Repository** | Team-Task-Manager-Full-Stack- | Your GitHub repo |
| **Root Directory** | `api` | Only deploy backend, not frontend |
| **Build Command** | `npm install` | Install dependencies from `/api/package.json` |
| **Start Command** | `npm start` | Run server (from `/api/src/server.js`) |
| **Node Version** | 20.17.1 | Specified in `/api/.node-version` |
| **Environment Variables** | 6 variables | MongoDB, JWT, Ports, etc. |

---

## 🔍 VERIFY DEPLOYMENT

Once deployed, test:

1. **Check Health Endpoint**
   ```
   Visit: https://quantum-task-api-xxxx.onrender.com/health
   Expected: {"status": "OK", "service": "quantum-task-api", "uptime": ...}
   ```

2. **Check Root Endpoint**
   ```
   Visit: https://quantum-task-api-xxxx.onrender.com/
   Expected: {"message": "Backend is live", "service": "quantum-task-api", ...}
   ```

3. **Check Logs**
   ```
   Render Dashboard → Logs
   Should see: "Server running on port 4000"
   ```

---

## ⚙️ ENVIRONMENT VARIABLES (Exact Values)

Copy these exactly into Render Environment tab:

```
PORT
4000

NODE_ENV
production

MONGODB_URI
mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET
Hariom_Team_Task_Manager_2026_Ultra_Secure_Key

JWT_EXPIRES_IN
14d

CLIENT_URL
https://team-task-manager-full-stack-production-669d.up.railway.app
```

---

## 🧪 TROUBLESHOOTING

### **Build still fails?**

1. Check logs in Render dashboard
2. Look for error messages
3. Common issues:
   - ❌ Missing `api/` in Root Directory
   - ❌ Wrong Start Command
   - ❌ Node version mismatch
   - ❌ Missing environment variables

### **Service running but "Service Unavailable"?**

1. Check if free tier (might be spinning down)
2. Wait 30 seconds for cold start
3. Check if PORT=4000 is set
4. Check if MONGODB_URI is correct

### **Health endpoint returns error?**

1. Check MongoDB connection string
2. Verify MongoDB credentials are correct
3. Check if MongoDB Atlas allows Render IP
4. See Render logs for error messages

---

## 📊 COMPARISON: Railway vs Render

| Aspect | Railway | Render |
|--------|---------|--------|
| **Free Tier** | $5/month | Free (with cold starts) |
| **Root Directory Support** | Yes | Yes |
| **Node Version** | Auto-detects | Uses specified version |
| **Cold Starts** | None | Yes (free tier) |
| **Deployment Time** | 2-3 min | 5-10 min |
| **Documentation** | Excellent | Good |
| **Easier Setup** | Slightly | Yes |

---

## 🚀 RECOMMENDED APPROACH

If Render keeps failing:

1. **Go back to Railway** (your original choice)
   - Add backend variables to Railway
   - Should be simpler and more reliable
   - You already have monorepo config for Railway

2. **Or use separate Render account with just backend repo**
   - Create new GitHub repo with just `/api` folder
   - Deploy that repo on Render
   - Much simpler!

---

## 📝 SUMMARY

**To fix Render deployment:**

1. **Option A** (Recommended): Delete service, create new one with `Root Directory: api`
2. **Option B**: Edit existing service, set `Root Directory: api`, redeploy

**Environment variables:** Copy 6 variables from `/api/.env`

**Deployment time:** 5-10 minutes

**Result:** Backend running on Render ✅

---

**Next Step**: Delete failed service and create new one with correct "Root Directory" setting! 🚀

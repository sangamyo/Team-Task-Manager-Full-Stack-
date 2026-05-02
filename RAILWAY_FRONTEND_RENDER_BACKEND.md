# 🔗 Frontend (Railway) → Backend (Render) Setup

**Configuration**: Frontend deployed on Railway, Backend deployed on Render

---

## 📊 DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────┐
│ Frontend (Next.js)                      │
│ Railway                                 │
│ https://team-task-manager-xxxx.railway.app │
└──────────────────┬──────────────────────┘
                   │
                   │ API calls
                   ↓
┌─────────────────────────────────────────┐
│ Backend (Express.js)                    │
│ Render                                  │
│ https://quantum-task-api.onrender.com   │
└──────────────────┬──────────────────────┘
                   │
                   │ Database queries
                   ↓
┌─────────────────────────────────────────┐
│ Database (MongoDB Atlas)                │
│ mongodb+srv://cluster0.euj8w0d...       │
└─────────────────────────────────────────┘
```

---

## 🎯 WHAT YOU NEED TO DO

### **Frontend (Railway) - 1 Variable**

**Railway → Frontend Service → Variables**

```
Name:  NEXT_PUBLIC_API_URL
Value: https://quantum-task-api.onrender.com
```

### **Backend (Render) - 6 Variables**

**Render → Backend Service → Environment**

```
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
JWT_EXPIRES_IN=14d
CLIENT_URL=https://team-task-manager-full-stack-production-669d.up.railway.app
```

---

## 🚀 STEP-BY-STEP SETUP

### **Step 1: Deploy Backend on Render**

1. Go to: https://render.com
2. Click: **New +**
3. Select: **Web Service**
4. Connect: GitHub repository
5. Choose: Repository with backend code
6. Configure:
   - **Name**: `quantum-task-api`
   - **Region**: Choose closest to you
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Paid)

7. Click: **Create Web Service**
8. Render builds and deploys (takes ~5-10 minutes)
9. Once deployed, you get URL: `https://quantum-task-api-xxxx.onrender.com`

### **Step 2: Add Environment Variables on Render**

1. Render dashboard → Your backend service
2. Go to: **Environment** tab
3. Click: **Add Environment Variable**
4. Add all 6 variables (listed above)
5. Click: **Save Changes**
6. Service auto-redeploys with new variables

### **Step 3: Verify Backend is Running**

1. Visit: `https://quantum-task-api-xxxx.onrender.com/health`
2. Should see:
   ```json
   {
     "status": "OK",
     "service": "quantum-task-api",
     "uptime": 123
   }
   ```
3. ✅ Backend is running!

### **Step 4: Set Frontend Variable on Railway**

1. Railway → Frontend Service → Variables
2. Add:
   ```
   Name:  NEXT_PUBLIC_API_URL
   Value: https://quantum-task-api-xxxx.onrender.com
   ```
3. Click: **Add**
4. Frontend auto-redeploys

### **Step 5: Test Connection**

1. Visit: `https://team-task-manager-full-stack-production-669d.up.railway.app`
2. Open: DevTools (F12)
3. Network tab
4. Try: Login or Signup
5. Verify: Requests go to Render backend ✅

---

## 📋 ENVIRONMENT VARIABLES SUMMARY

### **Render Backend (6 variables)**

| Name | Value |
|------|-------|
| PORT | 4000 |
| NODE_ENV | production |
| MONGODB_URI | `mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0` |
| JWT_SECRET | `Hariom_Team_Task_Manager_2026_Ultra_Secure_Key` |
| JWT_EXPIRES_IN | 14d |
| CLIENT_URL | `https://team-task-manager-full-stack-production-669d.up.railway.app` |

### **Railway Frontend (1 variable)**

| Name | Value |
|------|-------|
| NEXT_PUBLIC_API_URL | `https://quantum-task-api-xxxx.onrender.com` |

---

## 🔗 URL PATTERNS

| Service | Platform | URL Format | Example |
|---------|----------|-----------|---------|
| Frontend | Railway | `https://name-xxxx.railway.app` | `https://team-task-manager-full-stack-production-669d.up.railway.app` |
| Backend | Render | `https://name-xxxx.onrender.com` | `https://quantum-task-api-prod-abc123.onrender.com` |
| Database | MongoDB Atlas | `mongodb+srv://...` | Already configured |

---

## ⚙️ CORS CONFIGURATION

Your backend CORS is already configured to accept Railway URLs:

```javascript
// In api/src/app.js
origin: (origin, callback) => {
  if (!origin || 
      allowedOrigins.includes(origin) || 
      origin.endsWith("vercel.app") || 
      origin.endsWith("railway.app")) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
}
```

✅ CORS will pass because:
- Frontend origin: `team-task-manager-full-stack-production-669d.up.railway.app` (ends with `.railway.app`)
- CORS allows `.railway.app` domains

---

## 🧪 TESTING CHECKLIST

- [ ] Backend deployed on Render
- [ ] Backend URL working: `/health` endpoint responds
- [ ] All 6 backend environment variables set
- [ ] Frontend has `NEXT_PUBLIC_API_URL` set to Render backend
- [ ] Visit frontend URL
- [ ] Try login (admin@quantum.team / password123)
- [ ] DevTools Network shows calls to Render backend
- [ ] Login succeeds
- [ ] Dashboard shows data
- [ ] No CORS errors

---

## 🎯 KEY DIFFERENCES: Railway vs Render

| Aspect | Railway | Render |
|--------|---------|--------|
| **Free Tier** | $5/month | Free |
| **Cold Starts** | None | Yes (free tier) |
| **Build Time** | ~2-3 min | ~3-5 min |
| **URL Format** | `.railway.app` | `.onrender.com` |
| **Environment Variables** | Easy UI | Easy UI |
| **Database** | Supports PostgreSQL | Supports PostgreSQL |
| **Best For** | Production | Learning/Free |

---

## 📝 RENDER DEPLOYMENT TIPS

1. **Free tier limitations**:
   - Services spin down after 15 min of inactivity
   - First request after spin-down takes ~30 seconds
   - Use Paid tier ($7/month) for always-on

2. **Build logs**: Check if build fails
   - Render dashboard → Logs tab
   - Look for error messages

3. **Health checks**: Render can auto-restart failed services
   - Set health check URL: `/health`
   - Render monitors this endpoint

4. **Database**: MongoDB Atlas connection should work same as Railway

---

## 🚀 DEPLOYMENT TIMELINE

| Step | Time | Status |
|------|------|--------|
| 1. Deploy backend on Render | 5-10 min | Deploying... |
| 2. Add environment variables | 2 min | Auto-redeploy |
| 3. Test backend health | 1 min | Check `/health` |
| 4. Set frontend variable | 2 min | Railway redeploy |
| 5. Test login | 2 min | Verify connection |
| **Total** | **~20 minutes** | ✅ Ready! |

---

## 🔍 TROUBLESHOOTING

**Problem: Backend shows as "spinning down"**
- Solution: Use Paid Render plan for always-on service

**Problem: CORS error still appears**
- Check: `NEXT_PUBLIC_API_URL` is set correctly on Railway
- Check: Backend URL is actually `onrender.com`, not typo
- Check: Backend environment variables are set

**Problem: Login fails**
- Check: Network tab shows request to correct Render URL
- Check: Backend logs show error messages
- Check: MongoDB connection is working

**Problem: "Service unavailable" error**
- Wait: Free tier services cold-start after 15 min inactivity
- Solution: First request will take ~30 seconds, then works fine

---

## ✅ SUMMARY

**Frontend**: Railway (NEXT_PUBLIC_API_URL → Render backend)
**Backend**: Render (6 environment variables)
**Database**: MongoDB Atlas (already connected)

**Total setup time**: ~20 minutes ⏱️

**Result**: Full-stack app with:
- ✅ Frontend on Railway
- ✅ Backend on Render
- ✅ Database on MongoDB Atlas
- ✅ Login and dashboard working
- ✅ API calls successful

---

**Next Step**: Go deploy backend on Render! 🚀

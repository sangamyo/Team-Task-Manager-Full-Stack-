# 🔗 VERCEL ↔️ RAILWAY CONNECTION GUIDE

**Date**: May 2, 2026  
**Objective**: Connect Vercel frontend to Railway backend  
**Status**: ✅ **STEP-BY-STEP GUIDE**

---

## 🎯 OVERVIEW

Your application architecture:
```
Vercel Frontend (Next.js)  ←→  Railway Backend (Express)
   https://vercel-url         https://railway-url
   (Browser)                  (API Server)
```

The frontend needs to know the backend URL to make API calls.

---

## 📍 STEP 1: GET YOUR RAILWAY BACKEND URL

### Where to Find It

1. **Go to Railway Dashboard**
   - URL: https://railway.app/dashboard
   - Login with GitHub

2. **Select Your Project**
   - Click: `quantum-api` (or your backend project)

3. **Find the Public URL**
   - Go to: "Deployments" tab
   - Look for: **Public URL** or **Domain**
   - Example: `https://your-railway-deployment-url`
   - Or: `your-railway-subdomain.railway.app`

### How to Copy the URL
```
Click on the URL field
Right-click → Copy
Or press Ctrl+C (Cmd+C on Mac)
```

**Important**: This URL should look like:
```
✅ https://your-service-name.railway.app
✅ https://quantum-task-manager.railway.app
❌ NOT localhost:4000 (that's local only)
```

---

## 🔐 STEP 2: CONFIGURE VERCEL ENVIRONMENT VARIABLES

### What to Set
```
Variable Name:  NEXT_PUBLIC_API_URL
Variable Value: https://your-railway-url
```

**Why `NEXT_PUBLIC_`?**
- This prefix makes it available to the browser
- Frontend needs to access it from browser code
- Must be public (no sensitive data here)

### How to Add It to Vercel

#### Method 1: Via Vercel Dashboard (RECOMMENDED)

1. **Go to Vercel Dashboard**
   - URL: https://vercel.com/dashboard

2. **Select Your Project**
   - Click: `Team-Task-Manager-Full-Stack-`

3. **Go to Settings**
   - Click: "Settings" tab

4. **Find Environment Variables**
   - Left sidebar → "Environment Variables"

5. **Add New Variable**
   - Click: "Add New"
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-url` (from Step 1)
   - Environment: Select `Production`
   - Click: "Save"

6. **Redeploy**
   - Go back to "Deployments" tab
   - Click on latest deployment
   - Click three dots → "Redeploy"

#### Method 2: Via .env.production (Local)

Create `.env.production` in `/web` folder:
```
NEXT_PUBLIC_API_URL=https://your-railway-url
```

Then commit and push:
```bash
cd web
git add .env.production
git commit -m "Add production API URL"
git push origin main
```

---

## 🔑 STEP 3: UPDATE BACKEND CORS CONFIGURATION

Your backend needs to allow requests from Vercel.

### Check Current CORS Config

Open: `/api/src/app.js` and find:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Update Backend .env

Edit: `/api/.env`

```properties
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
JWT_EXPIRES_IN=14d
CLIENT_URL=https://your-vercel-frontend-url
```

**Replace**: `https://your-vercel-frontend-url` with actual Vercel URL  
Example: `https://quantum-task-manager.vercel.app`

### Steps to Update Backend

1. **Edit `/api/.env`** in your local editor
2. Update `CLIENT_URL=` line
3. Save the file
4. Commit changes:
   ```bash
   cd api
   git add .env
   git commit -m "Update CLIENT_URL for Vercel frontend"
   git push origin main
   ```
5. **Railway will auto-redeploy** (if you have auto-deploy enabled)

---

## 🔄 STEP 4: VERIFY FRONTEND API CONFIGURATION

### Check Frontend Code

Open: `/web/src/lib/store.tsx` and find:
```typescript
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api`
```

✅ This should be correct already!

---

## 🧪 STEP 5: TEST THE CONNECTION

### Test 1: Check Environment Variable

1. **In Vercel, deploy any page**
2. **Open Browser Console** (F12)
3. **Run this command**:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_API_URL)
   ```
4. **Should show**: `https://your-railway-url`

### Test 2: Test API Call

1. **Visit Vercel Frontend URL**
2. **Open Browser DevTools** (F12)
3. **Go to Network tab**
4. **Try to Login**:
   - Email: `admin@quantum.team`
   - Password: `password123`
5. **Watch Network tab**:
   - Should see API call to Railway backend ✅
   - Status should be 200 (success)
   - Response should have data

### Test 3: Check Console for Errors

1. **Go to Console tab** (F12)
2. **Look for errors**:
   - ✅ No CORS errors
   - ✅ No "Cannot fetch" errors
   - ✅ No connection refused errors

---

## 🔗 CONNECTION FLOW

### How the Frontend Calls Backend

```
1. Browser visits: https://your-vercel-url
2. JavaScript loads with NEXT_PUBLIC_API_URL set
3. User clicks Login button
4. Frontend makes fetch call:
   fetch('https://your-railway-url/api/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password })
   })
5. Request goes to Railway backend
6. Backend processes request
7. Backend returns response
8. Frontend displays result
```

---

## 📋 CHECKLIST

### Before Testing
- [ ] Railway backend is deployed and running
- [ ] You have the Railway backend URL
- [ ] NEXT_PUBLIC_API_URL set in Vercel
- [ ] CLIENT_URL updated in backend .env
- [ ] Both are redeployed

### During Testing
- [ ] Frontend loads without errors
- [ ] Network tab shows API calls
- [ ] API calls go to correct Railway URL
- [ ] No CORS errors in console
- [ ] Login works
- [ ] Dashboard displays data

### Success Indicators
- [ ] Login succeeds
- [ ] Dashboard loads with data
- [ ] No errors in console
- [ ] Network requests succeed (Status 200)
- [ ] Data displays correctly

---

## 🚨 TROUBLESHOOTING

### Problem 1: CORS Error in Console

**Error**:
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**:
1. Check `CLIENT_URL` in `/api/.env`
2. Make sure it matches your Vercel URL exactly
3. Redeploy backend:
   ```bash
   git push origin main  (Railway auto-redeploys)
   ```

### Problem 2: API Not Responding

**Error**:
```
Failed to fetch from https://your-railway-url
```

**Solutions**:
1. Verify Railway backend is running
   - Go to Railway dashboard
   - Check service status = "Running"
2. Test backend directly:
   ```bash
   curl https://your-railway-url/health
   # Should return: {"status":"OK"}
   ```

### Problem 3: Wrong API URL

**Error**:
```
Requests going to localhost instead of Railway
```

**Solution**:
1. Check NEXT_PUBLIC_API_URL in Vercel Settings
2. Make sure it's the full Railway URL
3. Redeploy Vercel:
   - Go to Vercel dashboard
   - Click Redeploy

### Problem 4: Login Not Working

**Error**:
```
401 Unauthorized or authentication fails
```

**Solutions**:
1. Check credentials: `admin@quantum.team` / `password123`
2. Check MongoDB connection in Railway logs
3. Check JWT_SECRET matches between frontend and backend
4. Verify backend is running

---

## 📝 EXAMPLE URLS

### Your URLs Will Look Like

**Vercel Frontend**:
```
https://team-task-manager-full-stack-xyz.vercel.app
```

**Railway Backend**:
```
https://quantum-task-manager-hndr-production.up.railway.app
```

### Environment Variables

**Vercel `.env` (Add via Dashboard)**:
```
NEXT_PUBLIC_API_URL=https://quantum-task-manager-hndr-production.up.railway.app
```

**Backend `/api/.env`**:
```
CLIENT_URL=https://team-task-manager-full-stack-xyz.vercel.app
```

---

## 🔄 SUMMARY OF CHANGES NEEDED

### 1. Vercel Environment Variables
- Add: `NEXT_PUBLIC_API_URL`
- Value: Your Railway URL
- Method: Vercel Dashboard → Settings → Environment Variables

### 2. Backend Environment
- Update: `CLIENT_URL` in `/api/.env`
- Value: Your Vercel frontend URL
- Commit and push to redeploy

### 3. Verification
- Test frontend loads
- Test login works
- Check network requests go to Railway
- Check no errors in console

---

## 🎯 QUICK STEPS (5 Minutes)

```
1. Get Railway URL (1 min)
   - Railway Dashboard → quantum-api → Copy URL

2. Add to Vercel (2 min)
   - Vercel Dashboard → Settings → Add NEXT_PUBLIC_API_URL

3. Update Backend (1 min)
   - Edit /api/.env → Update CLIENT_URL
   - git push origin main (Railway auto-redeploys)

4. Test (1 min)
   - Visit Vercel URL → Try login
   - Check Network tab → Should see Railway calls
```

---

## 📚 FILES INVOLVED

### Frontend
- **`web/.env.local`** (development)
- **Vercel Dashboard** (production)
- **`web/src/lib/store.tsx`** (uses NEXT_PUBLIC_API_URL)

### Backend
- **`api/.env`** (production)
- **`api/.env.local`** (development)
- **`api/src/app.js`** (CORS config)

---

## ✅ FINAL VERIFICATION

Once everything is set up, verify with this checklist:

- [ ] Frontend loads at Vercel URL
- [ ] Backend responds at Railway URL
- [ ] Environment variables are set correctly
- [ ] CORS allows Vercel → Railway requests
- [ ] Login works end-to-end
- [ ] Dashboard displays data
- [ ] No console errors
- [ ] Network requests are successful

---

**Status**: ✅ **READY TO CONNECT**  
**Time Required**: 5-10 minutes  
**Result**: Fully integrated frontend + backend

---

## 🆘 NEED HELP?

Check these files for more details:
- `QUICK_START.md` - Deployment guide
- `FIX_NODE_VERSION.md` - Build configuration
- `FIX_NEXTJS_BUILD.md` - Frontend build fix

Get your Railway URL and follow the steps above! 🚀

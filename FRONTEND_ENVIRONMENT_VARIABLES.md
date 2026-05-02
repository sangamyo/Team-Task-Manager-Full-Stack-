# 🎨 Frontend Environment Variables for Railway

**Purpose**: These variables configure your Next.js frontend to connect to your backend

---

## 📋 COPY & PASTE THIS VARIABLE

### Go to Railway → Frontend Service → Variables Tab

Then add this **1 variable** (that's all you need!):

---

## **Variable: NEXT_PUBLIC_API_URL**

```
Name:  NEXT_PUBLIC_API_URL
Value: https://quantum-task-api-xxxx.railway.app
```

**⚠️ IMPORTANT: Replace `quantum-task-api-xxxx` with YOUR backend service domain!**

---

## 🔍 HOW TO GET YOUR BACKEND URL

### **Step 1: Find Backend URL**
1. Go to: https://railway.app/dashboard
2. Click: **Backend service** (quantum-task-api)
3. Go to: **Settings** tab
4. Find: **Domain** 
5. Copy: The full URL
   - Example: `https://quantum-task-api-production-abc123.railway.app`

### **Step 2: Paste in Frontend**
1. Go to: **Frontend service** (Team-Task-Manager-Full-Stack)
2. Go to: **Variables** tab
3. Click: **+ New Variable**
4. Name: `NEXT_PUBLIC_API_URL`
5. Value: **Your copied backend URL**
6. Click: **Add**

---

## ✅ VERIFICATION CHECKLIST

After adding the variable:

- [ ] Variable name is exactly: `NEXT_PUBLIC_API_URL`
- [ ] Value is your backend Railway URL
- [ ] URL starts with `https://`
- [ ] URL ends with `.railway.app` (not .vercel.app)
- [ ] No trailing slash at the end
- [ ] Frontend service auto-redeploys

---

## 🎯 WHAT THIS VARIABLE DOES

```
NEXT_PUBLIC_API_URL
    ↓
Your frontend code reads this
    ↓
Makes API calls to your backend:
- POST /api/auth/login
- POST /api/auth/signup
- GET /api/projects
- GET /api/tasks
    ↓
Backend responds with data
```

---

## 📝 EXAMPLE

Let's say your backend Railway URL is:
```
https://quantum-task-api-production-xyz789.railway.app
```

Then set:
```
Name:  NEXT_PUBLIC_API_URL
Value: https://quantum-task-api-production-xyz789.railway.app
```

---

## 🚫 COMMON MISTAKES

❌ **Don't do this:**
```
NEXT_PUBLIC_API_URL = http://localhost:4000  (wrong! localhost doesn't exist on Railway)
NEXT_PUBLIC_API_URL = quantum-task-api-xxxx.railway.app  (missing https://)
NEXT_PUBLIC_API_URL = "https://..."  (with quotes)
NEXT_PUBLIC_API_URL = https://quantum-task-api-xxxx.railway.app/  (trailing slash)
next_public_api_url = https://...  (wrong case)
```

✅ **Do this:**
```
NEXT_PUBLIC_API_URL = https://quantum-task-api-xxxx.railway.app  (exactly!)
```

---

## 🧪 TEST AFTER ADDING VARIABLE

1. **Wait** for frontend to redeploy (auto-redeploys, ~2-3 minutes)
2. **Visit** your frontend URL: `https://team-task-manager-full-stack-production-669d.up.railway.app`
3. **Open** DevTools (F12)
4. **Go to** Network tab
5. **Try** to Login or Signup
6. **Look for** POST request to `/api/auth/login`
7. Check the URL - should show your backend URL ✅

---

## 🔗 WHY THIS MATTERS

Without this variable:
```
❌ Frontend tries to call: http://localhost:4000/api/auth/login
❌ Result: Connection refused (localhost doesn't exist on Railway!)
❌ CORS error appears
❌ Login fails
```

With this variable:
```
✅ Frontend calls: https://quantum-task-api-xxxx.railway.app/api/auth/login
✅ CORS check passes (both on railway.app)
✅ Backend receives request
✅ Backend responds with data
✅ Login works!
```

---

## 📊 FRONTEND vs BACKEND COMPARISON

| Aspect | Frontend | Backend |
|--------|----------|---------|
| **Variable Count** | 1 variable | 6 variables |
| **Key Variable** | NEXT_PUBLIC_API_URL | MONGODB_URI |
| **Needs Database URL** | No | Yes ✅ |
| **Needs Backend URL** | Yes ✅ | No (backend IS the URL) |
| **Needs Frontend URL** | No | Yes ✅ (for CORS) |
| **What It Does** | Connects to backend | Connects to database |

---

## 🎯 QUICK SUMMARY

**Frontend only needs 1 variable:**

```
NEXT_PUBLIC_API_URL = <your-backend-railway-url>
```

**Example:**
```
NEXT_PUBLIC_API_URL = https://quantum-task-api-production-abc123.railway.app
```

**Time needed:** 2 minutes ⏱️

**Result:** Frontend knows where to find backend ✅

---

## 📋 STEP-BY-STEP CHECKLIST

- [ ] Get backend Railway URL from Settings → Domain
- [ ] Go to Frontend service → Variables tab
- [ ] Click: + New Variable
- [ ] Name: `NEXT_PUBLIC_API_URL`
- [ ] Value: `https://quantum-task-api-xxxx.railway.app`
- [ ] Click: Add
- [ ] Wait for frontend to redeploy
- [ ] Test: Visit frontend, try login
- [ ] Check DevTools Network tab
- [ ] Verify: API calls go to correct backend URL

---

## 🚀 AFTER THIS IS DONE

Once frontend can reach backend:
1. ✅ Login page will work
2. ✅ Signup will work
3. ✅ Dashboard will load data
4. ✅ All API calls will succeed
5. ✅ No more CORS errors!

---

**Next Step**: Get your backend URL and add this variable to frontend! 🎉

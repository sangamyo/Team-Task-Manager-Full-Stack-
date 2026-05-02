# 🔌 PORTS EXPLAINED - Frontend vs Backend

---

## 📊 QUICK ANSWER

| Service | Port | Where | Purpose |
|---------|------|-------|---------|
| **Backend** | `4000` | Railway environment variable | API server listens here |
| **Frontend** | `3000` | Local development only | Next.js dev server (NOT on Railway) |

---

## 🎯 SIMPLE BREAKDOWN

### **Backend on Railway**
```
PORT = 4000
```
- Backend listens on port 4000
- Railway automatically exposes it publicly
- You access via: `https://quantum-task-api-xxxx.railway.app` (Railway handles port 4000 internally)
- Frontend calls: `https://quantum-task-api-xxxx.railway.app/api/auth/login`

### **Frontend on Railway**
```
NO PORT VARIABLE NEEDED!
```
- Railway automatically runs on port 3000 (standard for Next.js)
- Railway automatically exposes it publicly
- You access via: `https://team-task-manager-full-stack-production-669d.up.railway.app`
- Frontend URL is enough - no need to specify port!

---

## 📍 LOCAL DEVELOPMENT (On Your Computer)

When you run locally:

```bash
# Terminal 1 - Backend on port 4000
cd api
npm start
# Runs on: http://localhost:4000

# Terminal 2 - Frontend on port 3000
cd web
npm run dev
# Runs on: http://localhost:3000
```

Visit: `http://localhost:3000` to access frontend locally

---

## ☁️ ON RAILWAY (Production)

When deployed on Railway:

**Backend:**
- Runs on port 4000 (internal)
- Railway exposes it at: `https://quantum-task-api-xxxx.railway.app`
- No need to add `:4000` - Railway handles it!

**Frontend:**
- Runs on port 3000 (internal)
- Railway exposes it at: `https://team-task-manager-full-stack-production-669d.up.railway.app`
- No need to add `:3000` - Railway handles it!

---

## 🔗 HOW FRONTEND FINDS BACKEND

```
Frontend needs to know backend URL:

NEXT_PUBLIC_API_URL = https://quantum-task-api-xxxx.railway.app

Frontend code:
  const API_URL = NEXT_PUBLIC_API_URL + "/api"
  fetch(`${API_URL}/auth/login`)
  
  Result: 
  fetch("https://quantum-task-api-xxxx.railway.app/api/auth/login")
```

---

## ✅ ENVIRONMENT VARIABLES RECAP

### **Backend (6 variables)**
```
PORT = 4000           ← Backend uses this port
NODE_ENV = production
MONGODB_URI = mongodb+srv://...
JWT_SECRET = ...
JWT_EXPIRES_IN = 14d
CLIENT_URL = https://frontend-url.railway.app
```

### **Frontend (1 variable)**
```
NEXT_PUBLIC_API_URL = https://backend-url.railway.app   ← No port needed!
```

---

## 🎯 WHY NO PORT IN FRONTEND VARIABLE?

When you set:
```
NEXT_PUBLIC_API_URL = https://quantum-task-api-xxxx.railway.app
```

Railway automatically knows:
- Default HTTPS port is 443
- Backend is listening on port 4000 internally
- Railway's load balancer routes port 443 → port 4000 internally

So you just use the domain name, Railway handles everything!

---

## 📋 QUICK REFERENCE

| Scenario | Address | Port Shown? |
|----------|---------|-------------|
| Local backend | http://localhost:4000 | ✅ Yes (`:4000`) |
| Local frontend | http://localhost:3000 | ✅ Yes (`:3000`) |
| Railway backend | https://quantum-task-api-xxxx.railway.app | ❌ No (HTTPS port 443 automatic) |
| Railway frontend | https://team-task-manager-xxxx.railway.app | ❌ No (HTTPS port 443 automatic) |

---

## 🚀 WHAT TO REMEMBER

1. **Backend on Railway**: Set `PORT=4000` in environment variables
2. **Frontend on Railway**: Just set `NEXT_PUBLIC_API_URL=https://backend-url.railway.app` (no port!)
3. **Railway handles ports** - You don't need to add `:4000` or `:3000` to URLs
4. **Local development**: Use `localhost:3000` and `localhost:4000`
5. **Production**: Use domain names only (Railway handles ports internally)

---

## 🧪 TESTING

**Test Backend Port:**
```
Visit: https://quantum-task-api-xxxx.railway.app/health
Should see: {"status": "OK", ...}
```

**Test Frontend can reach Backend:**
```
1. Visit: https://team-task-manager-xxxx.railway.app
2. Open DevTools (F12)
3. Network tab
4. Try login
5. See if request goes to correct backend URL
```

---

**Summary**: Backend uses PORT 4000, Frontend doesn't need a PORT variable - Railway handles everything! 🎉

# 🚀 VERCEL FRONTEND - ENVIRONMENT VARIABLES CHECKLIST

**Service**: Team Task Manager Web  
**Platform**: Vercel  
**URL**: https://team-management-web-folder-files-22a19oglb.vercel.app  
**Status**: Production

---

## ⚙️ Required Environment Variables

### 1. NEXT_PUBLIC_API_URL (CRITICAL)
```bash
Name: NEXT_PUBLIC_API_URL
Value: https://team-task-manager-full-stack-1.onrender.com
Type: String
Scope: Production, Preview, Development
Purpose: Tells frontend where backend API is located
```

**Why `NEXT_PUBLIC_`:**
- ✅ Accessible in browser (client-side)
- ✅ Baked into build at deploy time
- ✅ Used by all API calls
- ✅ Can't contain secrets

**Current Value:**
```
https://team-task-manager-full-stack-1.onrender.com
```

---

## 📋 Vercel Dashboard Setup

### Step 1: Go to Vercel Dashboard
```
https://vercel.com/dashboard
```

### Step 2: Select Frontend Project
```
Projects → Select "team-management-web-folder-files"
```

### Step 3: Go to Settings
```
Click "Settings" tab
```

### Step 4: Go to Environment Variables
```
Settings → Environment Variables
```

### Step 5: Add/Update Variable

```
Key: NEXT_PUBLIC_API_URL
Value: https://team-task-manager-full-stack-1.onrender.com
Environments: Check all:
  ✓ Production
  ✓ Preview
  ✓ Development
```

Click "Save"

### Step 6: Redeploy

After saving:
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Select "Redeploy"
4. Wait for new deployment

---

## ✅ Verification Checklist

### Option 1: Verify in Browser DevTools

1. Go to https://team-management-web-folder-files-22a19oglb.vercel.app
2. Open DevTools (F12)
3. Go to Console tab
4. Type:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
```
5. Should print:
```
https://team-task-manager-full-stack-1.onrender.com
```

### Option 2: Check Network Requests

1. Go to https://team-management-web-folder-files-22a19oglb.vercel.app/login
2. Open DevTools → Network tab
3. Try to login
4. Should see requests to:
```
https://team-task-manager-full-stack-1.onrender.com/api/auth/login
```
(Not `http://localhost:4000`)

### Option 3: Test Specific Endpoint

In browser console:
```javascript
fetch('https://team-task-manager-full-stack-1.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
```

Should return:
```json
{
  "status": "OK",
  "service": "quantum-task-api",
  "uptime": 12345.67
}
```

---

## 🧪 Test All Features

### 1. Test Signup
```
URL: https://team-management-web-folder-files-22a19oglb.vercel.app/signup
Action: Create new account
Expected: Calls https://team-task-manager-full-stack-1.onrender.com/api/auth/signup
Result: ✅ Account created (no Failed to fetch)
```

### 2. Test Login
```
URL: https://team-management-web-folder-files-22a19oglb.vercel.app/login
Action: Login with credentials
Expected: Calls https://team-task-manager-full-stack-1.onrender.com/api/auth/login
Result: ✅ Logged in (no CORS error)
```

### 3. Test Dashboard
```
URL: https://team-management-web-folder-files-22a19oglb.vercel.app/dashboard
Action: View dashboard
Expected: Fetches projects & tasks from backend
Result: ✅ Data displays (no 404 errors)
```

### 4. Test Projects
```
URL: https://team-management-web-folder-files-22a19oglb.vercel.app/projects
Action: Create/update project
Expected: Calls /api/projects endpoints
Result: ✅ CRUD operations work
```

### 5. Test Forgot Password
```
URL: https://team-management-web-folder-files-22a19oglb.vercel.app/forgot-password
Action: Try to reset password
Expected: Calls /api/auth/forgot-password
Result: ✅ Works (no hardcoded localhost)
```

---

## 📋 Local Development Setup

### When developing locally, use `.env.local`:

```bash
# File: web/.env.local

# Local backend
NEXT_PUBLIC_API_URL=http://localhost:4000

# Or production backend
# NEXT_PUBLIC_API_URL=https://team-task-manager-full-stack-1.onrender.com
```

**Note:**
- ✅ `.env.local` is in `.gitignore` (not committed)
- ✅ Only used locally
- ✅ Vercel uses dashboard environment variables
- ✅ Different per developer

---

## 🔄 Updating Environment Variables

If API URL changes:

1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Find `NEXT_PUBLIC_API_URL`
4. Update value
5. Save
6. Wait for auto-redeploy OR manually redeploy

---

## 📊 Current Configuration Status

| Variable | Environments | Value | Status |
|----------|-------------|-------|--------|
| `NEXT_PUBLIC_API_URL` | Prod, Preview, Dev | `https://team-task-manager-full-stack-1.onrender.com` | ✅ Set |

---

## 🚨 Troubleshooting

### Issue: "Failed to fetch" on login
```
Cause: NEXT_PUBLIC_API_URL not set or wrong
Fix:
1. Go to Vercel Settings → Environment Variables
2. Verify NEXT_PUBLIC_API_URL is set
3. Value should be: https://team-task-manager-full-stack-1.onrender.com
4. Redeploy
```

### Issue: Still using localhost
```
Cause: Old deployment still active
Fix:
1. Go to Deployments
2. Redeploy latest deployment
3. Wait for new build
4. Verify in browser console: console.log(process.env.NEXT_PUBLIC_API_URL)
```

### Issue: CORS error in browser
```
Cause: Backend CORS not configured for frontend domain
Fix: 
1. Check Render backend
2. Verify CLIENT_URL is set correctly
3. Restart Render service
```

### Issue: 404 on API calls
```
Cause: Backend not running or wrong endpoint
Fix:
1. Test backend: https://team-task-manager-full-stack-1.onrender.com/api/health
2. Check Render service status
3. Verify routes are correct
```

---

## 🔐 Security Notes

1. **NEXT_PUBLIC_ prefix**
   - ✅ This is visible to browser
   - ✅ Safe - it's a domain URL only
   - ❌ Never use for secrets or API keys

2. **Backend URL**
   - ✅ Points to Render (public)
   - ✅ HTTPS (encrypted)
   - ✅ Authentication handled via JWT tokens

3. **Token Storage**
   - ✅ Stored in localStorage
   - ✅ Sent in Authorization header
   - ✅ Not exposed in URL

---

## 📞 Quick Links

| Link | Purpose |
|------|---------|
| https://vercel.com/dashboard | Vercel dashboard |
| https://vercel.com/docs/concepts/projects/environment-variables | Vercel env var docs |
| https://nextjs.org/docs/basic-features/environment-variables | Next.js env docs |

---

## ✅ Deployment Readiness

Before going live:

- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Value is Render backend URL
- [ ] Scopes: Production, Preview, Development
- [ ] Latest deployment is active
- [ ] Browser console shows correct URL
- [ ] Network requests go to Render domain
- [ ] Login/signup work without errors
- [ ] Dashboard loads data correctly

---

**Last Updated**: 1 May 2026  
**Status**: ✅ PRODUCTION READY

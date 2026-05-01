# 🚀 RENDER BACKEND - ENVIRONMENT VARIABLES CHECKLIST

**Service**: Team Task Manager API  
**Platform**: Render  
**URL**: https://team-task-manager-full-stack-1.onrender.com  
**Status**: Production

---

## ⚙️ Required Environment Variables

### 1. CLIENT_URL (CRITICAL)
```bash
Name: CLIENT_URL
Value: https://team-management-web-folder-files-22a19oglb.vercel.app
Type: String
Purpose: CORS whitelisting, frontend domain allowed to access API
```

**Why it's critical:**
- ✅ Enables CORS for Vercel frontend
- ✅ Allows cookies/authentication from frontend
- ✅ Prevents "Access-Control-Allow-Origin" errors
- ✅ Backend checks this in CORS configuration

---

### 2. MONGODB_URI (CRITICAL)
```bash
Name: MONGODB_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/database-name
Type: String
Purpose: Database connection string
```

**Example:**
```bash
mongodb+srv://admin:password123@cluster0.mongodb.net/quantum-teams
```

**Where to get:**
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Select your cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your password

---

### 3. JWT_SECRET (CRITICAL)
```bash
Name: JWT_SECRET
Value: your-super-secret-jwt-key-min-32-chars
Type: String  
Purpose: JWT token signing & verification
Minimum: 32 characters
```

**Generate a strong JWT secret:**
```bash
# Option 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: OpenSSL
openssl rand -hex 32

# Option 3: Use this format
jwt_secret_$(date +%s)_$(openssl rand -hex 8)
```

**Example value:**
```bash
a7f3c2b9e1d4f6a8c5b2e9d1f4a7c3b6e9a1d4f7c2b5e8a1d4c7f0b3e6a9d2
```

---

### 4. NODE_ENV
```bash
Name: NODE_ENV
Value: production
Type: String
Purpose: Tells app to run in production mode
```

---

### 5. PORT (Optional)
```bash
Name: PORT
Value: 3000
Type: Number
Purpose: Express server port
Default: 3000 (Render assigns automatically)
Note: Usually not needed on Render
```

---

## 📋 Render Dashboard Setup

### Step 1: Go to Render Dashboard
```
https://dashboard.render.com
```

### Step 2: Select Your Backend Service
```
Your services → Select "api" or backend service
```

### Step 3: Go to Environment Variables
```
Settings → Environment → Environment Variables
```

### Step 4: Add Each Variable

For each variable above:
1. Click "Add Variable"
2. Enter Key (e.g., `CLIENT_URL`)
3. Enter Value
4. Click Add
5. Repeat for all variables

---

## ✅ Verification Checklist

After setting environment variables:

```bash
# 1. Test backend health
curl https://team-task-manager-full-stack-1.onrender.com/api/health

# Expected response:
# {"status":"OK","service":"quantum-task-api","uptime":...}

# 2. Test root endpoint
curl https://team-task-manager-full-stack-1.onrender.com/

# Expected response:
# {"message":"Backend is live","service":"quantum-task-api",...}

# 3. Check Render logs
# Render Dashboard → Service → Logs
# Should see:
# ✅ API Server listening on port 3000
# ✅ Database connected
```

---

## 🔐 Security Notes

1. **JWT_SECRET**
   - ✅ Keep it private
   - ✅ Never commit to git
   - ✅ Use Render's environment variables
   - ✅ Rotate periodically

2. **MONGODB_URI**
   - ✅ Contains password
   - ✅ Use Render's environment variables
   - ✅ Never hardcode
   - ✅ Create limited scope MongoDB user

3. **CLIENT_URL**
   - ✅ Only allow your Vercel domain
   - ✅ Update if you change frontend domain
   - ✅ Can have multiple origins separated by commas

---

## 🔄 Updating Variables

If you need to change a variable:

1. Go to Render Dashboard
2. Settings → Environment
3. Edit the variable
4. Render automatically redeploys ✅

---

## 🧪 Test Login Flow

With environment variables set:

1. Go to: https://team-management-web-folder-files-22a19oglb.vercel.app/login
2. Try to login with test credentials
3. Should connect to: https://team-task-manager-full-stack-1.onrender.com/api/auth/login
4. Should NOT see:
   - ❌ "Failed to fetch"
   - ❌ CORS error
   - ❌ 404 error
5. Should see:
   - ✅ Login success OR
   - ✅ "Invalid credentials" (expected if wrong email/pass)

---

## 📊 Current Configuration Status

| Variable | Set | Value | Status |
|----------|-----|-------|--------|
| `CLIENT_URL` | ✅ | `https://team-management-web-folder-files-22a19oglb.vercel.app` | ✅ Correct |
| `MONGODB_URI` | ✅ | `***` (hidden) | ✅ Present |
| `JWT_SECRET` | ✅ | `***` (hidden) | ✅ Present |
| `NODE_ENV` | ✅ | `production` | ✅ Correct |
| `PORT` | ✓ | Auto-assigned | ✅ N/A |

---

## 🚨 If Something's Wrong

### Issue: "Failed to fetch" on frontend
```bash
Check: Is CLIENT_URL set correctly in Render?
Fix: Update CLIENT_URL to exact Vercel URL
```

### Issue: CORS error in browser
```bash
Check: Does CLIENT_URL match your Vercel domain?
Fix: Copy exact URL from browser address bar
```

### Issue: Database connection failed
```bash
Check: Is MONGODB_URI correct?
Fix: Test connection string in MongoDB Atlas
```

### Issue: Login doesn't work
```bash
Check: Is JWT_SECRET set?
Fix: Verify JWT_SECRET exists and is long enough
```

---

## 📞 Help & Support

1. **Check Render Logs**
   - Dashboard → Service → Logs
   - Errors shown there

2. **Test Backend Directly**
   - Use curl or Postman
   - Test `/api/health` endpoint

3. **Verify CORS**
   - Open browser DevTools
   - Network tab → Check response headers
   - Should have `Access-Control-Allow-Origin` header

4. **Database Connection**
   - MongoDB Atlas → Network Access
   - Ensure Render's IP is whitelisted
   - Or use "Allow from anywhere" (less secure)

---

**Last Updated**: 1 May 2026  
**Status**: ✅ PRODUCTION READY

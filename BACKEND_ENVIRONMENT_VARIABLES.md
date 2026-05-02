# 🔧 Backend Environment Variables for Railway

**Purpose**: These are all the variables your backend needs to run on Railway

---

## 📋 COPY & PASTE THESE VARIABLES

### Go to Railway → Backend Service → Variables Tab

Then add these **6 variables**:

---

## **Variable 1: PORT**
```
Name:  PORT
Value: 4000
```
*The port where backend runs*

---

## **Variable 2: NODE_ENV**
```
Name:  NODE_ENV
Value: production
```
*Sets Node.js to production mode (optimized, no debug)*

---

## **Variable 3: MONGODB_URI**
```
Name:  MONGODB_URI
Value: mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0
```
*Your MongoDB Atlas connection string*
*This is already connected to your database*

---

## **Variable 4: JWT_SECRET**
```
Name:  JWT_SECRET
Value: Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
```
*Secret key for authentication tokens*
*KEEP THIS SAFE - Don't share!*

---

## **Variable 5: JWT_EXPIRES_IN**
```
Name:  JWT_EXPIRES_IN
Value: 14d
```
*How long login tokens stay valid (14 days)*

---

## **Variable 6: CLIENT_URL**
```
Name:  CLIENT_URL
Value: https://team-task-manager-full-stack-production-669d.up.railway.app
```
*Frontend URL (for CORS - allows frontend to call backend)*
*This is your frontend Railway URL*

---

## 🎯 STEP-BY-STEP INSTRUCTIONS

### **Step 1: Go to Railway Dashboard**
- Visit: https://railway.app/dashboard

### **Step 2: Select Backend Service**
- Click: **quantum-task-api** (or your backend service name)

### **Step 3: Go to Variables Tab**
- Click: **Variables** tab at the top

### **Step 4: Add Each Variable**
For each variable above:
1. Click: **+ New Variable** button
2. Enter: **Name** (left side)
3. Enter: **Value** (right side)
4. Click: **Add**
5. Repeat for all 6 variables

### **Step 5: Save & Redeploy**
- Variables auto-save ✅
- Backend automatically redeploys ✅
- Watch: Status changes to "Building" → "Deploying" → "Running"

---

## ✅ VERIFICATION CHECKLIST

After adding variables:

- [ ] All 6 variables added
- [ ] Values match exactly (copy-paste carefully)
- [ ] No extra spaces or quotes
- [ ] Backend service status changed to "Running"
- [ ] Check logs for "Server running on port 4000"

---

## 🔍 WHERE TO COPY FROM

| Variable | From Your File |
|----------|----------------|
| PORT | `4000` |
| NODE_ENV | `production` |
| MONGODB_URI | `mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0` |
| JWT_SECRET | `Hariom_Team_Task_Manager_2026_Ultra_Secure_Key` |
| JWT_EXPIRES_IN | `14d` |
| CLIENT_URL | `https://team-task-manager-full-stack-production-669d.up.railway.app` |

---

## 📌 IMPORTANT NOTES

1. **MONGODB_URI** - Already configured, connects to your cloud database ✅
2. **JWT_SECRET** - Keep this secret! Don't share or commit to public repos
3. **CLIENT_URL** - Update this if your frontend URL changes
4. **No quotes needed** - Just paste the value as-is (no `"` marks)
5. **Case sensitive** - Names must be EXACTLY as shown (PORT not port)

---

## 🚨 COMMON MISTAKES

❌ **Don't do this:**
```
PORT = 4000  (extra spaces)
port = 4000  (wrong case)
"4000"       (with quotes)
PORT = 4000, (with comma)
```

✅ **Do this:**
```
PORT: 4000  (name: value, no spaces)
PORT = 4000 (exact match)
```

---

## 🧪 TEST AFTER ADDING VARIABLES

1. Backend should auto-redeploy
2. Visit backend URL: `https://quantum-task-api-xxxx.railway.app/health`
3. Should see:
   ```json
   {
     "status": "OK",
     "service": "quantum-task-api",
     "uptime": 123
   }
   ```
4. ✅ If you see this, backend is running!

---

## 🎯 WHAT HAPPENS AFTER

Once backend is running:
1. ✅ Frontend can connect to backend
2. ✅ Login will work
3. ✅ No more CORS errors
4. ✅ Dashboard will show data from database

---

## 📝 SUMMARY

**6 Variables to Add:**
1. PORT = 4000
2. NODE_ENV = production
3. MONGODB_URI = (your connection string)
4. JWT_SECRET = (your secret key)
5. JWT_EXPIRES_IN = 14d
6. CLIENT_URL = (your frontend Railway URL)

**Time needed:** 5 minutes ⏱️

**Result:** Backend runs on Railway ✅

---

**Next Step**: Add these variables to Railway and wait for backend to deploy! 🚀

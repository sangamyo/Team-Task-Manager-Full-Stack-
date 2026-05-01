# 🔗 Fix Login/Signup "Failed to fetch" Error

## Problem
Your frontend on Vercel can't reach the backend API because:
- Local `.env.local` has `http://localhost:4000/api`
- Vercel can't access localhost (it's in the cloud)
- Need to set production API URL in Vercel dashboard

## ✅ Solution: 3 Steps

### Step 1: Deploy Your Backend API
First, deploy your Node.js backend to Vercel:

```bash
cd api
# Configure your environment variables
# Deploy to Vercel
vercel deploy --prod
```

After deployment, you'll get a URL like:
`https://your-api-backend.vercel.app`

### Step 2: Set Environment Variable in Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your **web** project (`team-management-web-folider-files`)
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-api-backend.vercel.app/api`
   - **Environments**: Select "Production" and "Preview"
5. Click **Save**

### Step 3: Redeploy Frontend

After setting the environment variable:

1. Go to **Deployments** tab
2. Click **Redeploy** on your latest deployment
3. Wait for deployment to complete
4. Your login/signup should now work! ✅

## 🧪 Testing

### Local Development (Works Already)
```bash
cd web
npm run dev
# http://localhost:3000 connects to http://localhost:4000/api
```

### Production (After API Deployment)
```bash
1. Deploy backend to Vercel
2. Set NEXT_PUBLIC_API_URL in Vercel dashboard
3. Redeploy frontend
4. Login/Signup should work!
```

## 📋 Step-by-Step: Deploy Backend to Vercel

### Option A: Using Vercel CLI

```bash
cd /Users/hariomkasaundhan/Documents/New\ project\ 2/api

# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel deploy --prod
```

### Option B: Using GitHub

1. Push your full project to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Set **Root Directory** to `api`
5. Add environment variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = your JWT secret
   - `NODE_ENV` = production
6. Click Deploy

## 🔑 Environment Variables Needed

### Backend (.env in api folder)
```bash
PORT=4000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
CLIENT_URL=https://your-frontend-vercel-url.vercel.app
```

### Frontend (.env in web folder - Vercel Dashboard)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-vercel-url.vercel.app/api
```

## 💡 Important Notes

- `NEXT_PUBLIC_*` variables are exposed to the browser (safe for API URL)
- Never expose secrets like JWT_SECRET or MONGODB_URI to frontend
- Backend URL must be accessible from the internet (public)
- CORS must allow your frontend domain

## ✔️ Verify API Connection

After deployment, test the API:

```bash
# Test backend health endpoint
curl https://your-backend-url.vercel.app/health

# Should return:
# {"status":"ok","service":"quantum-task-api"}
```

## 🚀 Once Backend is Deployed

Share your backend URL, and I'll help you:
1. Update Vercel environment variables
2. Redeploy frontend
3. Test login/signup
4. Fix any remaining issues

Your login/signup "Failed to fetch" error will be fixed! ✅

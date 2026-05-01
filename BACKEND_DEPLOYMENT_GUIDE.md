# 🚀 Backend Deployment Guide - Render/Vercel Ready

## Summary
Your backend API has been optimized for production deployment on Render or Vercel!

## ✅ Changes Made

### 1. **Added Root Route** (`/`)
```javascript
app.get("/", (req, res) => {
  res.json({
    message: "Backend is live",
    service: "quantum-task-api",
    timestamp: new Date().toISOString(),
  });
});
```

### 2. **Added Health Check Routes**
- `GET /health` - Quick health check
- `GET /api/health` - API health check

Both return:
```json
{
  "status": "OK",
  "service": "quantum-task-api",
  "uptime": 1234.56
}
```

### 3. **Enhanced CORS Configuration**
```javascript
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://team-management-web-folder-files-22a19oglb.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

### 4. **Updated Default Port**
- Changed from `4000` to `5000`
- Still respects `process.env.PORT` in production

### 5. **All Routes Preserved**
✅ `/api/auth` - Authentication routes
✅ `/api/projects` - Project management
✅ `/api/tasks` - Task management
✅ `/api/teams` - Team management
✅ `/api/analytics` - Analytics
✅ `/api/dashboard` - Dashboard data

## 📋 Full Corrected Backend Files

### `/api/src/app.js` (COMPLETE)
```javascript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import teamRoutes from "./routes/team.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";

export const app = express();

// Security and middleware
app.use(helmet());

// CORS Configuration - Support multiple frontends
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://team-management-web-folder-files-22a19oglb.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 500 }));

// Root route - Backend is live
app.get("/", (req, res) => {
  res.json({
    message: "Backend is live",
    service: "quantum-task-api",
    timestamp: new Date().toISOString(),
  });
});

// Health check routes
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "quantum-task-api",
    uptime: process.uptime(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "quantum-task-api",
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", analyticsRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);
```

### `/api/src/server.js` (COMPLETE)
```javascript
import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ API Server listening on port ${port}`);
      console.log(`📍 URL: ${process.env.NODE_ENV === "production" ? "https://your-api-url.vercel.app" : `http://localhost:${port}`}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });
```

## 🚀 Deployment Steps

### Option 1: Deploy to Render
1. Go to https://render.com/dashboard
2. Create new Web Service
3. Connect your GitHub repo
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB connection
   - `JWT_SECRET` = your secret key
   - `NODE_ENV` = production
   - `CLIENT_URL` = your Vercel frontend URL
7. Deploy!

### Option 2: Deploy to Vercel
1. Go to https://vercel.com/new
2. Import GitHub repo
3. Set Root Directory to: `api`
4. Add same environment variables
5. Deploy!

### Option 3: Deploy to Railway
1. Go to https://railway.app/new
2. Deploy from GitHub
3. Select this repo
4. Set Root Directory to: `api`
5. Add environment variables
6. Deploy!

## 📊 Testing Endpoints

```bash
# Test root endpoint
curl https://your-api-url.vercel.app/
# Returns: {"message":"Backend is live",...}

# Test health check
curl https://your-api-url.vercel.app/health
# Returns: {"status":"OK","service":"quantum-task-api",...}

# Test API health check
curl https://your-api-url.vercel.app/api/health
# Returns: {"status":"OK","service":"quantum-task-api",...}

# Test auth routes (example)
curl https://your-api-url.vercel.app/api/auth/login
# Returns: appropriate response
```

## 🔐 Environment Variables Required

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Security
JWT_SECRET=your-jwt-secret-key-here
NODE_ENV=production

# Frontend URL (for CORS)
CLIENT_URL=https://team-management-web-folder-files-22a19oglb.vercel.app

# Server
PORT=5000
```

## ✅ Deployment Checklist

- ✅ Root route (`/`) added
- ✅ Health check routes added (`/health`, `/api/health`)
- ✅ CORS configured for Vercel frontend
- ✅ Port set to 5000 (configurable via ENV)
- ✅ All auth/project/task routes preserved
- ✅ Database connection maintained
- ✅ Error handling in place
- ✅ Rate limiting enabled
- ✅ Helmet security headers enabled
- ✅ Morgan logging enabled

## 🔄 Next Steps

1. Choose deployment platform (Render/Vercel/Railway)
2. Set environment variables
3. Deploy backend
4. Copy backend URL
5. Update frontend `NEXT_PUBLIC_API_URL` with your backend URL
6. Redeploy frontend
7. Test login/signup - should work! ✅

## 📞 Support

Your backend is now production-ready! Share your deployed URL when ready, and I'll help you connect everything.

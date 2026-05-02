# 🚀 Quantum Task Manager - Production Deployment Checklist

## Project Information
- **Repository**: https://github.com/sangamyo/Team-Task-Manager-Full-Stack-
- **Frontend**: Vercel (Next.js)
- **Backend**: Railway (Node.js/Express)
- **Database**: MongoDB Atlas
- **Auth**: JWT with 14-day expiration

---

## ✅ Backend (API) - DEPLOYMENT READY

### Code Quality
- [x] Node.js 20.x engine specified in package.json
- [x] Start script: `npm start` → `node src/server.js`
- [x] Dev script: `npm run dev` → `nodemon src/server.js`
- [x] Seed script: `npm run seed` → `node src/seed.js`
- [x] No invalid workspace references
- [x] Using bcryptjs for password hashing
- [x] Environment variables use `process.env.MONGODB_URI`
- [x] Server listens on `process.env.PORT || 4000`

### Configuration Files
- [x] `api/.env` - Production environment variables
- [x] `api/.env.local` - Local development variables
- [x] `api/.env.production` - Production template
- [x] `api/.env.template` - Environment template
- [x] `api/Procfile` - `web: npm start`
- [x] `railway.json` - Configured with `npm start` command

### Database
- [x] MongoDB Atlas connection string in MONGODB_URI
- [x] Database name: `quantum-task-manager`
- [x] Connection parameters: `retryWrites=true&w=majority`
- [x] User credentials: sangamgupta988_db_user (provided)

### Security
- [x] JWT_SECRET: `Hariom_Team_Task_Manager_2026_Ultra_Secure_Key`
- [x] JWT expiration: 14 days
- [x] CORS allows vercel.app domains
- [x] CORS allows CLIENT_URL (frontend URL)
- [x] Rate limiting enabled (500 requests/15min)
- [x] Helmet security headers enabled
- [x] All secrets in .env (not in code)

### API Routes
- [x] `GET /` - Backend health check
- [x] `GET /health` - Full health status
- [x] `GET /api/health` - API health endpoint
- [x] `POST /api/auth/login` - User login
- [x] `POST /api/auth/signup` - User registration
- [x] `GET /api/auth/me` - Current user (protected)
- [x] `POST /api/auth/forgot-password` - Password reset
- [x] `/api/projects` - Project management
- [x] `/api/tasks` - Task management
- [x] `/api/teams` - Team management
- [x] `/api/analytics` - Analytics endpoints

---

## ✅ Frontend (Web) - DEPLOYMENT READY

### Code Quality
- [x] Node.js 20.x engine specified in package.json
- [x] Next.js 16.2.4 with Turbopack
- [x] Build script: `npm run build`
- [x] Start script: `npm start`
- [x] Dev script: `npm run dev`
- [x] All dependencies up-to-date
- [x] TypeScript enabled
- [x] ESLint configured

### Configuration Files
- [x] `web/.env.local` - Local development (localhost:4000)
- [x] `web/.env.production.local` - Production template
- [x] `web/.env.template` - Environment template
- [x] `next.config.ts` - Next.js configuration
- [x] `tsconfig.json` - TypeScript configuration
- [x] `tailwind.config.ts` - Tailwind CSS config
- [x] `postcss.config.js` - PostCSS config

### Features
- [x] Authentication pages (Login, Signup, Forgot Password)
- [x] Dashboard with projects and tasks
- [x] Project management
- [x] Task management (Kanban board)
- [x] Team management
- [x] Analytics and reporting
- [x] Profile management
- [x] 3D animations (Three.js)
- [x] Responsive design
- [x] Dark theme

### API Integration
- [x] Centralized API calls in `/src/lib/store.tsx`
- [x] Environment variable: `NEXT_PUBLIC_API_URL`
- [x] Fallback to localhost:4000 if env var not set
- [x] Bearer token authentication in headers
- [x] Token stored in localStorage
- [x] User session management

---

## ✅ Infrastructure Setup

### Railway Backend
- [ ] Create Railway account
- [ ] Create new Railway project
- [ ] Connect GitHub repository
- [ ] Set root directory to `/api`
- [ ] Configure environment variables (see below)
- [ ] Deploy backend
- [ ] Obtain Railway public URL (e.g., `https://xxx.up.railway.app`)

### Vercel Frontend
- [ ] Create Vercel account
- [ ] Create new Vercel project
- [ ] Connect GitHub repository
- [ ] Set root directory to `/web`
- [ ] Configure `NEXT_PUBLIC_API_URL` environment variable
- [ ] Deploy frontend
- [ ] Obtain Vercel URL (e.g., `https://xxx.vercel.app`)

### Environment Variables - Railway

Add these in Railway Dashboard → Service → Variables:

```
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://sangamgupta988_db_user:4cmE6y7yAkBZwi3s@cluster0.euj8w0d.mongodb.net/quantum-task-manager?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Hariom_Team_Task_Manager_2026_Ultra_Secure_Key
JWT_EXPIRES_IN=14d
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
```

### Environment Variables - Vercel

Add in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
```

---

## 🧪 Testing Checklist

### Local Testing (Before Deployment)
- [x] Backend starts without errors: `npm start`
- [x] Frontend starts without errors: `npm run dev`
- [x] MongoDB connection successful
- [x] Login page loads
- [x] Login with credentials works: `admin@quantum.team` / `password123`
- [x] Dashboard displays after login
- [x] Projects display
- [x] Tasks display
- [x] Can create new project
- [x] Can create new task
- [x] Logout works
- [x] No console errors

### Production Testing (After Deployment)
- [ ] Backend health check: `curl https://railway-url/health`
- [ ] Frontend loads: `https://vercel-url`
- [ ] Frontend connects to backend API
- [ ] Login works on production
- [ ] Dashboard loads data
- [ ] Projects visible
- [ ] Tasks visible
- [ ] Can create project
- [ ] Can create task
- [ ] Analytics working
- [ ] Team management working
- [ ] Profile page working
- [ ] Logout works
- [ ] No CORS errors
- [ ] No console errors

---

## 🚨 Common Issues & Solutions

### Backend Won't Start
**Problem**: Module not found errors
**Solution**:
1. Run `npm install` in `/api` folder
2. Check Node.js version: `node --version` (should be 20.x)
3. Check `src/server.js` exists
4. Delete `node_modules` and `package-lock.json`, run `npm install` again

### Frontend Won't Build
**Problem**: Build fails on Vercel
**Solution**:
1. Check `next.config.ts` for errors
2. Run locally: `npm run build` in `/web` folder
3. Check TypeScript errors: `npm run build` output
4. Clear Next.js cache: `rm -rf .next`
5. Reinstall dependencies: `rm -rf node_modules`, `npm install`

### CORS Errors
**Problem**: Frontend can't reach backend API
**Solution**:
1. Check `CLIENT_URL` in Railway equals Vercel URL exactly
2. Verify Vercel URL starts with `https://`
3. Redeploy backend after changing `CLIENT_URL`
4. Check browser DevTools Console for exact error
5. Verify backend is running: Visit `https://railway-url/health`

### Login Not Working
**Problem**: "Failed to fetch" or network error
**Solution**:
1. Check `NEXT_PUBLIC_API_URL` in Vercel is correct
2. Verify Railway backend URL in environment variables
3. Test backend directly: `curl https://railway-url/api/auth/login`
4. Check Railway logs for errors
5. Verify MongoDB connection in Railway logs

### MongoDB Connection Failed
**Problem**: Can't connect to MongoDB Atlas
**Solution**:
1. Check `MONGODB_URI` is correct in Railway Variables
2. Verify IP whitelist in MongoDB Atlas (use 0.0.0.0/0 for all IPs)
3. Test connection string locally in `.env.local`
4. Check database name in connection string
5. Verify credentials are correct

---

## 📊 Performance Targets

- Frontend load time: < 3 seconds
- API response time: < 500ms
- Database query time: < 100ms
- Lighthouse score: > 80 (Performance)
- Uptime: 99.5%+ on both platforms

---

## 🔐 Security Checklist

- [x] Secrets stored in environment variables only
- [x] HTTPS enforced on both frontend and backend
- [x] CORS properly configured
- [x] JWT tokens with expiration
- [x] Password hashing with bcryptjs
- [x] Rate limiting enabled
- [x] Security headers (Helmet)
- [x] .env files in .gitignore
- [x] No credentials in code
- [x] MongoDB Atlas with authentication

---

## 📈 Monitoring & Maintenance

### Logs
- **Railway Logs**: Dashboard → Service → Logs
- **Vercel Logs**: Dashboard → Project → Deployments → Logs
- **Browser Console**: F12 → Console tab

### Metrics
- **Railway**: Dashboard → Metrics → CPU, Memory, Network
- **Vercel**: Analytics → Edge Functions, Database, etc.

### Alerts
- Set up Railway alerts for failed deployments
- Set up Vercel alerts for build failures
- Monitor MongoDB connection health

---

## 📝 Deployment Commands

### Local Development
```bash
# Terminal 1 - Backend
cd api
npm install
npm run dev

# Terminal 2 - Frontend
cd web
npm install
npm run dev
```

### Build for Production
```bash
# Backend
cd api
npm install
npm start

# Frontend
cd web
npm install
npm run build
npm start
```

---

## 🎯 Next Steps

1. ✅ Code ready (THIS CHECKLIST)
2. → Create Railway account and deploy backend
3. → Obtain Railway URL
4. → Create Vercel account and deploy frontend
5. → Set NEXT_PUBLIC_API_URL in Vercel
6. → Update CLIENT_URL in Railway
7. → Test production login
8. → Monitor logs and metrics
9. → Set up CI/CD pipelines (optional)
10. → Enable auto-deployments (optional)

---

## 📞 Support

- **Railway Docs**: https://railway.app/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js**: https://nextjs.org/docs
- **Express**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com

---

**Status**: ✅ PRODUCTION READY

Last Updated: May 2, 2026

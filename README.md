# Quantum Teams - Full-Stack 3D Team Task Manager

Quantum Teams is a recruiter-ready full-stack team task manager: a futuristic Next.js interface with real JWT authentication, protected routes, Admin/Member role-based access, project/team/task CRUD, dashboard analytics, and an Express/MongoDB REST API.

## 🚀 PRODUCTION DEPLOYMENT READY

**Status**: ✅ **READY FOR IMMEDIATE DEPLOYMENT**

- **Backend**: Render (Express.js on Node 20.x)
- **Frontend**: Vercel (Next.js on Node 20.x)
- **Database**: MongoDB Atlas
- **Deployment Time**: 5 minutes

**Quick Deploy**: See [`QUICK_DEPLOY.md`](./QUICK_DEPLOY.md) for 3-step deployment

📚 **Documentation**:
- [`QUICK_DEPLOY.md`](./QUICK_DEPLOY.md) - Start here! (5 min)
- [`PRODUCTION_DEPLOYMENT.md`](./PRODUCTION_DEPLOYMENT.md) - Complete guide (20 min)
- [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) - Full checklist
- [`DEPLOYMENT_COMPLETE.md`](./DEPLOYMENT_COMPLETE.md) - Status report
- [`DEPLOYMENT_STATUS.txt`](./DEPLOYMENT_STATUS.txt) - Visual overview

## Stack

- Next.js 16.2.4, React 19, TypeScript, Tailwind CSS 3.4.14
- Three.js, React Three Fiber, Drei, Framer Motion, GSAP-ready dependency
- Node.js 20.x, Express 5.2.1, MongoDB Atlas, Mongoose 9.6.1
- JWT authentication (14-day expiration), bcryptjs password hashing
- Role middleware, Zod validation, Helmet, CORS, rate limiting
- Vercel frontend + Render backend production-ready monorepo

## 📁 Folder Structure

This project follows a professional Monorepo structure, cleanly separating the client and server applications.

```text
Quantum Teams/
├── api/                      # 🛠️ Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/      # API business logic
│   │   ├── middleware/       # JWT Auth & error handling
│   │   ├── models/           # MongoDB Mongoose schemas
│   │   ├── routes/           # Express API endpoints
│   │   └── server.js         # Entry point
│   ├── .env.example          # Backend environment variables
│   └── package.json
│
├── web/                      # 🖥️ Frontend (Next.js + React)
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # Reusable 3D & UI components
│   │   └── lib/              # Types, Zustand store, Utils
│   ├── .env.example          # Frontend environment variables
│   ├── next.config.ts        # Next.js configuration
│   └── package.json
│
└── README.md                 # Project documentation
```

## ✨ Features

- Landing page with immersive 3D product demo
- 3D login, signup, and forgot password UI
- Protected-app style dashboard shell with animated sidebar
- Dashboard summaries, productivity charts, team orbs, and activity timeline
- Admin project create/edit/delete with unique project pages
- Project-specific members and team relationship validation
- Drag-and-drop kanban board with priorities, due dates, comments, and status tracking
- Team management with add/edit/remove members and roles
- Member accounts can view assigned projects and update their own tasks
- Analytics page with 3D scene and completion charts
- About, contact, demo showcase, GitHub/live URL submission page, custom 404
- REST APIs for auth, projects, tasks, task comments, task status, and analytics
- Demo seed data with Admin and Member users

## Local Setup

```bash
npm install
cp web/.env.example web/.env.local
cp api/.env.example api/.env
```

Start MongoDB locally or point `api/.env` to MongoDB Atlas.

```bash
npm run dev:api
npm run dev:web
```

Web: `http://localhost:3000`  
API: `http://localhost:4000/health`

## Seed Demo Data

```bash
npm run seed --workspace api
```

Demo login:

- Admin: `admin@quantum.team`
- Password: `password123`
- Member: `aarav@quantum.team`
- Password: `password123`

## API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/auth/me`
- `GET /api/projects`
- `POST /api/projects` Admin only
- `PATCH /api/projects/:id` Admin only
- `DELETE /api/projects/:id` Admin only
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/status`
- `POST /api/tasks/:id/comments`
- `GET /api/teams`
- `POST /api/teams` Admin only
- `PATCH /api/teams/:id` Admin only
- `DELETE /api/teams/:id` Admin only
- `GET /api/analytics/summary`
- `GET /api/dashboard/summary`

Send JWTs as:

```http
Authorization: Bearer <token>
```

## Deployment

Frontend on Vercel:

1. Import the repository into Vercel.
2. Set the root directory to `web`.
3. Set:
   - `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
4. Deploy the project.

Backend on Render:

1. Create a Render web service from this repo.
2. Set:
   - Root directory: `api`
   - Build command: `npm install --omit=dev && npm run build`
   - Start command: `npm start`
   - Health check path: `/health`
3. Add env vars from `api/.env.example`
4. Set `CLIENT_URL` to your Vercel frontend URL, for example `https://your-frontend.vercel.app`

Render blueprint:

- A ready-to-use backend blueprint is included in [render.yaml](/Users/hariomkasaundhan/Documents/New%20project%202/render.yaml).

Backend deploy note:
If Render fails during startup, the most common cause is an invalid `MONGODB_URI`. A bad username, password, missing URL encoding, or Atlas network rule will fail the API before the health check passes.

## Production Notes

- Replace `JWT_SECRET` with a long random secret.
- Configure real email delivery for forgot password.
- Frontend forms are connected to the REST API; keep `NEXT_PUBLIC_API_URL` pointed at the live API service.
- Add persistent file/avatar storage if you extend team profiles.
- Use MongoDB Atlas indexes and backups before real user traffic.
# Team-Task-Manager-Full-Stack-

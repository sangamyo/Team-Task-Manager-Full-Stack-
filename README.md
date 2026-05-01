# Quantum Teams - Full-Stack 3D Team Task Manager

Quantum Teams is a recruiter-ready full-stack team task manager: a futuristic Next.js interface with real JWT authentication, protected routes, Admin/Member role-based access, project/team/task CRUD, dashboard analytics, and an Express/MongoDB REST API.

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Three.js, React Three Fiber, Drei, Framer Motion, GSAP-ready dependency
- Node.js, Express, MongoDB, Mongoose
- JWT authentication, role middleware, Zod validation, Helmet, CORS, rate limiting
- Railway-ready monorepo structure

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

## Railway Deployment

Create two Railway services from this repo:

1. Web service
   - Root directory: `web`
   - Build command: `npm run build`
   - Start command: `npm run start`
   - Env: `NEXT_PUBLIC_API_URL=https://your-api.up.railway.app/api`

2. API service
   - Root directory: `api`
   - Start command: `npm run start`
   - Env: values from `api/.env.example`
   - Add MongoDB Atlas or Railway MongoDB-compatible connection string as `MONGODB_URI`

## Production Notes

- Replace `JWT_SECRET` with a long random secret.
- Configure real email delivery for forgot password.
- Frontend forms are connected to the REST API; keep `NEXT_PUBLIC_API_URL` pointed at the live API service.
- Add persistent file/avatar storage if you extend team profiles.
- Use MongoDB Atlas indexes and backups before real user traffic.
# Team-Task-Manager-Full-Stack-

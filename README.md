# Job Tracker — Frontend

Production-grade React frontend for tracking job applications, interviews, offers, and AI-assisted features (resume match, interview prep).

## Stack

- **React 18 + Vite** — fast dev server, route-based code splitting
- **React Router v6** — protected routes, lazy loading, layout system
- **Redux Toolkit** — auth, UI, client-side filters (server data lives in TanStack Query)
- **TanStack Query** — fetching, caching, optimistic updates
- **Axios** — central API client with JWT interceptors
- **React Bootstrap + SCSS** — components, dark mode via `data-bs-theme`
- **@dnd-kit** — Kanban drag-and-drop
- **Recharts** — analytics charts
- **react-hook-form + zod** — forms with validation

## Setup

```bash
cd Frontend
npm install
cp .env.example .env.development
npm run dev
```

App runs at `http://localhost:5173`.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Folder Structure

```
src/
  app/              # store, queryClient, providers (composition root)
  config/           # env access, app-wide constants
  lib/              # framework-agnostic utilities (axios, storage, formatters)
  routes/           # route tree + route guards
  layouts/          # DashboardLayout, AuthLayout
  shared/           # reusable components, hooks, styles
  features/
    auth/           # login, signup, JWT, current user
    jobs/           # kanban board with drag-drop + optimistic updates
    analytics/      # SaaS-style stat cards + charts
    interviewPrep/  # AI-generated questions + answer drafts
    resumeMatch/    # AI resume vs JD scoring
    ui/             # theme, sidebar, global UI state
```

Each feature owns its `api/`, `slice/` (only if it has client state), `hooks/`, `components/`, `pages/`, and `index.js` public surface.

## Routing

- `/login`, `/signup` — public, redirects to `/dashboard` if authed
- `/dashboard`, `/jobs`, `/analytics`, `/interview`, `/resume` — protected
- `*` — 404

JWT validity is checked on every protected navigation (`jwt-decode` exp claim).

## State

| Concern | Where |
|---|---|
| Auth (user, token) | Redux + localStorage |
| UI (theme, sidebar) | Redux |
| Filters, selections | Redux |
| Server data (jobs, analytics) | TanStack Query |
| Forms | react-hook-form (local) |

## Production Deploy (Vercel)

1. Connect this folder as the project root.
2. Set env vars in the Vercel dashboard:
   - `VITE_API_BASE_URL`
3. Build command: `npm run build` — output: `dist`
4. `vercel.json` already includes the SPA rewrite rule.

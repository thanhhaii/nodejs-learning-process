# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start backend in watch mode (tsx)
npm run publish      # compile TypeScript → dist/
npm run start        # compile + run production server
npm run lint         # Biome checks
npm run format       # Biome auto-format
npm run clean        # remove dist/

# Database migrations (requires .env.local with DATABASE_URL)
npm run migrate:create   # scaffold new migration
npm run migrate:up       # apply pending migrations
npm run migrate:down     # roll back latest migration
```

No test runner is configured yet. Verify changes with `npm run publish` and `npm run lint`.

## Architecture

Express + TypeScript backend with a strict layered flow:

```
route → controller → service → repository
```

- `src/server.ts` — process entry, starts HTTP server
- `src/app.ts` — Express app setup, middleware + route registration
- `src/config/postgres-db.ts` — shared `pg` pool used by repositories
- `src/middlewares/auth.middleware.ts` — JWT verification, attaches user to `req`
- `src/types/express/index.d.ts` — Express `Request` augmentation (e.g. `req.user`)

**Controllers** handle only HTTP concerns (parse req, call service, send res).  
**Services** own business logic and side effects (auth, file I/O, Claude API calls).  
**Repositories** own all SQL — raw `pg` queries, no ORM.

## Database

PostgreSQL via `node-pg-migrate`. Migrations live in `migrations/`. Schema changes require a new migration file; they are **not** auto-applied on startup.

## Frontend

Vite + React lives in `frontend/`. It has its own `package.json` and is developed/built independently from the backend.

## Project Roadmap

See `PROJECT_PHASES.MD` for planned phases: Auth → Newsfeed/Posts → Interactions → Social Graph.

# Build, lint, and test commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Lint entire repo: `npm run lint`
- Lint a single file: `npx eslint src/features/auth/components/LoginScreen.tsx`
- Build for production: `npm run build`
- **Tests:** no test runner or `test` script is currently configured, and no `*.test.*` / `*.spec.*` files exist, so there is no single-test command yet.

# High-level architecture

- This is a React + Vite SPA. Runtime flow is `src/main.tsx` → `App` → `AuthProvider` → `AppShell`.
- `AppShell` gates UI by auth state: loading shell until hydration is ready, `LoginScreen` when unauthenticated, `ChatPage` when authenticated.
- Auth is centralized in `AuthProvider`: it reads/writes local session state through `authStorage` (`chat-app.auth` key), and performs login via `features/auth/api/loginRequest.ts`.
- API/WS endpoints are centralized in `src/shared/config/env.ts` via `VITE_API_BASE_URL` and `VITE_WS_BASE_URL` (with local defaults). Avoid direct `import.meta.env` reads outside this module.
- Chat UI is currently local-state + mock-data driven: `ChatPage` owns message/profile/dialog state and composes presentational chat components via `ChatLayout`.
- Styling uses Tailwind CSS v4 plus custom theme tokens in `src/shared/styles/index.css` (`--color-accent`, `--color-page`, etc.).
- Vite is configured with React, Tailwind, and React Compiler support (`vite.config.ts` uses `@vitejs/plugin-react` + Babel React Compiler preset).

# Key conventions in this codebase

- Use feature-based organization under `src/features/<feature>/` with clear subfolders (`api`, `components`, `context`, `hooks`, `lib`, `types`, `pages`).
- Use the `@/` path alias for imports from `src` (configured in both `tsconfig.app.json` and `vite.config.ts`).
- Keep stateful orchestration in page/container components (`ChatPage`, `AuthProvider`) and keep leaf UI components prop-driven.
- Keep feature contracts in colocated `types/*.types.ts` files and import those types across API/hooks/components.
- Keep auth session persistence logic in `features/auth/lib/authStorage.ts`; do not duplicate localStorage key usage elsewhere.
- Prefer named exports across app modules (components, hooks, helpers, config objects).
- Match existing source style in `src/`: TypeScript, double-quoted strings, and tab indentation.

# Notes from existing docs

- `README.md` is still the default Vite template; rely on `package.json` scripts and current source structure over template guidance.
- React Compiler is intentionally enabled (called out in README and configured in Vite), so preserve compiler-friendly React patterns.

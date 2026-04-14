# Repository Guidelines

## Project Structure & Module Organization

Application code lives in `src/`. Follow the existing flow: `routes -> controllers -> services -> repositories`.

For layer-specific examples and conventions, see `src/README.md`, `src/repositories/README.md`, `src/types/README.md`, and `src/validators/README.md`.

- `src/app.ts`: Express app setup and middleware registration
- `src/server.ts`: process entrypoint
- `src/routes/`: API route definitions
- `src/controllers/`: HTTP handlers only
- `src/services/`: business logic such as auth or file processing
- `src/config/`: shared runtime config, including Postgres access
- `src/types/`: shared TypeScript types
- `src/data/`: mock or in-memory data
- `public/`: uploaded or static files
- `dist/`: compiled output from TypeScript

## Build, Test, and Development Commands

- `npm install`: install dependencies
- `npm run dev`: start the API in watch mode with `tsx`
- `npm run publish`: compile TypeScript into `dist/`
- `npm run start`: build, then run the compiled server
- `npm run lint`: run Biome checks
- `npm run format`: format the repository with Biome
- `npm run clean`: remove compiled output in `dist/`
- `npm run migrate:create`: create a database migration
- `npm run migrate:up`: apply pending migrations
- `npm run migrate:down`: roll back the latest migration

`npm test` is currently a placeholder and does not run real tests yet.

## Coding Style & Naming Conventions

Use TypeScript with tabs for indentation and double quotes, matching the current codebase. Keep controllers focused on request/response handling and move reusable logic into services. Use file names like `user.controller.ts`, `auth.service.ts`, and `not-found.middleware.ts`. Export named functions where possible. Run `npm run lint` and `npm run format` before opening a PR.

## Testing Guidelines

There is no test framework configured yet. When adding tests, place them close to the feature or under a dedicated `src/tests/` folder and use names like `auth.service.test.ts`. Prefer testing service behavior and controller responses separately. At minimum, verify builds with `npm run publish` and style with `npm run lint`.

## Commit & Pull Request Guidelines

Recent commits use short, prefixed messages such as `docs: add README...` and `license: add MIT license`. Follow that style with concise subjects, for example `auth: add login service` or `routes: wire register endpoint`.

PRs should include a brief summary, affected endpoints or files, setup notes for reviewers, and example request/response payloads when API behavior changes.

## Security & Configuration Tips

Keep secrets in `.env.local` and never commit credentials. This project uses `DATABASE_URL` for Postgres. Validate incoming request bodies and never return password hashes in API responses.

## Common Setup Pitfalls

- Run `npm run migrate:up` after schema changes; migrations are not auto-applied on app startup.
- Ensure `.env.local` is present before running migrations or starting the app in environments that require Postgres.
- Treat `README.md` and script definitions in `package.json` as the source of truth if command docs ever drift.

## Related Docs

- `README.md`: setup, scripts, and high-level project overview
- `PROJECT_PHASES.MD`: implementation roadmap and planned phases
- `src/README.md`: architecture details for the `src/` tree

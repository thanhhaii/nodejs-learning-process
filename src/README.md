# Source Folder Structure

This folder follows a layered Express structure.

- `server.ts`: process entrypoint, starts HTTP server
- `app.ts`: Express app configuration (middleware + routes)
- `config/`: runtime constants and environment-related settings
- `routes/`: route composition using Express Router
- `controllers/`: HTTP handlers (request/response logic)
- `services/`: business logic and side effects (e.g. file IO)
- `data/`: local in-memory/mock data providers
- `middlewares/`: reusable request/response middleware
- `repositories/`: data access layer (DB/query adapters)
- `validators/`: request payload/query/path validation
- `types/`: shared TypeScript types/interfaces

Recommended flow:

`route -> controller -> service -> repository`

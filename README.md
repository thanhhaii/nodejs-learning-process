# Node.js Learning API (Express + TypeScript)

Simple Express API project for learning backend structure with TypeScript.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Biome (lint + format)

## Project Structure

```text
.
├── public/                # uploaded/static files
├── src/
│   ├── server.ts          # process entrypoint, starts server
│   ├── app.ts             # express app setup
│   ├── config/            # runtime configuration
│   ├── routes/            # route definitions
│   ├── controllers/       # request/response handlers
│   ├── services/          # business logic
│   ├── repositories/      # data access layer
│   ├── middlewares/       # reusable middleware
│   ├── validators/        # request validation
│   ├── data/              # in-memory/mock data
│   ├── types/             # shared TS types/interfaces
│   ├── stream-test.ts     # stream demo/test file
│   └── README.md          # source folder architecture guide
├── dist/                  # compiled JavaScript output
├── biome.json             # Biome config
├── tsconfig.json          # TypeScript config
└── package.json
```

Recommended flow:

`route -> controller -> service -> repository`

## Setup

```bash
npm install
```

## Run Project

Development mode (watch + auto restart):

```bash
npm run dev
```

Production start (build then run):

```bash
npm run start
```

Build only:

```bash
npm run publish
```

Clean build artifacts:

```bash
npm run clean
```

## Linting

Check lint issues with Biome:

```bash
npm run lint
```

Auto-fix lint issues (where possible):

```bash
npm run lint:fix
```

## Formatting

Format all files with Biome:

```bash
npm run format
```

## Notes

- Biome configuration is in `biome.json`.
- TypeScript source is in `src/`, output is generated in `dist/`.
- Upload artifacts are saved to `public/`.
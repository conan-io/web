# Conan.io web (`conanio`)

Next.js pages-router app for `conan.io` and ConanCenter pages.

## Package manager policy

This project uses **Yarn**.

- Install dependencies with `yarn install`
- Run scripts with `yarn <script>`
- Do not use `npm`, `pnpm`, or `bun` in this folder

## Requirements

- Node.js 20+ (recommended: latest LTS)
- Yarn classic (lockfile is `yarn.lock`)

## Local development

1. Install dependencies:

```bash
yarn install
```

2. Configure local env in `.env.development` (example values):

```bash
NEXT_PUBLIC_CONAN_CONANIO_SERVICE=http://localhost:5000
NEXT_PUBLIC_CONAN_VERSION=2.28.0
```

3. Start dev server:

```bash
yarn dev
```

App runs on [http://localhost:3000](http://localhost:3000).

## Scripts

- `yarn dev` - run dev server
- `yarn build` - production build
- `yarn start` - run production server
- `yarn lint` - run ESLint
- `yarn test` - run baseline unit/integration tests once
- `yarn test:watch` - run tests in watch mode
- `yarn test:ci` - run tests with coverage

## Project structure (high-level)

- `src/pages` - routes (`/`, `/center`, `/api/*`, `/llms.txt`, `/sitemap.xml`)
- `src/components` - shared UI pieces
- `tests` - Vitest suite (`*.test.ts`), kept outside `src`
- `src/service` - API and URL composition helpers
- `src/styles` - global and page-family styles
- `public` - static assets

## SEO and crawl surfaces

- `public/robots.txt`
- `src/pages/sitemap.xml.tsx` (served at `/sitemap.xml`)
- `src/pages/llms.txt.tsx` (served at `/llms.txt`)
- `src/pages/center/llms.txt.tsx` (served at `/center/llms.txt`)

## API routing model

- Browser-initiated requests should hit same-origin Next API routes (`/api/...`)
- Server-side code can call backend private origin directly
- Current public proxy routes:
  - `GET /api/search/:pattern`
  - `GET /api/package/:packageId/use_it`
  - `GET /api/ping`

## Build and container

- Docker build uses `output: "standalone"` and runs `node server.js`
- `NEXT_PUBLIC_SITE_ORIGIN` should point to canonical site origin in production

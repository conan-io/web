<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## npm registry (dependencies)

- **Package manager**: Yarn classic (`yarn.lock`). Do not run `npm install` / `pnpm` / `bun` in this folder unless the user explicitly asks.
- **Registry**: All dependency tarballs in lockfiles must resolve from the public npm registry: **`https://registry.npmjs.org/`**.
- **Do not use** private mirrors (for example JFrog Artifactory npm virtual repos) when installing or updating dependencies. Lockfile `resolved` URLs must use `https://registry.npmjs.org/...`, not corporate registry hosts.
- **Config in this tree**: `conanio/.yarnrc` and `conanio/.npmrc` both pin the registry to npmjs. After changing dependencies, run `yarn install` from `conanio/` and confirm every `resolved` line in `yarn.lock` starts with `https://registry.npmjs.org/` before committing.
- If a local corporate npm proxy rewrites tarball URLs to a private mirror (for example `jfrogrepo24.jfrog.io`), do **not** commit those URLs—rewrite them to `registry.npmjs.org` (same package path and integrity hash) or reinstall from a clean environment that talks to npmjs directly.
- See also **`README.md`** (package manager policy).

## Conan backend: public API vs private API

In this app, `getUrls()` in **`src/service/api.ts`** defines **`api.private`** (backend origin from `NEXT_PUBLIC_CONAN_CONANIO_SERVICE` / `conanioServer`) and **`api.public`** (`/api`, same-origin routes on this Next app).

### Rules

| Caller | Base to use | Purpose |
| --- | --- | --- |
| **Server-side only** (`getServerSideProps`, other Node code on this host) | **`getUrls().api.private`** | Call the Conan service directly. Not exposed to the browser. |
| **Frontend** (`useEffect`, event handlers, anything that runs in the browser) | **`getUrls().api.public`** | Same-origin `/api/...` routes. Next forwards selected endpoints to the backend so the client never hits the raw service URL. |

- **`private`** is never a substitute for auth boundaries by itself; it means “not meant to be called from the browser.” **`public`** is the deliberate, proxied surface for browser traffic.

- When you add a **new** browser-initiated fetch to the backend, add or reuse a handler under **`src/pages/api/`** and point the client at **`urls.api.public`** with the matching path (e.g. search → `/api/search/[pattern]`; package `use_it` → `/api/package/[packageId]/use_it`).

### Quick references in this tree

- Client recipes search uses **`urls.api.public`**: `src/hooks/useCenterRecipesSearch.ts` (`getJsonList` against `searchUrls.api.public`).
- Recipe detail hydrates **use_it** from the client with **`urls.api.public`**: `src/pages/center/recipes/[recipeName].tsx` (`useEffect` + `getJson`); initial package data stays **`urls.api.private`** in `getServerSideProps`.

### Conan Audit auth (register / validate / recover)

- **Env**: `CONANIO_AUTH_SERVER` → `process.env.conanioAuthServer` (see `next.config.ts`). Same internal auth service as `conan-catalog-proxy` (`/user/signup`, `/user/recover`, `/user/validate/{code}`).
- **Browser** → same-origin **`/api/audit/user/signup`** and **`/api/audit/user/recover`** (`src/pages/api/audit/user/` — literal port of catalog-proxy `pages/api/user/*`).
- **Validate** (activation link): **`GET /user/validate/{code}`** from **`getServerSideProps`** on `/audit/validate/[token]` (same as catalog-proxy `pages/validate/[token].tsx`), not a public `/api` route.
- **Pages**: `/audit/register`, `/audit/recover`, `/audit/validate/[token]` (SSR `GET /user/validate/{code}`), `/audit/content-unavailable`. Legacy `/recover`, `/content-unavailable`, and `/validate/:token` redirect into `/audit/…`.
- **Shared UI**: `AuditPageFrame` (page shell + side rails), `AuditMarketingSideInfo`, `AuditFormAlert` under `src/components/audit/`. Validate-only UI (`AuditCodebox`, `getAuditValidateCliSteps`) lives in `src/pages/audit/validate/[token].tsx`. Page-specific styles in `src/styles/auditPages.module.css` (use global `--fs-*` / color tokens from `globals.css`).
- Do not use **`/api/conan-user/signup`** for Audit; that proxy targets a different upstream contract (`full_name`, `gdpr_consent`).

In **this** tree, shared URL composition and fetch helpers live in **`src/service/api.ts`** — keep the same public/private split when wiring new calls.

## External APIs and server cache

When **`getServerSideProps`** (or other server-only code) calls a **third-party** API whose data changes slowly (daily aggregates, public stats, raw READMEs, etc.), **do not fetch on every page view**. Prefer a **server-side cache** (e.g. `unstable_cache` from `next/cache` in a small module under **`src/service/`**), with a TTL aligned to how often the upstream updates (often **hours to 24h**). Do **not** use **`src/lib/`** — the repo root `.gitignore` ignores any `lib/` directory.

- Cache runs in the **Node process** (K8s pod); the browser never talks to the external API.
- **Cache successful responses only**; on failure return `null` or a safe fallback and retry on the next request — do not lock in errors for the full TTL.
- Respect upstream rate limits and etiquette (see provider docs); match TTL to their update cadence.
- Reference: **`src/service/pypiStats.ts`** (pypistats.org, 24h revalidate).

Slow-changing **Conan backend** (`api.private`) aggregates may use the same pattern when traffic or payload justify it; user-driven search and per-request data should stay uncached or use short TTLs.

## Typography

Font sizes use CSS variables `--fs-*` on `:root` in **`src/styles/globals.css`**. A comment block at the top of that file maps **roles** (marketing hero, doc hero, section titles, ConanCenter, prose, UI) to the usual tokens and breakpoints. Prefer `var(--fs-…)` for new styles; page-specific rules live in **`src/styles/contentPages.module.css`**, **`src/styles/centerPages.module.css`**, and **`src/styles/auditPages.module.css`** (Conan Audit).

## Page style guide (new pages + restyling)

For any visual/content page work in `conanio` (new pages or restyling pages from other products), follow **`STYLE.md`** as the primary implementation playbook. It defines required shell structure, token usage, component patterns, responsive/a11y checks, and migration workflow.

## FAQ and Terms copy

The visible copy in **`src/pages/faq.tsx`** and **`src/pages/terms-conditions.tsx`** is **canonical**. Do **not** rewrite, replace, paraphrase, or “improve” that text as part of refactors, styling work, or drive-by edits. Only change those strings when the **user explicitly** asks to update FAQ or Terms content (or points to a specific wording change).

## Deferred feature backlog

The file **`FEATURES.md`** in this folder is the canonical backlog for explicitly deferred project-level features.

- Read **`FEATURES.md`** before proposing roadmap-level work.
- When a deferred item is requested, follow the scope described there and confirm implementation scope with the user.
- Keep **`FEATURES.md`** updated when the user defers, approves, or closes one of those items.

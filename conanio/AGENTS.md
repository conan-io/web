<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Conan backend: public API vs private API

Production behavior lives in **`legacy/conanio`** (the previous Next.js app, kept as reference). See especially:

- `legacy/conanio/service/service.tsx` — `getUrls()` defines **`api.private`** (backend origin from `NEXT_PUBLIC_CONAN_CONANIO_SERVICE` / `conanioServer`) and **`api.public`** (`/api`, same-origin routes on this Next app).

### Rules

| Caller | Base to use | Purpose |
| --- | --- | --- |
| **Server-side only** (`getServerSideProps`, other Node code on this host) | **`getUrls().api.private`** | Call the Conan service directly. Not exposed to the browser. |
| **Frontend** (`useEffect`, event handlers, anything that runs in the browser) | **`getUrls().api.public`** | Same-origin `/api/...` routes. Next forwards selected endpoints to the backend so the client never hits the raw service URL. |

- **`private`** is never a substitute for auth boundaries by itself; it means “not meant to be called from the browser.” **`public`** is the deliberate, proxied surface for browser traffic.

- When you add a **new** browser-initiated fetch to the backend, mirror prod: add or reuse a handler under **`src/pages/api/`** (same shape as `legacy/conanio/pages/api/`) and point the client at **`urls.api.public`** with the matching path (e.g. search → `/api/search/[pattern]`; package `use_it` → `/api/package/[packageId]/use_it` in prod).

### Quick references in `legacy/conanio` (prod)

- Client search uses **`urls.api.public`**: `legacy/conanio/pages/center/recipes.tsx` (`getJsonList` for search).
- Recipe detail hydrates **use_it** from the client with **`urls.api.public`**: `legacy/conanio/pages/center/recipes/[recipeName].tsx` (`useEffect` + `getJson`); initial package data stays **`urls.api.private`** in `getServerSideProps`.

In **this** tree, shared URL composition and fetch helpers live in **`src/service/api.ts`** — keep the same public/private split when wiring new calls.

## Typography

Font sizes use CSS variables `--fs-*` on `:root` in **`src/styles/globals.css`**. A comment block at the top of that file maps **roles** (marketing hero, doc hero, section titles, ConanCenter, prose, UI) to the usual tokens and breakpoints. Prefer `var(--fs-…)` for new styles; page-specific rules live in **`src/styles/contentPages.module.css`** and **`src/styles/centerPages.module.css`**.

## Page style guide (new pages + restyling)

For any visual/content page work in `conanio` (new pages or restyling pages from other products), follow **`STYLE.md`** as the primary implementation playbook. It defines required shell structure, token usage, component patterns, responsive/a11y checks, and migration workflow.

## FAQ and Terms copy

The visible copy in **`src/pages/faq.tsx`** and **`src/pages/terms-conditions.tsx`** is **canonical**. Do **not** rewrite, replace, paraphrase, or “improve” that text as part of refactors, styling work, or drive-by edits. Only change those strings when the **user explicitly** asks to update FAQ or Terms content (or points to a specific wording change).

## Deferred feature backlog

The file **`FEATURES.md`** in this folder is the canonical backlog for explicitly deferred project-level features.

- Read **`FEATURES.md`** before proposing roadmap-level work.
- When a deferred item is requested, follow the scope described there and confirm implementation scope with the user.
- Keep **`FEATURES.md`** updated when the user defers, approves, or closes one of those items.

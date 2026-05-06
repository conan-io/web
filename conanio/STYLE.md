# Conan.io Style Guide (Agent-Friendly)

This guide exists for two use cases:

1. Build new pages that match existing `conanio` brand style.
2. Restyle existing pages from other products to unify brand image.

Use this document as an execution playbook, not just design notes.

## Scope and intent

- Maintain visual consistency, editorial consistency, and UX consistency.
- Keep pages technically clear and implementation-friendly.
- Prefer existing patterns over inventing new ones.

## Agent execution order (always)

1. Identify page type (`marketing`, `content`, `ConanCenter`).
2. Reuse shell primitives (`PageHead`, `MainNav`, `MainFooter`, `main#page`).
3. Apply token-based styling from `src/styles/globals.css`.
4. Apply page-family module styles (`contentPages` vs `centerPages`).
5. Validate responsive behavior at `1024` and `640` breakpoints.
6. Validate accessibility and interaction consistency.
7. Do final copy/tone check.

---

## 1) Brand principles

Every page should feel:

- Clear, technical, modern.
- Readability-first, ornament-second.
- Engineering-friendly (useful information, direct navigation, clear CTAs).
- Strong hierarchy with Conan/JFrog blue system and restrained accents.
- Medium density: informative, not crowded.

---

## 2) Required page skeleton

For public marketing/content pages, use this baseline:

- `PageHead` title formatted as `Conan — ...` or `ConanCenter — ...`.
- Root node: `<main id="page" ... data-screen-label="...">`.
- `MainNav` at top.
- Primary hero (`.doc-hero`, `.dl-hero`, `.cc-hero`, etc.) with clear H1.
- Section-based content blocks (cards, lists, grids, long-form blocks).
- `MainFooter` at bottom.

Layout rhythm baseline:

- Main content width near `max-width: 1200px`.
- Lateral padding typically `40 / 24 / 16` (desktop / tablet / mobile).
- Section vertical rhythm roughly `40-80px` on desktop.

---

## 3) Design tokens (MUST use)

Always use variables from `src/styles/globals.css`.

### Color tokens

- `--ink`, `--ink-2`, `--ink-3`
- `--line`, `--line-2`, `--soft`
- `--accent`, `--blue-ink`, `--blue-soft`, `--blue-ultra`

### Typography tokens

- Families: `--sans`, `--mono`
- Sizes: `--fs-*`

### Hard rules

- Do not hardcode color values when an existing token matches.
- Do not hardcode font size values when `--fs-*` exists.
- Use `--mono` for metadata, labels, chips, and technical snippets.

---

## 4) Typography and hierarchy

### Typical H1 sizes by page family

- Home marketing hero: around `--fs-60`.
- Content/docs-like heroes (FAQ, Terms, Why, Downloads): around `--fs-44`.
- ConanCenter hero: around `--fs-54`.

### Minimum responsive scaling

- Hero: `44/34/26` or `54/42/30` depending on family.
- Section titles: usually `42/34/28` (marketing) or `24/20` (content-heavy).
- Body text: around `15 -> 14.5`.

### Text behavior

- H1/H2: high weight, slight negative tracking.
- Paragraphs: generous line-height (`~1.55-1.72`).
- Eyebrows/meta: uppercase, mono, increased letter spacing.

---

## 5) UI patterns and components

### Navigation and footer

- Reuse `MainNav` and `MainFooter` for all public pages.
- Avoid ad hoc replacements unless explicitly required.

### Buttons and CTAs

- Primary: `.btn.btn-primary` (`--accent` background, white text).
- Secondary: `.btn.btn-ghost` (white bg, `--line-2` border).
- Limit to one dominant primary CTA per major section.

### Hero blocks

- Optional contextual `pill` (`Downloads`, `Help`, `Legal`, etc.).
- H1 must be direct and concrete.
- Subtitle should state value or context, briefly.

### Content blocks

- Prefer white cards with subtle borders.
- Use 2-3 columns on desktop; collapse to 1 on mobile.
- Keep shadows subtle (or no shadow).

### Links

- Internal links: `Link` from `next/link`.
- External links: add `target="_blank"` + `rel="noopener noreferrer"` when needed.

---

## 6) Editorial tone and copy

Tone requirements:

- Technical but accessible.
- Confident and specific.
- Focused on real engineering value.

Copy rules:

- Prefer short, explicit sentences.
- Prefer verifiable outcomes (time, reproducibility, scale, reliability).
- Avoid vague or over-marketing claims.

Canonical content rule:

- Visible copy in `src/pages/faq.tsx` and `src/pages/terms-conditions.tsx` is canonical.
- Do not rewrite/paraphrase unless the user explicitly asks to change that copy.

---

## 7) Responsive and accessibility requirements

### Breakpoints

- Tablet: `@media (max-width: 1024px)`.
- Mobile: `@media (max-width: 640px)`.

### A11y minimum

- Keep visible focus states (`:focus-visible`) for interactive controls.
- Add `aria-label` where visible text is insufficient.
- Preserve readable contrast.
- Never communicate state with color alone.
- Keep keyboard support for custom controls (tabs, carousels, etc.).

---

## 8) Where styles belong

- Global/shared base: `src/styles/globals.css`.
- Content-family pages: `src/styles/contentPages.module.css`.
- ConanCenter-family pages: `src/styles/centerPages.module.css`.

Decision rule:

- Repeated pattern across families -> consider shared/global.
- Family-specific pattern -> keep in its module.

---

## 9) Workflow A: create a new page

Use this checklist in order:

- Set `PageHead` naming (`Conan — ...` or `ConanCenter — ...`).
- Use `<main id="page" ... data-screen-label="...">`.
- Include `MainNav` and `MainFooter`.
- Build hero with optional `pill`, clear H1, short subtitle.
- Use tokenized typography and colors only.
- Implement/verify `1024` and `640` responsive behavior.
- Verify semantics, keyboard behavior, and focus visibility.
- Verify CTA consistency (`btn-primary` / `btn-ghost`).

---

## 10) Workflow B: restyle a page from another product

Use this migration sequence:

1. **Map current structure**  
   Identify hero, sections, CTAs, technical areas, FAQs, tables.
2. **Replace shell with Conan shell**  
   Add `PageHead`, `main#page`, `MainNav`, `MainFooter`.
3. **Normalize hierarchy and spacing**  
   Convert to `--fs-*` and Conan heading rhythm.
4. **Normalize colors and components**  
   Replace custom palette with Conan tokens; map buttons to Conan button styles.
5. **Apply Conan layout patterns**  
   Card/grid rhythm, border treatment, and section pacing.
6. **Validate responsive and a11y**  
   Check 1024/640, focus, keyboard, contrast, labels.
7. **Editorial pass**  
   Preserve meaning; align wording style to Conan voice.

---

## 11) Anti-patterns (avoid)

- Non-token colors without strong reason.
- Hardcoded font sizes where `--fs-*` exists.
- Multiple competing primary CTAs in the same block.
- Inconsistent “bubble UI” or overly rounded visual style.
- Long text walls without headings and spacing structure.
- Different interaction patterns for equivalent components.

---

## 12) Definition of done

A page is style-compliant when:

- It is immediately recognizable as part of `conanio`.
- It follows shell + token + component conventions.
- It keeps clear hierarchy and readability on desktop/tablet/mobile.
- It keeps actions and interactions accessible.
- It avoids unnecessary visual exceptions.

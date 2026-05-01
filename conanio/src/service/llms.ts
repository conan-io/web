/**
 * Public site origin, no trailing slash (e.g. https://conan.io).
 * `next.config.ts` maps `NEXT_PUBLIC_SITE_ORIGIN` -> `process.env.siteOrigin` (same as prod `conanio`).
 */
export function getSiteOrigin(): string {
  const raw = process.env.siteOrigin || process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://conan.io";
  return raw.replace(/\/$/, "");
}

/** Hostname for display in llms.txt (falls back if origin is invalid). */
export function hostFromOrigin(origin: string): string {
  try {
    return new URL(origin).host;
  } catch {
    return "conan.io";
  }
}

/** Canonical Conan Center recipe page URL (matches `/center/llms.txt` and JSON-LD). */
export function recipeReferencePageUrl(origin: string, recipeName: string, version: string): string {
  return `${origin}/center/recipes/${encodeURIComponent(recipeName)}?version=${encodeURIComponent(version)}`;
}

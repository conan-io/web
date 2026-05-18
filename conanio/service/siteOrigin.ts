/**
 * Public site origin, no trailing slash (e.g. https://conan.io).
 * Inlined from next.config.js `env.siteOrigin` (same pattern as `conanioServer`).
 * Build sets `NEXT_PUBLIC_SITE_ORIGIN` (e.g. Docker ARG) → `siteOrigin` here.
 */
export function getSiteOrigin(): string {
  const raw = process.env.siteOrigin || 'https://conan.io';
  return raw.replace(/\/$/, '');
}

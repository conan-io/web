/**
 * Public site origin, no trailing slash (e.g. https://conan.io).
 * Set NEXT_PUBLIC_SITE_ORIGIN when deploying to a staging or preview host so /llms.txt and JSON-LD match that URL.
 */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://conan.io';
  return raw.replace(/\/$/, '');
}

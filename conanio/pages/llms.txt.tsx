import { GetServerSideProps } from 'next';
import { getSiteOrigin } from '@/service/siteOrigin';

function generateLlmsTxt(origin: string): string {
  const host = (() => {
    try {
      return new URL(origin).host;
    } catch {
      return 'conan.io';
    }
  })();

  return `# Conan.io

> Conan.io hosts marketing pages; the only site content that is useful for automated access is **ConanCenter recipe reference** pages: metadata, versions, and usage snippets for each package.

The canonical public deployment for this build is **${origin}** (HTML pages). For installing Conan, authoring recipes, and CLI reference, use the official documentation at https://docs.conan.io/ (Conan 2.x). Individual recipes use \`${origin}/center/recipes/{recipeName}\`.

## ConanCenter recipe pages (reference)

Each public recipe has one HTML page. That is the only URL pattern on **${host}** that agents should fetch for package metadata.

- **Path:** \`${origin}/center/recipes/{recipeName}\`  
  \`{recipeName}\` is the recipe name as in ConanCenter (e.g. \`zlib\`, \`openssl\`).

- **Reference version (query string):** add \`?version={version}\` to open a specific recipe version.  
  \`{version}\` is the exact version string for that recipe (as shown on the page, e.g. \`1.3.1\`). Use URL encoding when the version contains characters that must be escaped (the server decodes the \`version\` query parameter). If \`version\` is omitted, the page defaults to an available version (typically the current maintained one).

- **Example:** \`${origin}/center/recipes/zlib?version=1.3.1\`

Recipe rows that are deprecated or unmaintained may be labeled as shown “for reference only” in the UI; they use the **same** URL pattern.

## Optional

- [Conan documentation](https://docs.conan.io/): Official Conan 2.x documentation (install, CLI, recipes, consuming packages — not hosted on this marketing site).
- [Blog](https://blog.conan.io/): Articles and release notes (separate site).
- [Conan Audit](https://audit.conan.io/): Security audit service (separate site).
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = generateLlmsTxt(getSiteOrigin());
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(body);
  res.end();
  return { props: {} };
};

const LlmsTxtPage = () => null;

export default LlmsTxtPage;

import { GetServerSideProps } from 'next';
import { getJsonList, getUrls, RecipeBasic } from '@/service';
import { getSiteOrigin } from '@/service/siteOrigin';

function recipeReferenceUrl(origin: string, recipe: RecipeBasic): string {
  const name = encodeURIComponent(recipe.name);
  const version = encodeURIComponent(recipe.version || '');
  return `${origin}/center/recipes/${name}?version=${version}`;
}

function generateLlmsTxt(origin: string, popular: RecipeBasic[]): string {
  const host = (() => {
    try {
      return new URL(origin).host;
    } catch {
      return 'conan.io';
    }
  })();

  const popularBlock =
    popular.length > 0
      ? `## Popular recipes

Same list and ranking as **Popular recipes** on [Conan Center](${origin}/center) (most downloaded recipes in the last 30 days).

${popular.map((r) => `- [${r.name}](${recipeReferenceUrl(origin, r)})`).join('\n')}

`
      : '';

  return `# Conan.io — ConanCenter package index

> ConanCenter hosts 1500+ open-source C/C++ packages curated for Conan. On **${host}** you can browse recipe metadata, versions, licenses, dependencies, and usage-oriented details for each package.
> For installing Conan, tutorials, CLI reference, and authoring recipes, use the official documentation at https://docs.conan.io/ (Conan 2.x).

This deployment serves HTML from **${origin}**. Recipe pages follow:

\`${origin}/center/recipes/{recipeName}\`

Use \`{recipeName}\` as in ConanCenter (e.g. \`zlib\`, \`openssl\`).

## Recipe reference URLs

Each public recipe has one HTML page under that path. Prefer these URLs when you need machine-oriented package metadata from this site.

- **Path:** \`${origin}/center/recipes/{recipeName}\`

- **Version (query string):** \`?version={version}\` opens a specific recipe version. \`{version}\` is the exact version string shown on the page (e.g. \`1.3.1\`). URL-encode the value when needed; the server decodes the \`version\` query parameter. If omitted, the page picks a default version (typically a current maintained one).

- **Examples (this deployment):**
  - Default / latest context: \`${origin}/center/recipes/zlib\`
  - Pinned version: \`${origin}/center/recipes/zlib?version=1.3.1\`

Deprecated or unmaintained versions may be labeled in the UI; they use the **same** URL pattern.

${popularBlock}## Other useful links (off this origin)

- [Conan documentation](https://docs.conan.io/): Official Conan 2.x docs (install, CLI, recipes, consuming packages).
- [Blog](https://blog.conan.io/): Articles and release notes.
- [Conan Audit](https://audit.conan.io/): Security audit service.
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = getSiteOrigin();
  let popular: RecipeBasic[] = [];
  try {
    const urls = getUrls();
    const popularResponse = await getJsonList<RecipeBasic>(urls.popular, urls.api.private);
    popular = popularResponse.data;
  } catch {
    /* same endpoint as /center; if it fails, omit Popular recipes block */
  }

  const body = generateLlmsTxt(origin, popular);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(body);
  res.end();
  return { props: {} };
};

const LlmsTxtPage = () => null;

export default LlmsTxtPage;

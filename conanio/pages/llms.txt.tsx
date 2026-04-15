import { GetServerSideProps } from 'next';
import { getJsonList, getSiteOrigin, getUrls, RecipeBasic, recipeReferencePageUrl } from '@/service';

function llmsHostLabel(origin: string): string {
  try {
    return new URL(origin).host;
  } catch {
    return 'conan.io';
  }
}

function generateLlmsTxt(origin: string, popular: RecipeBasic[]): string {
  const host = llmsHostLabel(origin);

  const popularBlock =
    popular.length > 0
      ? `## Popular recipes

Same list and ranking as **Popular recipes** on [Conan Center](${origin}/center) (most downloaded recipes in the last 30 days).

${popular
    .map((r) => {
      const href = r.version
        ? recipeReferencePageUrl(origin, r.name, r.version)
        : `${origin}/center/recipes/${encodeURIComponent(r.name)}`;
      return `- [${r.name}](${href})`;
    })
    .join('\n')}

`
      : '';

  return `# Conan.io — ConanCenter package index

> ConanCenter hosts 1500+ open-source C/C++ packages curated for Conan. On **${host}** you can browse recipe metadata, versions, licenses, dependencies, and usage-oriented details for each package.
> For installing Conan, tutorials, CLI reference, and authoring recipes, use the official documentation at https://docs.conan.io/ (Conan 2.x).

This deployment serves HTML from **${origin}**. Recipe pages follow:

\`${origin}/center/recipes/{recipeName}\`

Use \`{recipeName}\` as in ConanCenter (e.g. \`zlib\`, \`openssl\`).

## Recipe pages

- Pattern: \`${origin}/center/recipes/{name}?version={version}\`
- Example: \`${origin}/center/recipes/zlib?version=1.3.1\`
- If \`version\` is omitted, defaults to the latest maintained version.

## Machine-readable data

Recipe pages embed JSON-LD (\`<script type="application/ld+json">\`) with structured package metadata: version, license, dependencies, CMake/pkg-config targets, install commands, and all available versions.

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

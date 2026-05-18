import { GetServerSideProps } from 'next';
import { getJsonList, getSiteOrigin, getUrls, RecipeBasic, recipeReferencePageUrl } from '@/service';

function host(origin: string): string {
  try {
    return new URL(origin).host;
  } catch {
    return 'conan.io';
  }
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = getSiteOrigin();
  let popular: RecipeBasic[] = [];
  try {
    const urls = getUrls();
    const popularResponse = await getJsonList<RecipeBasic>(urls.popular, urls.api.private);
    popular = popularResponse.data;
  } catch {
    /* omit Popular recipes block */
  }

  const h = host(origin);
  const popularBlock =
    popular.length > 0
      ? `## Popular recipes

Same list as **Popular recipes** on [Conan Center](${origin}/center).

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

  const body = `# Conan Center (${h})

> 1500+ curated packages. Recipe pages on **${h}**; install, CLI, recipes: https://docs.conan.io/2/

Site-wide context: ${origin}/llms.txt

Recipe pages: \`${origin}/center/recipes/{recipeName}\` (e.g. \`zlib\`, \`openssl\`).

- Pattern: \`${origin}/center/recipes/{name}?version={version}\`
- Example: \`${origin}/center/recipes/zlib?version=1.3.1\`
- Omit \`version\` for latest maintained.

## Machine-readable data

Pages include JSON-LD (\`<script type="application/ld+json">\`): version, license, dependencies, CMake/pkg-config targets, install commands, versions.

${popularBlock}`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(body);
  res.end();
  return { props: {} };
};

const CenterLlmsTxtPage = () => null;

export default CenterLlmsTxtPage;

import type { GetServerSideProps } from "next";

import { getJsonList, getUrls } from "@/service/api";
import { getSiteOrigin, hostFromOrigin, recipeReferencePageUrl } from "@/service/llms";
import type { RecipeBasic } from "@/types/conanCenter";
import { recipeAbsoluteUrl } from "@/utils/recipeUrls";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = getSiteOrigin();
  let popular: RecipeBasic[] = [];
  try {
    const urls = getUrls();
    const popularResponse = await getJsonList<RecipeBasic>(urls.popular, urls.api.private);
    popular = popularResponse.data;
  } catch {
    /* Keep rendering even if popular recipes cannot be fetched. */
  }

  const h = hostFromOrigin(origin);
  const popularBlock =
    popular.length > 0
      ? `## Popular recipes

Same list as **Popular recipes** on [Conan Center](${origin}/center).

${popular
  .map((r) => {
    const href = r.version
      ? recipeReferencePageUrl(origin, r.name, r.version)
      : recipeAbsoluteUrl(origin, r.name);
    return `- [${r.name}](${href})`;
  })
  .join("\n")}

`
      : "";

  const body = `# Conan Center (${h})

> 1500+ curated packages. Recipe pages on **${h}**; install, CLI, recipes: https://docs.conan.io/2/

Site-wide context: ${origin}/llms.txt

Recipe pages: \`${origin}/center/recipes/{recipeName}\` (e.g. \`zlib\`, \`openssl\`).

- Pattern: \`${origin}/center/recipes/{name}?version={version}\`
- Example: \`${origin}/center/recipes/zlib?version=1.3.1\`
- Omit \`version\` for latest maintained.

${popularBlock}`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(body);
  res.end();
  return { props: {} };
};

const CenterLlmsTxtPage = () => null;

export default CenterLlmsTxtPage;

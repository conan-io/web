import type { GetServerSideProps } from "next";

import { getJsonList, getUrls } from "@/service/api";
import { getSiteOrigin, recipeReferencePageUrl } from "@/service/llms";
import type { RecipeBasic } from "@/types/conanCenter";
import { recipeAbsoluteUrl } from "@/utils/recipeUrls";

const STATIC_PATHS = [
  "/",
  "/downloads",
  "/faq",
  "/terms-conditions",
  "/why-conan",
  "/tribe",
  "/user-stories",
  "/user-stories/tomtom",
  "/user-stories/rti",
  "/center",
  "/center/recipes",
  "/llms.txt",
  "/center/llms.txt",
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlTag(url: string): string {
  return `<url><loc>${escapeXml(url)}</loc></url>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = getSiteOrigin();
  const staticUrls = STATIC_PATHS.map((path) => `${origin}${path === "/" ? "" : path}`);
  const recipeUrls: string[] = [];

  try {
    // Include every known recipe URL, not only popular ones.
    const urls = getUrls({ pattern: "all" });
    const allRecipesResponse = await getJsonList<RecipeBasic>(urls.search.package, urls.api.private);
    for (const recipe of allRecipesResponse.data) {
      if (!recipe.name) {
        continue;
      }
      if (recipe.version) {
        recipeUrls.push(recipeReferencePageUrl(origin, recipe.name, recipe.version));
      } else {
        recipeUrls.push(recipeAbsoluteUrl(origin, recipe.name));
      }
    }
  } catch {
    /* Keep sitemap available even if upstream is down. */
  }

  const dedupedUrls = Array.from(new Set([...staticUrls, ...recipeUrls]));
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    dedupedUrls.map((url) => urlTag(url)).join("") +
    `</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(body);
  res.end();
  return { props: {} };
};

const SitemapXmlPage = () => null;

export default SitemapXmlPage;

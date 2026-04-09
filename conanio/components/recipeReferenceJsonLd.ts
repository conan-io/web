import type { RecipeInfo } from '@/service';
import { getSiteOrigin } from '@/service/siteOrigin';

export function resolveSelectedRecipe(
  data: Record<string, RecipeInfo>,
  requestedVersion: string | null
): RecipeInfo {
  const entries = Object.values(data);
  if (!entries.length) {
    throw new Error('resolveSelectedRecipe: empty recipe data');
  }
  if (requestedVersion) {
    const found = entries.find((e) => e.info.version === requestedVersion);
    if (found) return found;
  }
  return entries[0];
}

function recipePageUrl(origin: string, recipeName: string, version: string): string {
  const v = encodeURIComponent(version);
  const n = encodeURIComponent(recipeName);
  return `${origin}/center/recipes/${n}?version=${v}`;
}

function licensesForSchema(licenses: RecipeInfo['info']['licenses']): string | string[] | undefined {
  if (!licenses) return undefined;
  if (Array.isArray(licenses)) {
    if (licenses.length === 0) return undefined;
    return licenses.length === 1 ? licenses[0] : licenses;
  }
  const keys = Object.keys(licenses as Record<string, unknown>);
  if (keys.length === 0) return undefined;
  return keys.length === 1 ? keys[0] : keys;
}

function keywordsFromLabels(labels: RecipeInfo['info']['labels']): string[] | undefined {
  if (!labels) return undefined;
  if (Array.isArray(labels)) {
    return labels.length ? labels : undefined;
  }
  const keys = Object.keys(labels as Record<string, unknown>);
  return keys.length ? keys : undefined;
}

/**
 * JSON-LD @graph for Conan Center recipe reference pages (aligned with /llms.txt URL pattern).
 */
export function buildRecipeReferenceJsonLd(
  recipe: RecipeInfo,
  recipeNameFromPath: string
): Record<string, unknown> {
  const origin = getSiteOrigin();
  const version = recipe.info.version;
  const pageUrl = recipePageUrl(origin, recipeNameFromPath, version);
  const pageId = `${pageUrl}#webpage`;
  const codeId = `${pageUrl}#recipe`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const description = recipe.info.description?.trim() || undefined;
  const licenses = licensesForSchema(recipe.info.licenses);
  const keywords = keywordsFromLabels(recipe.info.labels);
  const githubRepo = `https://github.com/conan-io/conan-center-index/tree/master/recipes/${recipeNameFromPath}`;

  const softwareSourceCode: Record<string, unknown> = {
    '@type': 'SoftwareSourceCode',
    '@id': codeId,
    name: recipe.name,
    version,
    url: pageUrl,
    codeRepository: githubRepo,
  };

  if (description) softwareSourceCode.description = description;
  if (licenses) softwareSourceCode.license = licenses;
  if (keywords?.length) softwareSourceCode.keywords = keywords.join(', ');

  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Conan Center',
        item: `${origin}/center`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${recipe.name}/${version}`,
        item: pageUrl,
      },
    ],
  };

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: `${recipe.name}/${version} | Conan Center`,
    inLanguage: 'en',
    isPartOf: { '@id': `${origin}/#website` },
    breadcrumb: { '@id': breadcrumbId },
    mainEntity: { '@id': codeId },
  };

  if (description) webPage.description = description;
  if (recipe.info.timestamp) {
    const iso = /^\d{4}-\d{2}-\d{2}/.test(recipe.info.timestamp)
      ? `${recipe.info.timestamp}T00:00:00.000Z`
      : undefined;
    if (iso) webPage.dateModified = iso;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: 'Conan',
        publisher: {
          '@type': 'Organization',
          name: 'Conan',
          url: origin,
        },
      },
      breadcrumbList,
      softwareSourceCode,
      webPage,
    ],
  };
}

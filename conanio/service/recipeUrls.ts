/** Canonical Conan Center recipe page URL for this deployment (matches /center/llms.txt and JSON-LD). */
export function recipeReferencePageUrl(origin: string, recipeName: string, version: string): string {
  return `${origin}/center/recipes/${encodeURIComponent(recipeName)}?version=${encodeURIComponent(version)}`;
}

function normalizedOrigin(origin: string): string {
  return origin.replace(/\/+$/, "");
}

export function recipePath(recipeName: string): string {
  return `/center/recipes/${encodeURIComponent(recipeName)}`;
}

export function recipePathWithVersion(recipeName: string, version: string): string {
  return `${recipePath(recipeName)}?version=${encodeURIComponent(version)}`;
}

export function recipePathFromReference(recipeName: string, version?: string | null): string {
  return version ? recipePathWithVersion(recipeName, version) : recipePath(recipeName);
}

export function recipeAbsoluteUrl(origin: string, recipeName: string, version?: string | null): string {
  return `${normalizedOrigin(origin)}${recipePathFromReference(recipeName, version)}`;
}

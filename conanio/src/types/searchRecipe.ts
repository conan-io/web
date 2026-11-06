/** Search listing row shape from GET /search/{pattern} (Conan Center API). */

export interface SearchPackageBin {
  package_id: string;
  os: string | null;
  arch: string | null;
}

export interface SearchRecipeInfo {
  version: string;
  description: string;
  timestamp: string;
  age: number;
  /** "false" when not deprecated, "true" or a reason/substitute recipe name otherwise. */
  deprecated: string;
  licenses: string[];
  labels: string[];
  packages: Record<string, SearchPackageBin>;
}

export interface SearchRecipeItem {
  name: string;
  info: SearchRecipeInfo;
}

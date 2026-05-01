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
  deprecated?: string;
  licenses: Record<string, number>;
  labels: Record<string, number>;
  packages: Record<string, SearchPackageBin>;
}

export interface SearchRecipeItem {
  name: string;
  info: SearchRecipeInfo;
}

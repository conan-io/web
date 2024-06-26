export interface RecipeBasic {
  name: string;
  version: string;
}

export interface PackageInfo {
  arch: string;
  build_type: string;
  compiler: string;
  compiler_cppstd: string;
  compiler_runtime: string;
  compiler_runtime_type: string;
  compiler_version: string;
  options: { [key: string]: string };
  os: string;
  package_id: string;
  requires: string[];
}

export interface RecipeInfo {
  name: string;
  info: {
    age: number;
    description: string;
    downloads: number;
    homepage: string;
    labels: string[];
    licenses: string[];
    packages?: { [key: string]: PackageInfo };
    recipe_revision?: string;
    status: string;
    timestamp: string;
    version: string;
  };
  use_it?: RecipeUseItContent;
}

interface RecipeUseItContent {
  build_requires: string[];
  components_properties?: any;
  headers: string[];
  package_type: string;
  properties: {
    cmake_find_mode?: string;
    cmake_file_name?: string;
    cmake_target_name?: string;
    pkg_config_name?: string;
  };
  requires: string[];
}

export interface RecipeUseIt {
  recipe_revision: string;
  use_it: RecipeUseItContent;
}

interface DownloadData {
  date: string;
  downloads: number;
}

export type RecipeDownloadsResponse =
  | {
      // Only all key has versions member
      all: {
        downloads: DownloadData[];
        versions: string[];
      };
    }
  | {
      [key: string]: { downloads: DownloadData[] };
    };

export interface ConanFilterResponse {
  id: number;
  filter: string;
}

export interface RecipeReference {
  references: number;
  recipes: number;
}

export type ConanResponse<T> = { [key: string]: T };

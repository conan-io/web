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
    readme?: string;
    recipe_revision?: string;
    status: string;
    timestamp: string;
    use_it?: {
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
    };
    version: string;
  };
}

interface DownloadData {
  date: string;
  downloads: number;
}

export interface RecipeDownloads {
  downloads: DownloadData[];
  versions?: string[]; // Only 'all' key will have versions available
}

export interface ConanFilterResponse {
  id: number;
  filter: string;
}

export interface RecipeReference {
  references: number;
  recipes: number;
}

export type ConanResponse<T> = { [key: string]: T };

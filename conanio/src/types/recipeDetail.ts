import type { ReactNode } from "react";

/** Conan Center recipe package shape used by the UI. */
export interface PackageInfo {
  arch: string;
  build_type: string;
  compiler: string;
  compiler_cppstd: string;
  compiler_runtime: string;
  compiler_runtime_type: string;
  compiler_version: string;
  options: Record<string, string>;
  os: string;
  package_id: string;
  requires: string[];
}

export interface RecipeUseItContent {
  build_requires: string[];
  components_properties?: Record<string, Record<string, string>>;
  headers?: string[];
  package_type?: string;
  properties?: {
    cmake_find_mode?: string;
    cmake_file_name?: string;
    cmake_target_name?: string;
    cmake_module_file_name?: string;
    cmake_module_target_name?: string;
    pkg_config_name?: string;
  };
  requires: string[];
}

export interface RecipeInfo {
  name: string;
  use_it?: RecipeUseItContent;
  info: {
    age: number;
    description: string;
    downloads: number;
    homepage: string;
    labels?: Record<string, number> | string[];
    licenses?: Record<string, number> | string[];
    packages?: Record<string, PackageInfo>;
    recipe_revision?: string;
    status: string;
    timestamp: string;
    version: string;
    deprecated?: string;
  };
}

export interface RecipeUseIt {
  recipe_revision: string;
  use_it: RecipeUseItContent;
}

export interface RecipeDetailSsrProps {
  recipeName: string;
  recipeVersion: string | null;
  packageInfo: Record<string, RecipeInfo>;
  /** Raw markdown from conan-center-index `recipes/<name>/README.md`, when present. */
  readme: string | null;
}

export type RecipeTab = "readme" | "useit" | "packages" | "deps" | "versions" | "audit" | "badges";
export type CodeTab = "conanfile.txt" | "conanfile.py";
export type SecondaryTab = "targets" | "headers";

export type PackageOsTabFilter =
  | "Linux"
  | "Windows"
  | "macOS"
  | "macOS Apple Silicon"
  | "Windows ARM64"
  | "Header Only";

export type PackageOsFilterState = PackageOsTabFilter | null;

export type RecipePageTabBase = {
  isActive: boolean;
  recipeName: string;
  recipeVersion: string;
};

export type RecipeTabProps = RecipePageTabBase & {
  recipe: RecipeInfo;
  onPlatformPick: (filter: PackageOsTabFilter) => void;
};

export type PackagesTabProps = RecipeTabProps & {
  packageOsFilter: PackageOsFilterState;
  onClearPackageOsFilter: () => void;
};

export type UseItTabProps = RecipeTabProps & {
  useItLoading: boolean;
  activeCodeTab: CodeTab;
  onCodeTabChange: (tab: CodeTab) => void;
};

export type DependenciesTabProps = RecipeTabProps & {
  useItLoading: boolean;
};

export type RecipeTabItem = {
  id: RecipeTab;
  label: string;
  icon: ReactNode;
};

export type BadgeSnippetFormat = "markdown" | "rst" | "asciidoc" | "html";

import type {
  PackageInfo,
  PackageOsFilterState,
  PackageOsTabFilter,
  RecipeInfo,
  RecipeTab,
  RecipeUseItContent,
} from "@/types/recipeDetail";

/** License slugs that have a choosealicense.com page. */
export const VALID_CHOOSELICENSE_SLUGS = new Set([
  "0bsd",
  "afl-3.0",
  "agpl-3.0",
  "apache-2.0",
  "artistic-2.0",
  "bsd-2-clause",
  "bsd-3-clause-clear",
  "bsd-3-clause",
  "bsd-4-clause",
  "bsl-1.0",
  "cc-by-4.0",
  "cc-by-sa-4.0",
  "cc0-1.0",
  "cecill-2.1",
  "cern-ohl-p-2.0",
  "cern-ohl-s-2.0",
  "cern-ohl-w-2.0",
  "ecl-2.0",
  "epl-1.0",
  "epl-2.0",
  "eupl-1.1",
  "eupl-1.2",
  "gfdl-1.3",
  "gpl-2.0",
  "gpl-3.0",
  "isc",
  "lgpl-2.1",
  "lgpl-3.0",
  "lppl-1.3c",
  "mit-0",
  "mit",
  "mpl-2.0",
  "ms-pl",
  "ms-rl",
  "mulanpsl-2.0",
  "ncsa",
  "odbl-1.0",
  "ofl-1.1",
  "osl-3.0",
  "postgresql",
  "unlicense",
  "upl-1.0",
  "vim",
  "wtfpl",
  "zlib",
]);

export const DOC_CONSUME_PACKAGES = "https://docs.conan.io/2/tutorial/consuming_packages.html";
export const DOC_TOOLS_AS_PACKAGES =
  "https://docs.conan.io/2/tutorial/consuming_packages/use_tools_as_conan_packages.html";
export const DOC_LIBRARY_CMAKE = "https://docs.conan.io/2/tutorial/consuming_packages/build_simple_cmake_project.html";
export const CCI_QUESTION_NEW_ISSUE =
  "https://github.com/conan-io/conan-center-index/issues/new?labels=question&template=question.yml&title=%5Bquestion%5D%20SHORT%20DESCRIPTION";

export const PROFILE_KEYS = ["Linux-x86_64", "Windows-x86_64", "Macos-x86_64", "Macos-armv8", "Windows-armv8"] as const;

export const PROFILE_KEY_TO_FILTER: Record<(typeof PROFILE_KEYS)[number], PackageOsTabFilter> = {
  "Linux-x86_64": "Linux",
  "Windows-x86_64": "Windows",
  "Macos-x86_64": "macOS",
  "Macos-armv8": "macOS Apple Silicon",
  "Windows-armv8": "Windows ARM64",
};

export function truncateText(text: string, n: number) {
  if (text.length > n) return `${text.slice(0, n - 1)}…`;
  return text;
}

export function urlify(rawUrl: string) {
  if (!/^https?:\/\//i.test(rawUrl)) {
    return `http://${rawUrl}`;
  }
  return rawUrl;
}

/** Display hostname/path without scheme. */
export function sanitizeURL(url: string) {
  const withProto = urlify(url);
  try {
    const u = new URL(withProto);
    return withProto.replace(`${u.protocol}//`, "");
  } catch {
    return url;
  }
}

export function licenseNames(licenses?: Record<string, number> | string[]): string[] {
  if (!licenses) return [];
  if (Array.isArray(licenses)) return licenses;
  return Object.keys(licenses);
}

export function resolveSelectedRecipe(data: Record<string, RecipeInfo>, requestedVersion: string | null): RecipeInfo {
  const entries = Object.values(data);
  if (!entries.length) {
    throw new Error("resolveSelectedRecipe: empty recipe data");
  }
  if (requestedVersion) {
    const found = entries.find((e) => e.info.version === requestedVersion);
    if (found) return found;
  }
  return entries[0];
}

/** Default tab selection: readme first when GitHub README exists; else use_it if `ok`, else Versions. */
export function initialRecipeTab(
  packageInfo: Record<string, RecipeInfo>,
  requestedVersion: string | null,
  readme: string | null,
): RecipeTab {
  if (readme) return "readme";
  try {
    const r = resolveSelectedRecipe(packageInfo, requestedVersion);
    return r.info.status === "ok" ? "useit" : "versions";
  } catch {
    return "useit";
  }
}

export function profileSlotsFromPackages(packages: PackageInfo[]): {
  key: string;
  tabFilter: PackageOsTabFilter;
  label: string;
  available: boolean;
}[] {
  const profileList = packages.map((item) => `${item.os ?? "null"}-${item.arch ?? "null"}`);
  if (profileList.length > 0 && profileList.every((item) => item === "null-null")) {
    return [{ key: "header-only", tabFilter: "Header Only", label: "Header Only", available: true }];
  }
  return PROFILE_KEYS.map((key) => ({
    key,
    tabFilter: PROFILE_KEY_TO_FILTER[key],
    label: PROFILE_KEY_TO_FILTER[key],
    available: profileList.includes(key),
  }));
}

export function filterPackagesByPlatform(packages: PackageInfo[], filter: PackageOsFilterState): PackageInfo[] {
  if (filter == null) return packages;
  if (filter === "Linux") return packages.filter((p) => p.os === "Linux");
  if (filter === "Windows") return packages.filter((p) => p.os === "Windows" && p.arch === "x86_64");
  if (filter === "macOS") return packages.filter((p) => p.os === "Macos" && p.arch === "x86_64");
  if (filter === "macOS Apple Silicon") return packages.filter((p) => p.os === "Macos" && p.arch === "armv8");
  if (filter === "Windows ARM64") return packages.filter((p) => p.os === "Windows" && p.arch === "armv8");
  if (filter === "Header Only") return packages.filter((p) => !p.os && !p.arch);
  return packages;
}

/** Values only (no `os=` prefix), same order: OS, arch, build_type. */
export function primaryProfileTagValues(p: PackageInfo): string[] {
  const out: string[] = [];
  if (p.os) out.push(p.os);
  if (p.arch) out.push(p.arch);
  if (p.build_type) out.push(p.build_type);
  return out;
}

export function packageCompilerSettingRows(p: PackageInfo): { name: string; value: string }[] {
  const rows: { name: string; value: string }[] = [];
  if (p.compiler) rows.push({ name: "compiler", value: String(p.compiler) });
  if (p.compiler_cppstd) rows.push({ name: "compiler.cppstd", value: String(p.compiler_cppstd) });
  if (p.compiler_version) rows.push({ name: "compiler.version", value: String(p.compiler_version) });
  if (p.compiler_runtime) rows.push({ name: "compiler.runtime", value: String(p.compiler_runtime) });
  if (p.compiler_runtime_type) rows.push({ name: "compiler.runtime_type", value: String(p.compiler_runtime_type) });
  return rows;
}

/** Single-line formatter (e.g. logs); prefer `packageCompilerSettingRows` for UI. */
export function formatPackageSettingsCompiler(p: PackageInfo): string {
  return packageCompilerSettingRows(p).map((r) => `${r.name}=${r.value}`).join(", ");
}

/** Sorted `key=value` lines for the packages tab options column. */
export function packageOptionsValueLines(p: PackageInfo): string[] {
  const opts = p.options ?? {};
  const keys = Object.keys(opts).sort((a, b) => a.localeCompare(b));
  if (!keys.length) return ["(none)"];
  return keys.map((k) => `${k}=${opts[k]}`);
}

/** Single-line formatter; prefer `packageOptionsValueLines` for UI. */
export function formatPackageOptionsLine(p: PackageInfo): string {
  const lines = packageOptionsValueLines(p);
  if (lines.length === 1 && lines[0] === "(none)") return "options=(none)";
  return `options=${lines.join(", ")}`;
}

export function sortPackagesForDisplay(packages: PackageInfo[]): PackageInfo[] {
  return [...packages].sort((a, b) => {
    const sa = `${a.os ?? ""}\0${a.arch ?? ""}\0${a.compiler ?? ""}\0${a.package_id ?? ""}`;
    const sb = `${b.os ?? ""}\0${b.arch ?? ""}\0${b.compiler ?? ""}\0${b.package_id ?? ""}`;
    return sa.localeCompare(sb);
  });
}

export function conanfileTxtSnippet(reference: string): string {
  return `[requires]
${reference}
[generators]
CMakeDeps
CMakeToolchain
[layout]
cmake_layout`;
}

export function conanfilePySnippet(reference: string): string {
  return `from conan import ConanFile
from conan.tools.cmake import cmake_layout


class ExampleRecipe(ConanFile):
    settings = "os", "compiler", "build_type", "arch"
    generators = "CMakeDeps", "CMakeToolchain"

    def requirements(self):
        self.requires("${reference}")

    def layout(self):
        cmake_layout(self)`;
}

export function splitCmakeConfigFirst(value: string): string {
  return value.split(" (config),")[0]?.trim() ?? value;
}

type UseItPropsRecord = NonNullable<RecipeUseItContent["properties"]>;

export function buildUseItTargetsModel(
  recipeName: string,
  properties: UseItPropsRecord | undefined,
  components: RecipeUseItContent["components_properties"] | undefined,
) {
  const root = properties ?? ({} as UseItPropsRecord);
  const comps = components ?? {};

  const getCMakePropertyValue = (
    configProperty: "cmake_file_name" | "cmake_target_name",
    moduleProperty: "cmake_module_file_name" | "cmake_module_target_name",
  ): string => {
    const defaultName =
      configProperty === "cmake_target_name" ? `${recipeName}::${recipeName}` : recipeName;
    const name = (root[configProperty] as string | undefined) ?? defaultName;
    const moduleVal = root[moduleProperty] as string | undefined;
    if (root.cmake_find_mode === "module" && moduleVal) {
      return moduleVal;
    }
    if (root.cmake_find_mode === "both" && moduleVal) {
      return `${name} (config), ${moduleVal} (module)`;
    }
    return name;
  };

  const cmakePackageName = getCMakePropertyValue("cmake_file_name", "cmake_module_file_name");
  const cmakeTargetName = getCMakePropertyValue("cmake_target_name", "cmake_module_target_name");
  const pkgConfigName = root.pkg_config_name ? `${root.pkg_config_name}.pc` : `${recipeName}.pc`;

  const componentsTargetNames = Object.keys(comps)
    .filter((c) => comps[c])
    .map((component) => {
      const comp = comps[component] ?? {};
      const nm =
        comp.cmake_target_name && comp.cmake_target_name.length > 0
          ? comp.cmake_target_name
          : `${recipeName}::${component}`;
      return `${component} => ${nm}`;
    });

  const componentsPkgConfigName = Object.keys(comps)
    .filter((c) => comps[c])
    .map((component) => {
      const comp = comps[component] ?? {};
      const base =
        comp.pkg_config_name && comp.pkg_config_name.length > 0
          ? comp.pkg_config_name
          : `${recipeName}-${component}`;
      return `${component} => ${base}.pc`;
    });

  return {
    cmakePackageName,
    cmakeTargetName,
    pkgConfigName,
    componentsTargetNames,
    componentsPkgConfigName,
    findPackageArg: splitCmakeConfigFirst(cmakePackageName),
    linkArg: splitCmakeConfigFirst(cmakeTargetName),
  };
}

/** Split `name/version` into recipe name and version parts. */
export function parseConanRef(ref: string): { name: string; version: string } {
  const normalized = ref.trim();
  const slash = normalized.indexOf("/");
  if (slash === -1) {
    return { name: normalized, version: "" };
  }
  return {
    name: normalized.slice(0, slash),
    version: normalized.slice(slash + 1),
  };
}

export function badgeSnippetStrings(recipeName: string): Record<
  "markdown" | "rst" | "asciidoc" | "html",
  string
> {
  const mdMessage = `[![Conan Center](https://img.shields.io/conan/v/${recipeName})](https://conan.io/center/recipes/${recipeName})`;
  const resMessage = `.. image:: https://img.shields.io/conan/v/${recipeName}   :alt: Conan Center`;
  const asciiMessage = `image:https://img.shields.io/conan/v/${recipeName} [Conan Center]`;
  const htmlMessage = `<img alt="Conan Center" src="https://img.shields.io/conan/v/${recipeName}">`;
  return {
    markdown: mdMessage,
    rst: resMessage,
    asciidoc: asciiMessage,
    html: htmlMessage,
  };
}

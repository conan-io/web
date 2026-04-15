import type { RecipeInfo, RecipeUseItContent } from '@/service';
import { getSiteOrigin, recipeReferencePageUrl } from '@/service';

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

/** Mirrors TargetsInfo / HeadersInfo in recipeTabs.tsx. */
function buildUseItTargetsSummary(
  recipeName: string,
  useIt: RecipeUseItContent
):
  | {
      cmakePackageName: string;
      cmakeTargetName: string;
      pkgConfigName: string;
      componentCmakeTargets: string[];
      componentPkgConfigs: string[];
    }
  | undefined {
  if (!useIt.properties) return undefined;
  const root = useIt.properties as Record<string, string | undefined>;
  if (root.cmake_find_mode === 'none') return undefined;

  /** JSON-LD omits cmake_module_file_name / cmake_module_target_name (config-style names only). */
  const cmakePackageName = String(root.cmake_file_name ?? recipeName);
  const cmakeTargetName = String(root.cmake_target_name ?? `${recipeName}::${recipeName}`);
  const pkgConfigName = root.pkg_config_name ? `${root.pkg_config_name}.pc` : `${recipeName}.pc`;

  const components = useIt.components_properties ?? {};
  const componentCmakeTargets = Object.keys(components)
    .filter((c) => components[c])
    .map((component) => {
      const comp = components[component];
      const name = comp.cmake_target_name ?? `${recipeName}::${component}`;
      return `${component} => ${name}`;
    });
  const componentPkgConfigs = Object.keys(components)
    .filter((c) => components[c])
    .map((component) => {
      const comp = components[component];
      const name = comp.pkg_config_name ?? `${recipeName}-${component}`;
      return `${component} => ${name}.pc`;
    });

  return {
    cmakePackageName,
    cmakeTargetName,
    pkgConfigName,
    componentCmakeTargets,
    componentPkgConfigs,
  };
}

function propertyValue(name: string, value: string): Record<string, unknown> {
  return { '@type': 'PropertyValue', name, value };
}

/** Align with recipe page UI: API often sends the string `'false'` when not deprecated (truthy in JS). */
function deprecationMessage(
  origin: string,
  deprecated: string | undefined
): string | undefined {
  if (deprecated == null || deprecated === 'false') return undefined;
  if (deprecated === 'true') {
    return 'This recipe is marked deprecated on Conan Center.';
  }
  if (!deprecated.includes(' ')) {
    const n = encodeURIComponent(deprecated);
    return `Deprecated; prefer package \`${deprecated}\` (${origin}/center/recipes/${n}).`;
  }
  return deprecated;
}

/** All recipe versions as a single comma-separated list (order follows API / object values). */
function allVersionsCommaSeparated(entries: RecipeInfo[]): string {
  return entries.map((r) => r.info.version).join(', ');
}

function dependencyRefsSummary(origin: string, refs: string[]): string {
  return refs
    .map((req) => {
      const [depName, depVersion] = req.split('/');
      const page = recipeReferencePageUrl(origin, depName, depVersion ?? '');
      return `${req} (${page})`;
    })
    .join(', ');
}

/**
 * JSON-LD (single SoftwareSourceCode object) for LLM consumption: optional dependency lines in
 * additionalProperty, no SEO-only nodes (WebSite, WebPage, breadcrumbs, binary IDs).
 */
export function buildRecipeReferenceJsonLd(
  recipe: RecipeInfo,
  recipeNameFromPath: string,
  allVersions?: Record<string, RecipeInfo>
): Record<string, unknown> {
  const origin = getSiteOrigin();
  const version = recipe.info.version;
  const pageUrl = recipeReferencePageUrl(origin, recipeNameFromPath, version);
  const codeId = `${pageUrl}#recipe`;
  const description = recipe.info.description?.trim() || undefined;
  const licenses = licensesForSchema(recipe.info.licenses);
  const keywords = keywordsFromLabels(recipe.info.labels);
  const githubRepo = `https://github.com/conan-io/conan-center-index/tree/master/recipes/${recipeNameFromPath}`;
  const conanRef = `${recipe.name}/${version}`;

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

  if (recipe.info.timestamp) {
    const iso = /^\d{4}-\d{2}-\d{2}/.test(recipe.info.timestamp)
      ? `${recipe.info.timestamp}T00:00:00.000Z`
      : undefined;
    if (iso) softwareSourceCode.dateModified = iso;
  }

  const additionalProps: Record<string, unknown>[] = [];

  additionalProps.push(propertyValue('Conan package reference', conanRef));
  additionalProps.push(
    propertyValue('Conan 2 CLI (example)', `conan install --requires=${conanRef}`)
  );
  additionalProps.push(
    propertyValue(
      'conanfile.txt (fragment)',
      `[requires]\n${conanRef}`
    )
  );

  const homepage = recipe.info.homepage?.trim();
  if (homepage) {
    additionalProps.push(propertyValue('Upstream project homepage', homepage));
  }

  if (recipe.info.status) {
    additionalProps.push(propertyValue('Recipe status (Conan Center)', recipe.info.status));
  }
  if (recipe.info.recipe_revision) {
    additionalProps.push(propertyValue('Recipe revision (Conan Center)', recipe.info.recipe_revision));
  }
  const deprecation = deprecationMessage(origin, recipe.info.deprecated);
  if (deprecation) {
    additionalProps.push(propertyValue('Deprecation', deprecation));
  }

  const useIt = recipe.use_it;
  if (useIt) {
    const isToolRecipe = useIt.package_type === 'application';
    if (!isToolRecipe) {
      const targets = buildUseItTargetsSummary(recipe.name, useIt);
      if (targets) {
        additionalProps.push(propertyValue('CMake find package name(s)', targets.cmakePackageName));
        additionalProps.push(propertyValue('CMake target name(s)', targets.cmakeTargetName));
        additionalProps.push(propertyValue('pkg-config file name(s)', targets.pkgConfigName));
        if (targets.componentCmakeTargets.length) {
          additionalProps.push(
            propertyValue('Component CMake targets', targets.componentCmakeTargets.join('\n'))
          );
        }
        if (targets.componentPkgConfigs.length) {
          additionalProps.push(
            propertyValue('Component pkg-config files', targets.componentPkgConfigs.join('\n'))
          );
        }
      }
      // Omitted from JSON-LD: listing every include path blows up payload size on large recipes (e.g. ncbi-cxx-toolkit-public).
      // if (useIt.headers?.length) {
      //   const sorted = [...useIt.headers].sort();
      //   additionalProps.push(propertyValue('Public headers (include paths)', sorted.join('\n')));
      // }
    }
  }

  if (allVersions && Object.keys(allVersions).length > 0) {
    const versions = allVersionsCommaSeparated(Object.values(allVersions));
    additionalProps.push(propertyValue('All versions on Conan Center', versions));
  }

  if (useIt?.requires?.length) {
    additionalProps.push(
      propertyValue('Runtime dependencies (requires)', dependencyRefsSummary(origin, useIt.requires))
    );
  }

  if (useIt?.build_requires?.length) {
    additionalProps.push(
      propertyValue('Tool requirements (build_requires)', dependencyRefsSummary(origin, useIt.build_requires))
    );
  }

  softwareSourceCode.additionalProperty = additionalProps;

  return {
    '@context': 'https://schema.org',
    ...softwareSourceCode,
  };
}

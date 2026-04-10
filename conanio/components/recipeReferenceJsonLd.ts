import type { RecipeInfo, RecipeUseItContent } from '@/service';
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

  const getCMakePropertyValue = (configProperty: string, moduleProperty: string): string => {
    const defaultName =
      configProperty === 'cmake_target_name' ? `${recipeName}::${recipeName}` : recipeName;
    const name = root[configProperty] ?? defaultName;
    if (root.cmake_find_mode === 'module' && root[moduleProperty]) {
      return String(root[moduleProperty]);
    }
    if (root.cmake_find_mode === 'both' && root[moduleProperty]) {
      return `${name} (config), ${root[moduleProperty]} (module)`;
    }
    return String(name);
  };

  const cmakePackageName = getCMakePropertyValue('cmake_file_name', 'cmake_module_file_name');
  const cmakeTargetName = getCMakePropertyValue('cmake_target_name', 'cmake_module_target_name');
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

function compactVersionLines(
  origin: string,
  recipeName: string,
  recipeNameFromPath: string,
  entries: RecipeInfo[]
): string {
  return entries
    .map((r) => {
      const v = r.info.version;
      const u = recipePageUrl(origin, recipeNameFromPath, v);
      const meta = [r.info.status && `status ${r.info.status}`, r.info.timestamp && `updated ${r.info.timestamp}`]
        .filter(Boolean)
        .join(', ');
      const head = meta ? `${recipeName}/${v} (${meta})` : `${recipeName}/${v}`;
      return `${head}\n${u}`;
    })
    .join('\n\n');
}

/**
 * JSON-LD @graph optimized for LLM consumption: one primary SoftwareSourceCode node,
 * optional dependency ItemLists, no SEO-only nodes (WebSite, WebPage, breadcrumbs, binary IDs).
 */
export function buildRecipeReferenceJsonLd(
  recipe: RecipeInfo,
  recipeNameFromPath: string,
  allVersions?: Record<string, RecipeInfo>
): Record<string, unknown> {
  const origin = getSiteOrigin();
  const version = recipe.info.version;
  const pageUrl = recipePageUrl(origin, recipeNameFromPath, version);
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
  if (recipe.info.deprecated) {
    additionalProps.push(propertyValue('Deprecation', String(recipe.info.deprecated)));
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
      if (useIt.headers?.length) {
        const sorted = [...useIt.headers].sort();
        additionalProps.push(propertyValue('Public headers (include paths)', sorted.join('\n')));
      }
    }
  }

  if (allVersions && Object.keys(allVersions).length > 0) {
    const lines = compactVersionLines(origin, recipe.name, recipeNameFromPath, Object.values(allVersions));
    additionalProps.push(propertyValue('All versions on Conan Center (name, status, recipe page URL)', lines));
  }

  softwareSourceCode.additionalProperty = additionalProps;

  const graph: Record<string, unknown>[] = [softwareSourceCode];

  if (useIt?.requires?.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#dependencies-requires`,
      name: 'Runtime dependencies (requires)',
      numberOfItems: useIt.requires.length,
      itemListElement: useIt.requires.map((req, i) => {
        const [depName, depVersion] = req.split('/');
        return {
          '@type': 'ListItem',
          position: i + 1,
          name: req,
          item: recipePageUrl(origin, depName, depVersion ?? ''),
        };
      }),
    });
  }

  if (useIt?.build_requires?.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#dependencies-build-requires`,
      name: 'Tool requirements (build_requires)',
      numberOfItems: useIt.build_requires.length,
      itemListElement: useIt.build_requires.map((req, i) => {
        const [depName, depVersion] = req.split('/');
        return {
          '@type': 'ListItem',
          position: i + 1,
          name: req,
          item: recipePageUrl(origin, depName, depVersion ?? ''),
        };
      }),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

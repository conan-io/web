import type { PackageInfo, RecipeInfo, RecipeUseItContent } from '@/service';
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

/** Mirrors TargetsInfo / HeadersInfo in recipeTabs.tsx for JSON-LD and SEO. */
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

function packageSummaryLine(pkg: PackageInfo): string {
  const parts = [pkg.os, pkg.arch, pkg.compiler, pkg.build_type].filter(Boolean);
  if (parts.length) return parts.join(' / ');
  return 'Header-only (no os/arch profile)';
}

function propertyValue(name: string, value: string): Record<string, unknown> {
  return { '@type': 'PropertyValue', name, value };
}

/**
 * JSON-LD @graph for Conan Center recipe reference pages (aligned with /llms.txt URL pattern).
 * Includes use-it targets/headers, packages, dependencies, and all recipe versions when `allVersions` is passed.
 */
export function buildRecipeReferenceJsonLd(
  recipe: RecipeInfo,
  recipeNameFromPath: string,
  allVersions?: Record<string, RecipeInfo>
): Record<string, unknown> {
  const origin = getSiteOrigin();
  const version = recipe.info.version;
  const pageUrl = recipePageUrl(origin, recipeNameFromPath, version);
  const pageId = `${pageUrl}#webpage`;
  const codeId = `${pageUrl}#recipe`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const description = recipe.info.description?.trim() || undefined;
  const licenses = licensesForSchema(recipe.info.licenses);
  const keywords = keywordsFromLabels(recipe.info.labels);
  const githubRepo = `https://github.com/conan-io/conan-center-index/tree/master/recipes/${recipeNameFromPath}`;

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

  const additionalProps: Record<string, unknown>[] = [];
  const aboutRefs: { '@id': string }[] = [];

  const useIt = recipe.use_it;
  if (useIt) {
    const isToolRecipe = useIt.package_type === 'application';
    if (!isToolRecipe) {
      const targets = buildUseItTargetsSummary(recipe.name, useIt);
      if (targets) {
        additionalProps.push(propertyValue('CMake package name(s)', targets.cmakePackageName));
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
    if (useIt.requires?.length) {
      const depsId = `${pageUrl}#dependencies-requires`;
      aboutRefs.push({ '@id': depsId });
    }
    if (useIt.build_requires?.length) {
      const depsId = `${pageUrl}#dependencies-build-requires`;
      aboutRefs.push({ '@id': depsId });
    }
  }

  const pkgs = recipe.info.packages ? Object.values(recipe.info.packages) : [];
  if (pkgs.length) {
    aboutRefs.push({ '@id': `${pageUrl}#binary-packages` });
  }

  if (allVersions && Object.keys(allVersions).length > 0) {
    aboutRefs.push({ '@id': `${pageUrl}#recipe-versions` });
  }

  if (additionalProps.length) {
    softwareSourceCode.additionalProperty = additionalProps;
  }
  if (aboutRefs.length) {
    softwareSourceCode.about = aboutRefs.length === 1 ? aboutRefs[0] : aboutRefs;
  }

  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Conan Center',
        item: `${origin}/center`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${recipe.name}/${version}`,
        item: pageUrl,
      },
    ],
  };

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: `${recipe.name}/${version} | Conan Center`,
    inLanguage: 'en',
    isPartOf: { '@id': `${origin}/#website` },
    breadcrumb: { '@id': breadcrumbId },
    mainEntity: { '@id': codeId },
  };

  if (description) webPage.description = description;
  if (recipe.info.timestamp) {
    const iso = /^\d{4}-\d{2}-\d{2}/.test(recipe.info.timestamp)
      ? `${recipe.info.timestamp}T00:00:00.000Z`
      : undefined;
    if (iso) webPage.dateModified = iso;
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: origin,
      name: 'Conan',
      publisher: {
        '@type': 'Organization',
        name: 'Conan',
        url: origin,
      },
    },
    breadcrumbList,
    softwareSourceCode,
    webPage,
  ];

  if (useIt?.requires?.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#dependencies-requires`,
      name: 'Recipe dependencies (requires)',
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
      name: 'Recipe dependencies (tool requirements / build_requires)',
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

  if (pkgs.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#binary-packages`,
      name: 'Binary packages (Conan package IDs)',
      numberOfItems: pkgs.length,
      itemListElement: pkgs.map((pkg, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: pkg.package_id || `package-${i}`,
        description: packageSummaryLine(pkg),
      })),
    });
  }

  if (allVersions) {
    const versionEntries = Object.values(allVersions);
    if (versionEntries.length) {
      graph.push({
        '@type': 'ItemList',
        '@id': `${pageUrl}#recipe-versions`,
        name: 'Published recipe versions',
        numberOfItems: versionEntries.length,
        itemListElement: versionEntries.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${recipe.name}/${r.info.version}`,
          item: recipePageUrl(origin, recipeNameFromPath, r.info.version),
          description: [
            r.info.status && `status: ${r.info.status}`,
            r.info.timestamp && `updated: ${r.info.timestamp}`,
            r.info.recipe_revision && `recipe revision: ${r.info.recipe_revision}`,
          ]
            .filter(Boolean)
            .join('; '),
        })),
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

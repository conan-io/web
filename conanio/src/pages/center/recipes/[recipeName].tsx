import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import MainNav from "@/components/MainNav";
import RecipeQuerySearchForm from "@/components/RecipeQuerySearchForm";
import MainFooter from "@/components/MainFooter";
import PageHead from "@/components/PageHead";
import AuditTab from "@/components/recipeDetail/AuditTab";
import BadgesTab from "@/components/recipeDetail/BadgesTab";
import DependenciesTab from "@/components/recipeDetail/DependenciesTab";
import PackagesTab from "@/components/recipeDetail/PackagesTab";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import RecipeMainTabs from "@/components/recipeDetail/RecipeMainTabs";
import { clipboardCopyIconSvg } from "@/components/recipeDetail/recipeDetailIcons";
import UseItTab from "@/components/recipeDetail/UseItTab";
import ReadmeTab from "@/components/recipeDetail/ReadmeTab";
import VersionsTab from "@/components/recipeDetail/VersionsTab";
import styles from "@/styles/centerPages.module.css";
import type {
  CodeTab,
  PackageOsTabFilter,
  RecipeDetailSsrProps,
  RecipeInfo,
  RecipeTab,
  RecipeUseIt,
} from "@/types/recipeDetail";
import { getJson, getUrls } from "@/service/api";
import { trackConanEvent } from "@/service/analytics";
import { initialRecipeTab, resolveSelectedRecipe } from "@/utils/recipeDetailUtils";
import { recipePathWithVersion } from "@/utils/recipeUrls";

function recipeDescriptionFallback(recipeName: string) {
  return (
    <>
      It has not been possible to load this information. Please, check if{" "}
      <a
        href={`https://github.com/conan-io/conan-center-index/tree/master/recipes/${encodeURIComponent(recipeName)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        this recipe version
      </a>{" "}
      is compatible with Conan v2.x.
    </>
  );
}

export const getServerSideProps: GetServerSideProps<RecipeDetailSsrProps> = async (context) => {
  const raw = context.params?.recipeName;
  const recipeName = typeof raw === "string" ? raw : null;
  if (!recipeName) {
    return { notFound: true };
  }

  const versionQuery = context.query.version;
  const recipeVersion =
    typeof versionQuery === "string" ? decodeURIComponent(versionQuery) : null;

  const urls = getUrls({ packageId: recipeName });
  const packageRes = await getJson<Record<string, RecipeInfo>>(urls.package!.info, urls.api.private);

  if (packageRes.status === 404) {
    return { notFound: true };
  }
  if (!packageRes.data || typeof packageRes.data !== "object" || Object.keys(packageRes.data).length === 0) {
    return { notFound: true };
  }

  const packageInfo = packageRes.data as Record<string, RecipeInfo>;

  const readmeUrl = `https://raw.githubusercontent.com/conan-io/conan-center-index/master/recipes/${encodeURIComponent(recipeName)}/README.md`;
  let readme: string | null = null;
  try {
    const readmeRes = await fetch(readmeUrl);
    if (readmeRes.ok) {
      readme = await readmeRes.text();
    }
  } catch {
    /* Ignore README fetch errors and keep rendering the page. */
  }

  return {
    props: {
      recipeName,
      recipeVersion,
      packageInfo,
      readme,
    },
  };
};

function RecipeDetailPage({
  recipeName,
  recipeVersion: recipeVersionQuery,
  packageInfo,
  readme,
}: RecipeDetailSsrProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RecipeTab>(() =>
    initialRecipeTab(packageInfo, recipeVersionQuery, readme),
  );
  const [packageOsFilter, setPackageOsFilter] = useState<PackageOsTabFilter | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>("conanfile.py");
  const [useItByVersion, setUseItByVersion] = useState<Record<string, RecipeUseIt>>({});
  const [useItLoading, setUseItLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const urls = getUrls({ packageId: recipeName });
    if (!urls.package) {
      return () => {
        cancelled = true;
      };
    }

    void (async () => {
      setUseItByVersion({});
      setUseItLoading(true);
      try {
        const res = await getJson<Record<string, RecipeUseIt>>(urls.package!.useIt, urls.api.public);
        if (!cancelled && res.status === 200 && res.data && typeof res.data === "object") {
          setUseItByVersion(res.data as Record<string, RecipeUseIt>);
        }
      } finally {
        if (!cancelled) {
          setUseItLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [recipeName]);

  const pickPlatform = (filter: PackageOsTabFilter) => {
    setActiveTab("packages");
    setPackageOsFilter(filter);
  };

  const handleMainTabChange = (tab: RecipeTab) => {
    setActiveTab(tab);
    setPackageOsFilter(null);
  };

  const selectRecipeVersion = (version: string) => {
    const path = recipePathWithVersion(recipeName, version);
    void router.push(path);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  const selected = useMemo(
    () => resolveSelectedRecipe(packageInfo, recipeVersionQuery),
    [packageInfo, recipeVersionQuery],
  );

  const recipe = useMemo(() => {
    const row = useItByVersion[selected.info.version];
    return row ? { ...selected, use_it: row.use_it } : selected;
  }, [selected, useItByVersion]);

  const recipeVersion = selected.info.version;

  const labelChips = useMemo(() => {
    const labels = selected.info.labels;
    if (!labels) return [];
    if (Array.isArray(labels)) return labels;
    return Object.keys(labels);
  }, [selected.info.labels]);

  const screenLabel = `ConanCenter — ${recipe.name}/${recipe.info.version} recipe`;

  const recipeStatus = recipe.info.status;
  const statusSummary = recipeStatus === "ok" ? "maintained version" : `${recipeStatus} version`;
  const recipeReference = `${recipe.name}/${recipe.info.version}`;
  const trackCenterSearch = (term: string) => {
    trackConanEvent({
      event_name: "search",
      type: "ui",
      purpose: "conancenter search",
      description: "search recipes",
      search_term: term,
    });
  };

  return (
    <>
      <PageHead title={`ConanCenter — ${recipe.name}/${recipe.info.version}`} />

      <main id="page" className={styles.centerRecipe} data-screen-label={screenLabel}>
        <MainNav />
        <div className="searchwrap">
          <RecipeQuerySearchForm
            mode="get"
            formClassName="search"
            role="search"
            aria-label="Search recipes"
            autoComplete="off"
            enterKeyHint="search"
            onTrackSearchSubmit={trackCenterSearch}
          />
        </div>
        <div className="pkg-head">
          <div className="card">
            <h1>
              {recipe.name}/{recipe.info.version}
              {recipeStatus === "unmaintained" ? (
                <span className="pkg-status-warn" title={statusSummary} aria-label={statusSummary} role="img">
                  <span className="status-warn-mark">!</span>
                </span>
              ) : null}{" "}
              <CopyToClipboardButton
                copyText={recipeReference}
                className="recipe-revision-row__copy pkg-head-copy-ref"
                aria-label={`Copy recipe reference ${recipeReference}`}
              >
                {clipboardCopyIconSvg}
              </CopyToClipboardButton>
            </h1>
            {recipe.info.description?.trim() ? <p>{recipe.info.description}</p> : null}
            {!recipe.info.description?.trim() ? (
              <p role="status" className="desc" style={{ marginTop: 8 }}>
                {recipeDescriptionFallback(recipe.name)}
              </p>
            ) : null}
            <div className="chips">
              {labelChips.map((tag) => (
                <span key={tag} className="chip">
                  #{tag}
                </span>
              ))}
              {recipeStatus !== "ok" ? (
                <span className="chip chip-warn" title={statusSummary}>
                  <span className="status-warn-mark status-warn-mark--sm" aria-hidden>
                    !
                  </span>{" "}
                  {recipeStatus}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <RecipeMainTabs activeTab={activeTab} onTabChange={handleMainTabChange} readme={readme} />
        <div className="body">
          {readme ? (
            <ReadmeTab
              key={`readme-${recipeName}`}
              isActive={activeTab === "readme"}
              readme={readme}
              recipe={recipe}
              recipeName={recipeName}
              onPlatformPick={pickPlatform}
            />
          ) : null}
          <UseItTab
            key={`${recipeName}-${recipeVersion}`}
            isActive={activeTab === "useit"}
            recipeName={recipeName}
            recipeVersion={recipeVersion}
            recipe={recipe}
            onPlatformPick={pickPlatform}
            useItLoading={useItLoading}
            activeCodeTab={activeCodeTab}
            onCodeTabChange={setActiveCodeTab}
          />
          <PackagesTab
            isActive={activeTab === "packages"}
            recipeName={recipeName}
            recipeVersion={recipeVersion}
            recipe={recipe}
            onPlatformPick={pickPlatform}
            packageOsFilter={packageOsFilter}
            onClearPackageOsFilter={() => setPackageOsFilter(null)}
          />
          <DependenciesTab
            isActive={activeTab === "deps"}
            recipeName={recipeName}
            recipeVersion={recipeVersion}
            recipe={recipe}
            onPlatformPick={pickPlatform}
            useItLoading={useItLoading}
          />
          <VersionsTab
            isActive={activeTab === "versions"}
            recipeName={recipeName}
            recipeVersion={recipeVersion}
            packageInfo={packageInfo}
            onSelectVersion={selectRecipeVersion}
          />
          <AuditTab isActive={activeTab === "audit"} recipeName={recipeName} recipeVersion={recipeVersion} />
          <BadgesTab isActive={activeTab === "badges"} recipeName={recipeName} recipeVersion={recipeVersion} />
        </div>
        <MainFooter />
      </main>
    </>
  );
}

// When moving between recipe URLs, Next may reuse the same page component instance.
// key={recipeName} remounts `RecipeDetailPage` so all hook state (active tab, OS filter,
// use-it fetch cache, etc.) resets instead of leaking from the previous recipe.
export default function CenterRecipePage(props: RecipeDetailSsrProps) {
  return <RecipeDetailPage key={props.recipeName} {...props} />;
}

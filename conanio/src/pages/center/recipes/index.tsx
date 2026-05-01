import MainNav from "../../../components/MainNav";
import MainFooter from "../../../components/MainFooter";
import PageHead from "../../../components/PageHead";
import RecipeSearchCard from "@/components/RecipeSearchCard";
import styles from "../../../styles/centerPages.module.css";
import type { FilterItem } from "@/types/conanCenter";
import type { SearchRecipeItem } from "@/types/searchRecipe";
import { getJson, getUrls } from "@/service/api";
import {
  normalizeFilterList,
  PLATFORM_OPTIONS,
  queryParamToArray,
  SortBy,
  SORT_OPTIONS,
} from "@/utils/centerRecipesConfig";
import { useCenterRecipesSearch } from "@/hooks/useCenterRecipesSearch";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface PageProps {
  data: {
    licenses: FilterItem[];
    topics: FilterItem[];
    value: string;
    selectedTopicIds: number[];
    selectedLicenseIds: number[];
    selectedPlatforms: string[];
    sortBy: SortBy;
  };
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const urls = getUrls();
  const valueParam = context.query.value;
  const value = Array.isArray(valueParam) ? (valueParam[0] ?? "") : (valueParam ?? "");
  const selectedTopicIds = queryParamToArray(context.query.topics)
    .map((item) => parseInt(item, 10))
    .filter((item) => Number.isFinite(item));
  const selectedLicenseIds = queryParamToArray(context.query.licenses)
    .map((item) => parseInt(item, 10))
    .filter((item) => Number.isFinite(item));
  const selectedPlatformsRaw = queryParamToArray(context.query.platforms);
  const selectedPlatforms =
    selectedPlatformsRaw.length > 0
      ? PLATFORM_OPTIONS.filter((platform) => selectedPlatformsRaw.includes(platform))
      : [...PLATFORM_OPTIONS];
  const sortByQuery = context.query.sortBy;
  const sortByRaw = Array.isArray(sortByQuery) ? sortByQuery[0] : sortByQuery;
  const sortBy =
    sortByRaw && Object.values(SortBy).includes(sortByRaw as SortBy)
      ? (sortByRaw as SortBy)
      : SortBy.BestMatch;

  const [licensesResponse, topicsResponse] = await Promise.all([
    getJson<Record<string, FilterItem> | FilterItem[]>(urls.licenses, urls.api.private),
    getJson<Record<string, FilterItem> | FilterItem[]>(urls.topics, urls.api.private),
  ]);

  const licenses = normalizeFilterList(licensesResponse.data);
  const topics = normalizeFilterList(topicsResponse.data);

  return {
    props: {
      data: {
        licenses,
        topics,
        value,
        selectedTopicIds,
        selectedLicenseIds,
        selectedPlatforms,
        sortBy,
      },
    },
  };
};

export default function CenterRecipesPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    sortFilterRef,
    licensesFilterRef,
    topicsFilterRef,
    ...search
  } = useCenterRecipesSearch(data);

  const renderRecipeList = (items: SearchRecipeItem[] | null) =>
    items?.map((recipe) => <RecipeSearchCard key={`${recipe.name}-${recipe.info.version}`} recipe={recipe} />) ?? null;

  return (
    <>
      <PageHead title={"ConanCenter — Recipes"} />

      <main
        id="page"
        className={styles.centerRecipes}
        data-screen-label="ConanCenter — Recipes search (Minimal)"
        data-search-count={search.visibleSearchPackages?.length ?? 0}
        data-search-loading={search.searchLoading ? "1" : "0"}
        data-search-error={search.searchError ?? ""}
      >
        <MainNav />
        <div className="searchwrap">
          <div className="search-row">
            <form className="search" onSubmit={search.handleSubmit}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={11} cy={11} r={7} />
                <line x1={21} y1={21} x2="16.65" y2="16.65" />
              </svg>
              <input type="text" name="value" value={search.textSearchBar} onChange={(event) => search.handleChange(event.target.value)} />
            </form>
            <div className="filter-wrap" ref={sortFilterRef}>
              <button type="button" className="filter-pill" onClick={() => search.setSortOpen(!search.sortOpen)}>
                <span className="label">{search.selectedSortOption.label}</span>
                <span className="caret">▾</span>
              </button>
              {search.sortOpen && (
                <div className="filter-menu sort-menu">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`filter-option sort-option ${search.sortBy === option.value ? "active" : ""}`}
                      onClick={() => search.handleSortByChange(option.value)}
                    >
                      <span className="sort-option-text">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="filters-row">
            <div className="filter-wrap" ref={licensesFilterRef}>
              <button type="button" className="filter-pill" onClick={() => search.setLicensesOpen(!search.licensesOpen)}>
                <span className="label">Licenses ({search.selectedLicenseIds.length})</span>
                <span className="caret">▾</span>
              </button>
              {search.licensesOpen && (
                <div className="filter-menu">
                  {data.licenses.map((license) => (
                    <label key={license.id} className="filter-option">
                      <input
                        type="checkbox"
                        checked={search.selectedLicenseIds.includes(license.id)}
                        onChange={() =>
                          search.toggleSelection(
                            license.id,
                            search.selectedLicenseIds,
                            search.setSelectedLicenseIds,
                            search.selectedTopicIds,
                            search.selectedPlatforms,
                            false,
                          )
                        }
                      />
                      <span>{license.filter}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="filter-wrap" ref={topicsFilterRef}>
              <button type="button" className="filter-pill" onClick={() => search.setTopicsOpen(!search.topicsOpen)}>
                <span className="label">Topics ({search.selectedTopicIds.length})</span>
                <span className="caret">▾</span>
              </button>
              {search.topicsOpen && (
                <div className="filter-menu">
                  {data.topics.map((topic) => (
                    <label key={topic.id} className="filter-option">
                      <input
                        type="checkbox"
                        checked={search.selectedTopicIds.includes(topic.id)}
                        onChange={() =>
                          search.toggleSelection(
                            topic.id,
                            search.selectedTopicIds,
                            search.setSelectedTopicIds,
                            search.selectedLicenseIds,
                            search.selectedPlatforms,
                            true,
                          )
                        }
                      />
                      <span>{topic.filter}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="quick-tags">
            {PLATFORM_OPTIONS.map((platform) => (
              <button
                key={platform}
                type="button"
                className={`qtag ${search.selectedPlatforms.includes(platform) ? "on" : ""}`}
                onClick={() => search.togglePlatform(platform)}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
        <div className="results-head">
          <h1>
            Recipes{" "}
            <span className="count">
              ({search.searchLoading && search.visibleSearchPackages === null ? "…" : (search.visibleSearchPackages?.length ?? 0)})
            </span>
          </h1>
        </div>
        <section className="cards">
          {search.searchError ? (
            <p className="desc" style={{ textAlign: "center", margin: 0 }}>
              {search.searchError}
            </p>
          ) : null}
          {search.searchLoading && search.searchPackages === null ? (
            <p className="desc" style={{ textAlign: "center", margin: 0 }}>
              Loading…
            </p>
          ) : null}
          {!search.searchError && search.visibleSearchPackages !== null && search.visibleSearchPackages.length === 0 ? (
            <p className="desc" style={{ textAlign: "center", margin: 0 }}>
              No recipes found.
            </p>
          ) : null}
          {!search.showAll && search.totalPages > 1 ? (
            <div className="pagination-wrap top">
              <button type="button" onClick={() => search.setPageNumber(1)} disabled={search.pageNumber === 1}>
                First
              </button>
              <button type="button" onClick={() => search.setPageNumber((prev) => Math.max(1, prev - 1))} disabled={search.pageNumber === 1}>
                Prev
              </button>
              {search.pageButtonNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  className={number === search.pageNumber ? "active" : ""}
                  onClick={() => search.setPageNumber(number)}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                onClick={() => search.setPageNumber((prev) => Math.min(search.totalPages, prev + 1))}
                disabled={search.pageNumber === search.totalPages}
              >
                Next
              </button>
              <button type="button" onClick={() => search.setPageNumber(search.totalPages)} disabled={search.pageNumber === search.totalPages}>
                Last
              </button>
              <button type="button" onClick={() => search.setShowAll(true)}>
                Show All
              </button>
            </div>
          ) : null}
          {search.showAll && search.totalPages > 1 ? (
            <div className="pagination-wrap top">
              <button type="button" onClick={() => search.setShowAll(false)}>
                Show Less
              </button>
            </div>
          ) : null}
          {renderRecipeList(search.paginatedSearchPackages)}
          {!search.showAll && search.totalPages > 1 ? (
            <div className="pagination-wrap bottom">
              <button type="button" onClick={() => search.setPageNumber(1)} disabled={search.pageNumber === 1}>
                First
              </button>
              <button type="button" onClick={() => search.setPageNumber((prev) => Math.max(1, prev - 1))} disabled={search.pageNumber === 1}>
                Prev
              </button>
              {search.pageButtonNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  className={number === search.pageNumber ? "active" : ""}
                  onClick={() => search.setPageNumber(number)}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                onClick={() => search.setPageNumber((prev) => Math.min(search.totalPages, prev + 1))}
                disabled={search.pageNumber === search.totalPages}
              >
                Next
              </button>
              <button type="button" onClick={() => search.setPageNumber(search.totalPages)} disabled={search.pageNumber === search.totalPages}>
                Last
              </button>
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Top
              </button>
            </div>
          ) : null}
        </section>
        <MainFooter />
      </main>
    </>
  );
}

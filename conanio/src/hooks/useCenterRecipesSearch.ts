import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

import type { FilterItem } from "@/types/conanCenter";
import type { SearchRecipeItem } from "@/types/searchRecipe";
import { getJsonList, getUrls } from "@/service/api";
import {
  MAX_PAGE_BUTTONS,
  PAGE_SIZE,
  PLATFORM_OPTIONS,
  SortBy,
  SORT_OPTIONS,
} from "@/utils/centerRecipesConfig";

export type CenterRecipesInitialData = {
  licenses: FilterItem[];
  topics: FilterItem[];
  value: string;
  selectedTopicIds: number[];
  selectedLicenseIds: number[];
  selectedPlatforms: string[];
  sortBy: SortBy;
};

function pushCenterSearchEvent(term: string) {
  if (typeof window === "undefined") return;
  const dataLayer = (window as typeof window & { dataLayer?: unknown[] }).dataLayer;
  if (!Array.isArray(dataLayer)) return;
  dataLayer.push({
    event: "fireEvent",
    event_name: "search",
    type: "ui",
    purpose: "conancenter search",
    description: "search recipes",
    search_term: term,
  });
}

export function useCenterRecipesSearch(data: CenterRecipesInitialData) {
  const [textSearchBar, setTextSearchBar] = useState<string>(data.value);
  const [value, setValue] = useState<string>(data.value);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(data.selectedPlatforms);
  const [sortBy, setSortBy] = useState<SortBy>(data.sortBy);
  const [selectedLicenseIds, setSelectedLicenseIds] = useState<number[]>(data.selectedLicenseIds);
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>(data.selectedTopicIds);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [licensesOpen, setLicensesOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [searchPackages, setSearchPackages] = useState<SearchRecipeItem[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const sortFilterRef = useRef<HTMLDivElement | null>(null);
  const licensesFilterRef = useRef<HTMLDivElement | null>(null);
  const topicsFilterRef = useRef<HTMLDivElement | null>(null);

  const syncStateFromUrl = () => {
    if (typeof window === "undefined") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const nextValue = params.get("value") ?? "";
    const nextTopicIds = (params.get("topics") ?? "")
      .split(",")
      .filter(Boolean)
      .map((item) => parseInt(item, 10))
      .filter((item) => Number.isFinite(item));
    const nextLicenseIds = (params.get("licenses") ?? "")
      .split(",")
      .filter(Boolean)
      .map((item) => parseInt(item, 10))
      .filter((item) => Number.isFinite(item));
    const nextPlatformsRaw = (params.get("platforms") ?? "").split(",").filter(Boolean);
    const nextPlatforms =
      nextPlatformsRaw.length > 0
        ? PLATFORM_OPTIONS.filter((platform) => nextPlatformsRaw.includes(platform))
        : [...PLATFORM_OPTIONS];
    const nextSortRaw = params.get("sortBy");
    const nextSortBy =
      nextSortRaw && Object.values(SortBy).includes(nextSortRaw as SortBy)
        ? (nextSortRaw as SortBy)
        : SortBy.BestMatch;

    setTextSearchBar(nextValue);
    setValue(nextValue);
    setSelectedTopicIds(nextTopicIds);
    setSelectedLicenseIds(nextLicenseIds);
    setSelectedPlatforms(nextPlatforms);
    setSortBy(nextSortBy);
  };

  const getData = (
    nextValue: string,
    topicIds: number[],
    licenseIds: number[],
    platforms: string[],
    sortByValue: SortBy,
    historyMode: "replace" | "push" = "replace",
  ) => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams();
    if (nextValue.trim().length > 0) {
      params.set("value", nextValue);
    }
    if (topicIds.length > 0) {
      params.set("topics", topicIds.join(","));
    }
    if (licenseIds.length > 0) {
      params.set("licenses", licenseIds.join(","));
    }
    if (platforms.length > 0 && platforms.length < PLATFORM_OPTIONS.length) {
      params.set("platforms", platforms.join(","));
    }
    if (sortByValue !== SortBy.BestMatch) {
      params.set("sortBy", sortByValue);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    if (historyMode === "push") {
      window.history.pushState(window.history.state, "", nextUrl);
    } else {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  };

  const handleChange = (nextText: string) => {
    setTextSearchBar(nextText);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      setValue(nextText);
      getData(
        nextText,
        selectedTopicIds,
        selectedLicenseIds,
        selectedPlatforms,
        sortBy,
        "replace",
      );
    }, 500);
    setTimer(newTimer);
  };

  const toggleSelection = (
    id: number,
    current: number[],
    setCurrent: (next: number[]) => void,
    otherIds: number[],
    platforms: string[],
    isTopic: boolean,
  ) => {
    const nextSelection = current.includes(id)
      ? current.filter((itemId) => itemId !== id)
      : [...current, id];
    setCurrent(nextSelection);
    getData(
      value,
      isTopic ? nextSelection : otherIds,
      isTopic ? otherIds : nextSelection,
      platforms,
      sortBy,
      "push",
    );
  };

  const togglePlatform = (platform: string) => {
    const nextPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((item) => item !== platform)
      : [...selectedPlatforms, platform];
    setSelectedPlatforms(nextPlatforms);
    getData(value, selectedTopicIds, selectedLicenseIds, nextPlatforms, sortBy, "push");
  };

  const hasFacetFiltersToClear = useMemo(
    () =>
      selectedLicenseIds.length > 0 ||
      selectedTopicIds.length > 0 ||
      selectedPlatforms.length < PLATFORM_OPTIONS.length,
    [selectedLicenseIds, selectedTopicIds, selectedPlatforms],
  );

  const clearFacetFilters = () => {
    const nextPlatforms = [...PLATFORM_OPTIONS];
    setSelectedLicenseIds([]);
    setSelectedTopicIds([]);
    setSelectedPlatforms(nextPlatforms);
    setLicensesOpen(false);
    setTopicsOpen(false);
    getData(value, [], [], nextPlatforms, sortBy, "push");
  };

  const handleSortByChange = (nextSortBy: SortBy) => {
    setSortBy(nextSortBy);
    getData(value, selectedTopicIds, selectedLicenseIds, selectedPlatforms, nextSortBy, "push");
    setSortOpen(false);
  };

  const selectedSortOption = SORT_OPTIONS.find((option) => option.value === sortBy) ?? SORT_OPTIONS[0];

  useEffect(() => {
    let cancelled = false;
    const pattern = value.trim() || "all";
    void (async () => {
      setSearchLoading(true);
      setSearchError(null);
      try {
        const searchUrls = getUrls({
          pattern,
          topics: selectedTopicIds,
          licenses: selectedLicenseIds,
        });
        const packagesResponse = await getJsonList<SearchRecipeItem>(
          searchUrls.search.package,
          searchUrls.api.public,
        );
        if (!cancelled) {
          setSearchPackages(packagesResponse.data);
        }
      } catch (err) {
        if (!cancelled) {
          setSearchError(err instanceof Error ? err.message : String(err));
          setSearchPackages(null);
        }
      } finally {
        if (!cancelled) {
          setSearchLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [value, selectedTopicIds, selectedLicenseIds]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    pushCenterSearchEvent(textSearchBar.trim());
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setValue(textSearchBar);
    getData(
      textSearchBar,
      selectedTopicIds,
      selectedLicenseIds,
      selectedPlatforms,
      sortBy,
      "push",
    );
  };

  useEffect(() => {
    const onPopState = () => {
      syncStateFromUrl();
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (sortFilterRef.current && !sortFilterRef.current.contains(target)) {
        setSortOpen(false);
      }
      if (licensesFilterRef.current && !licensesFilterRef.current.contains(target)) {
        setLicensesOpen(false);
      }
      if (topicsFilterRef.current && !topicsFilterRef.current.contains(target)) {
        setTopicsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, []);

  const matchesSelectedPlatforms = (recipe: SearchRecipeItem): boolean => {
    if (selectedPlatforms.length === PLATFORM_OPTIONS.length) {
      return true;
    }
    const rawPackages = Object.values(recipe.info.packages);
    if (rawPackages.length === 0) {
      return false;
    }
    const packagePlatforms = new Set<string>();
    for (const pkg of rawPackages) {
      if (pkg.os && pkg.arch) {
        if (pkg.os === "Windows" && pkg.arch === "x86_64") packagePlatforms.add("Windows");
        if (pkg.os === "Linux" && pkg.arch === "x86_64") packagePlatforms.add("Linux");
        if (pkg.os === "Macos" && pkg.arch === "x86_64") packagePlatforms.add("macOS");
        if (pkg.os === "Macos" && pkg.arch === "armv8") packagePlatforms.add("macOS Apple Silicon");
        if (pkg.os === "Windows" && pkg.arch === "armv8") packagePlatforms.add("Windows ARM64");
      }
    }
    return selectedPlatforms.some((platform) => packagePlatforms.has(platform));
  };

  const sortByName = (a: SearchRecipeItem, b: SearchRecipeItem): number =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" });

  const sortByDate = (a: SearchRecipeItem, b: SearchRecipeItem): number => {
    const aTime = Date.parse(a.info.timestamp);
    const bTime = Date.parse(b.info.timestamp);
    if (!Number.isFinite(aTime) && !Number.isFinite(bTime)) return sortByName(a, b);
    if (!Number.isFinite(aTime)) return 1;
    if (!Number.isFinite(bTime)) return -1;
    return bTime - aTime;
  };

  const sortByBestMatch = (a: SearchRecipeItem, b: SearchRecipeItem): number => {
    const tokens = value
      .split(" ")
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean);
    const query = value.trim().toLowerCase();

    const matchScore = (item: SearchRecipeItem): number => {
      let score = 0;
      const itemName = item.name.toLowerCase();
      const description = item.info.description?.toLowerCase() ?? "";
      const labels = Object.keys(item.info.labels);
      if (query.length > 0 && itemName === query) score += 9000;
      for (const token of tokens) {
        if (itemName === token) score += 8000;
        if (itemName.includes(token)) score += 1000;
        if (description.includes(token)) score += 1000;
        if (token.startsWith("#")) {
          const topicToken = token.slice(1);
          labels.forEach((label) => {
            if (label.toLowerCase().includes(topicToken)) score += 1000;
          });
        } else {
          labels.forEach((label) => {
            const lower = label.toLowerCase();
            if (label === token || lower.includes(token)) score += 3000;
          });
        }
      }
      return score;
    };

    const scoreA = matchScore(a);
    const scoreB = matchScore(b);
    if (scoreA === scoreB) return sortByName(a, b);
    return scoreB - scoreA;
  };

  const visibleSearchPackages = useMemo(() => {
    if (!searchPackages) {
      return null;
    }
    const filtered = searchPackages.filter(matchesSelectedPlatforms);
    return filtered.sort((a, b) => {
      if (sortBy === SortBy.Name) return sortByName(a, b);
      if (sortBy === SortBy.Date) return sortByDate(a, b);
      if (value.trim().length > 0) return sortByBestMatch(a, b);
      return sortByName(a, b);
    });
    // matchesSelectedPlatforms, sortBy* helpers close over value/sortBy/searchPackages
    // eslint-disable-next-line react-hooks/exhaustive-deps -- same behavior as pre-refactor list page
  }, [searchPackages, selectedPlatforms, sortBy, value]);

  const totalPages = visibleSearchPackages ? Math.ceil(visibleSearchPackages.length / PAGE_SIZE) : 0;
  const safePageNumber = Math.min(pageNumber, Math.max(totalPages, 1));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset pagination when search filters change
    setPageNumber(1);
    setShowAll(false);
  }, [value, selectedTopicIds, selectedLicenseIds, selectedPlatforms, sortBy]);

  useEffect(() => {
    if (totalPages > 0 && pageNumber > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clamp page when result set shrinks
      setPageNumber(totalPages);
    }
  }, [pageNumber, totalPages]);

  const paginatedSearchPackages = useMemo(() => {
    if (!visibleSearchPackages) {
      return null;
    }
    if (showAll || totalPages <= 1) {
      return visibleSearchPackages;
    }
    const start = (safePageNumber - 1) * PAGE_SIZE;
    return visibleSearchPackages.slice(start, start + PAGE_SIZE);
  }, [safePageNumber, showAll, totalPages, visibleSearchPackages]);

  let pageButtonStart = Math.max(1, safePageNumber - 4);
  let pageButtonEnd = pageButtonStart + MAX_PAGE_BUTTONS - 1;
  if (pageButtonEnd > totalPages) {
    pageButtonEnd = totalPages;
    pageButtonStart = Math.max(1, pageButtonEnd - MAX_PAGE_BUTTONS + 1);
  }
  const pageButtonNumbers =
    totalPages > 0
      ? Array.from({ length: pageButtonEnd - pageButtonStart + 1 }, (_, index) => pageButtonStart + index)
      : [];

  return {
    data,
    textSearchBar,
    value,
    selectedPlatforms,
    sortBy,
    selectedLicenseIds,
    selectedTopicIds,
    licensesOpen,
    topicsOpen,
    sortOpen,
    searchPackages,
    searchLoading,
    searchError,
    pageNumber: safePageNumber,
    showAll,
    sortFilterRef,
    licensesFilterRef,
    topicsFilterRef,
    selectedSortOption,
    visibleSearchPackages,
    totalPages,
    paginatedSearchPackages,
    pageButtonNumbers,
    setLicensesOpen,
    setTopicsOpen,
    setSortOpen,
    setPageNumber,
    setShowAll,
    handleChange,
    handleSubmit,
    handleSortByChange,
    toggleSelection,
    togglePlatform,
    setSelectedLicenseIds,
    setSelectedTopicIds,
    hasFacetFiltersToClear,
    clearFacetFilters,
  };
}

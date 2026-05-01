import type { FilterItem } from "@/types/conanCenter";

export enum SortBy {
  Name = "sortByName",
  Date = "sortByDate",
  BestMatch = "sortByBestMatch",
}

export const PLATFORM_OPTIONS = [
  "Linux",
  "Windows",
  "macOS",
  "macOS Apple Silicon",
  "Windows ARM64",
] as const;

export const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: SortBy.BestMatch, label: "sort by best match" },
  { value: SortBy.Name, label: "sort by name" },
  { value: SortBy.Date, label: "sort by date" },
];

export const PAGE_SIZE = 100;
export const MAX_PAGE_BUTTONS = 10;

export const queryParamToArray = (param: string | string[] | undefined): string[] => {
  if (Array.isArray(param)) {
    return param.flatMap((item) => item.split(",")).filter(Boolean);
  }
  if (typeof param === "string" && param.length > 0) {
    return param.split(",").filter(Boolean);
  }
  return [];
};

export function normalizeFilterList(payload: unknown): FilterItem[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const items = Array.isArray(payload) ? payload : Object.values(payload);
  return items.filter(
    (item): item is FilterItem =>
      !!item &&
      typeof item === "object" &&
      typeof (item as FilterItem).id === "number" &&
      typeof (item as FilterItem).filter === "string",
  );
}

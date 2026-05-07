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

export type UiPlatform = (typeof PLATFORM_OPTIONS)[number];

const PLATFORM_BY_BINARY_KEY: Record<string, UiPlatform> = {
  "linux-x86_64": "Linux",
  "windows-x86_64": "Windows",
  "macos-x86_64": "macOS",
  "macos-armv8": "macOS Apple Silicon",
  "windows-armv8": "Windows ARM64",
};

export function uiPlatformFromBinary(
  os: string | null | undefined,
  arch: string | null | undefined,
): UiPlatform | null {
  if (!os || !arch) {
    return null;
  }
  const key = `${os.toLowerCase()}-${arch.toLowerCase()}`;
  return PLATFORM_BY_BINARY_KEY[key] ?? null;
}

export function collectUiPlatformsFromBinaries(
  bins: Array<{ os: string | null | undefined; arch: string | null | undefined }>,
): Set<string> {
  const out = new Set<string>();
  for (const bin of bins) {
    const platform = uiPlatformFromBinary(bin.os, bin.arch);
    if (platform) {
      out.add(platform);
    }
  }
  return out;
}

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

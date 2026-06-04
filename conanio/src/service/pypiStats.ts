import { unstable_cache } from "next/cache";

const PYPISTATS_CONAN_RECENT = "https://pypistats.org/api/packages/conan/recent";
const PYPISTATS_CACHE_KEY = ["conan-pypi-monthly-downloads"] as const;
/** pypistats updates once daily; cache successful fetches for 24h per server process (K8s pod). */
const PYPISTATS_REVALIDATE_SECONDS = 86_400;

type PypistatsRecentResponse = {
  data?: { last_month?: number };
};

class PypistatsUnavailableError extends Error {
  constructor() {
    super("pypistats unavailable");
    this.name = "PypistatsUnavailableError";
  }
}

async function fetchConanPypiMonthlyDownloads(): Promise<number | null> {
  try {
    const res = await fetch(PYPISTATS_CONAN_RECENT, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as PypistatsRecentResponse;
    const n = body.data?.last_month;
    return typeof n === "number" && Number.isFinite(n) && n >= 0 ? Math.round(n) : null;
  } catch {
    return null;
  }
}

async function loadConanPypiMonthlyDownloadsForCache(): Promise<number> {
  const n = await fetchConanPypiMonthlyDownloads();
  if (n == null) throw new PypistatsUnavailableError();
  return n;
}

const loadConanPypiMonthlyDownloadsCached = unstable_cache(
  loadConanPypiMonthlyDownloadsForCache,
  [...PYPISTATS_CACHE_KEY],
  { revalidate: PYPISTATS_REVALIDATE_SECONDS },
);

/** Server-only: cached PyPI `conan` package last-month downloads (24h TTL on success). */
export async function getConanPypiMonthlyDownloadsCached(): Promise<number | null> {
  try {
    return await loadConanPypiMonthlyDownloadsCached();
  } catch {
    return null;
  }
}

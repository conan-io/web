/**
 * URL paths from `getUrls()` are combined with an API base.
 *
 * - **Private API** (`api.private`): direct origin to the Conan backend. Use only from
 *   the server (e.g. `getServerSideProps`, other server code). No browser exposure.
 * - **Public API** (`api.public`): same-origin `/api` routes on this site. Use for any
 *   request initiated from the **frontend**; those handlers expose selected backend
 *   endpoints and forward to the private API.
 */
interface ApiUrls {
  api: {
    private: string;
    public: string;
  };
  popular: string;
  updated: string;
  new: string;
  topics: string;
  licenses: string;
  reference: {
    num: string;
  };
  search: {
    package: string;
  };
  /** Present when `packageId` is passed (recipe detail). Matches conanio `getUrls`. */
  package?: {
    info: string;
    useIt: string;
  };
}

interface GetUrlsParams {
  pattern?: string;
  topics?: number[];
  licenses?: number[];
  /** Recipe slug for GET /package/{name} and GET /package/{name}/use_it */
  packageId?: string;
}

/** Base URL for the **private** API (`getUrls().api.private`). From `NEXT_PUBLIC_CONAN_CONANIO_SERVICE` → `next.config` `env.conanioServer`. */
const getApiBase = () => {
  const rawBase = process.env.conanioServer ?? "";
  const normalized = rawBase.trim().replace(/\/+$/, "");
  return normalized || "http://localhost:5000";
};

export const getUrls = ({
  pattern = "all",
  topics = [],
  licenses = [],
  packageId,
}: GetUrlsParams = {}): ApiUrls => {
  const slug = packageId?.trim().toLowerCase() ?? "";
  const packageUrls =
    slug.length > 0
      ? {
          package: {
            info: `package/${encodeURIComponent(slug)}`,
            useIt: `package/${encodeURIComponent(slug)}/use_it`,
          },
        }
      : {};

  return {
    api: {
      private: getApiBase(),
      public: "/api",
    },
    popular: "popular",
    updated: "updated",
    new: "new",
    topics: "topics",
    licenses: "licenses",
    reference: {
      num: "reference/num",
    },
    search: {
      package: `search/${encodeURIComponent(pattern.toLowerCase())}?topics=${encodeURIComponent(topics.join(","))}&licenses=${encodeURIComponent(licenses.join(","))}`,
    },
    ...packageUrls,
  };
};

interface ApiResponse<T> {
  data: T;
  status: number;
}

async function requestJson<T>(url: string, api: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);
    const data = (await response.json()) as T;
    return { data, status: response.status };
  } catch (error) {
    console.error("SSR request error for %s", url, error);
    return { data: null as T, status: 500 };
  }
}

export async function getJson<T>(url: string, api: string): Promise<ApiResponse<T>> {
  return requestJson<T>(url, api);
}

interface ApiResponseList<T> {
  data: T[];
  status: number;
}

export async function getJsonList<T>(url: string, api: string): Promise<ApiResponseList<T>> {
  const response = await requestJson<Record<string, T> | T[] | null>(url, api);
  if (!response.data || typeof response.data !== "object") {
    return { data: [], status: response.status };
  }
  return {
    data: Array.isArray(response.data) ? response.data : Object.values(response.data),
    status: response.status,
  };
}

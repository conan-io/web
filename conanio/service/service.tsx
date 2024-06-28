interface ApiUrls {
  api: {
    private: string;
    public: string;
  };
  package: {
    info: string;
    md: string;
    example: string;
    options: string;
    packages: string;
    downloads: string;
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
}

interface GetUrlsParams {
  packageId?: string;
  search?: string;
  topics?: number[]; // ids
  licenses?: number[]; // ids
}

export const getUrls = ({
  packageId = "",
  search = "all",
  topics = [],
  licenses = [],
}: GetUrlsParams = {}): ApiUrls => {
  return {
    api: {
      private: `${encodeURI(process.env.NEXT_PUBLIC_CONAN_CONANIO_SERVICE)}`,
      public: "/api",
    },
    package: {
      info: `package/${encodeURIComponent(packageId.toLowerCase())}`,
      md: `package/${encodeURIComponent(packageId.toLowerCase())}/md`,
      example: `package/${encodeURIComponent(packageId.toLowerCase())}/example`,
      options: `package/${encodeURIComponent(packageId.toLowerCase())}/options`,
      packages: `package/${encodeURIComponent(packageId.toLowerCase())}/packages`,
      downloads: `package/${encodeURIComponent(packageId.toLowerCase())}/downloads`,
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
      package: `search/${encodeURIComponent(search.toLowerCase())}?topics=${encodeURIComponent(topics)}&licenses=${encodeURIComponent(licenses)}`,
    },
  };
};

interface ApiResponse<T> {
  data: T;
  status: number;
}
export async function getJson<T>(
  url: string,
  api: string,
): Promise<ApiResponse<T>> {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);
  const data = await response.json();
  return { data: data, status: response.status };
}

interface ApiResponseList<T> {
  data: T[];
  status: number;
}
export async function getJsonList<T>(
  url: string,
  api: string,
): Promise<ApiResponseList<T>> {
  const response = await getJson(url, api);
  return { data: Object.values(response.data), status: response.status };
}

interface ApiUrls {
    api: {
        private: string,
        public: string,
    },
    package: {
        info: string,
        md: string,
        example: string,
        options: string,
        packages: string,
        downloads: string,
    },
    popular: string,
    updated: string,
    new: string,
    topics: string,
    licenses: string,
    reference: {
        num: string,
    },
    search: {
        package: string,
    }
}

interface GetUrlsParams {
    packageId?: string,
    search?: string,
    topics?: string[],
    licenses?: string[],
}

export const getUrls = ({
    packageId = '',
    search = 'all',
    topics = [],
    licenses = []
}: GetUrlsParams = {}): ApiUrls => {
  return {
    api: {
      private: (`${encodeURI(process.env.NEXT_PUBLIC_CONAN_CONANIO_SERVICE)}`),
      public: '/api',
    },
    package: {
      info: (`package/${encodeURIComponent(packageId.toLowerCase())}`),
      md: (`package/${encodeURIComponent(packageId.toLowerCase())}/md`),
      example: (`package/${encodeURIComponent(packageId.toLowerCase())}/example`),
      options: (`package/${encodeURIComponent(packageId.toLowerCase())}/options`),
      packages: (`package/${encodeURIComponent(packageId.toLowerCase())}/packages`),
      downloads: (`package/${encodeURIComponent(packageId.toLowerCase())}/downloads`),
    },
    popular: 'popular',
    updated: 'updated',
    new: 'new',
    topics: 'topics',
    licenses: 'licenses',
    reference: {
      num: 'reference/num',
    },
    search: {
      package: (`search/${encodeURIComponent(search.toLowerCase())}?topics=${encodeURIComponent(topics)}&licenses=${encodeURIComponent(licenses)}`)
    }
  }
}


export async function getJson(url: string, api: string) {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);
  const data = await response.json();
  return {data: data, status: response.status}
}

export async function getJsonList(url: string, api: string) {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);

  const data = await response.json();
  const data_list = [];
  Object.keys(data).forEach(function(key) {data_list.push(data[key]);});
  return {data: data_list, status: response.status}
}

export async function getJsonListWithId(url: string, api: string) {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);

  const data = await response.json();
  const data_list = [];
  Object.keys(data).forEach(function(key) {data_list.push({value: data[key], id: key});});
  return {data: data_list, status: response.status}
}

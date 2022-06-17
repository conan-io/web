export function get_urls({packageId='', search='all', filters=[]} = {}) {
  return {
    api: {
      private: (`${encodeURI(process.env.conanioServer)}`),
      public: 'api',
    },
    package: {
      info: (`package/${encodeURIComponent(packageId.toLowerCase())}`),
      md: (`package/${encodeURIComponent(packageId.toLowerCase())}/md`),
      example: (`package/${encodeURIComponent(packageId.toLowerCase())}/example`),
      options: (`package/${encodeURIComponent(packageId.toLowerCase())}/options`),
      packages: (`package/${encodeURIComponent(packageId.toLowerCase())}/packages`),
      shields_io: (`package/${encodeURIComponent(packageId.toLowerCase())}/shields_io`),
      downloads: (`package/${encodeURIComponent(packageId.toLowerCase())}/downloads`),
    },
    popular: 'popular',
    updated: 'updated',
    new: 'new',
    filters: 'filters',
    licenses: 'licenses',
    reference: {
      num: 'reference/num',
    },
    search: {
      package: (`search/${encodeURIComponent(search.toLowerCase())}?filters=${encodeURIComponent(filters)}`)
    }
  }
}

export async function get_json(url, api) {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);
  const data = await response.json();
  return data
}

export async function get_json_list(url, api) {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);

  const data = await response.json();
  const data_list = [];
  Object.keys(data).forEach(function(key) {data_list.push(data[key]);});
  return data_list
}

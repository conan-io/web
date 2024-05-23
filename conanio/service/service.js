export function get_urls({packageId='', search='all', topics=[], licenses=[]} = {}) {
  return {
    api: {
      private: (`${encodeURI(process.env.conanioServer)}`),
      privateAuth: (`${encodeURI(process.env.conanioAuthServer)}`),
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
    login: 'conan-user/signup',
    search: {
      package: (`search/${encodeURIComponent(search.toLowerCase())}?topics=${encodeURIComponent(topics)}&licenses=${encodeURIComponent(licenses)}`)
    }
  }
}

export async function get_json(url, api) {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);
  const data = await response.json();
  return {data: data, status: response.status}
}

export async function get_json_list(url, api) {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);

  const data = await response.json();
  const data_list = [];
  Object.keys(data).forEach(function(key) {data_list.push(data[key]);});
  return {data: data_list, status: response.status}
}

export async function get_json_list_with_id(url, api) {
  const response = await fetch(`${encodeURI(api)}/${encodeURI(url)}`);

  const data = await response.json();
  const data_list = [];
  Object.keys(data).forEach(function(key) {data_list.push({value: data[key], id: key});});
  return {data: data_list, status: response.status}
}

export async function post_conan_token_generator(name, last_name, email) {
  const urls = get_urls();
  const response = await fetch(`${encodeURI(urls.api.privateAuth)}/${encodeURI(urls.login)}?name=${encodeURIComponent(name)}&last_name=${encodeURIComponent(last_name)}&email=${encodeURIComponent(email)}`,
                               {method: 'POST'}
  );
  const data = await response.json();
  return {info: data, status: response.status};
}

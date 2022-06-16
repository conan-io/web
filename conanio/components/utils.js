export async function get_from_server(url) {
  const response = await fetch(`${encodeURI(process.env.conanioServer)}/${encodeURI(url)}`);
  const data = await response.json();
  return data
}

export async function get_from_local(url) {
  const response = await fetch(`api/${encodeURI(url)}`);
  const data = await response.json();
  return data
}

export async function get_from_server_list(url) {
  const response = await fetch(`${encodeURI(process.env.conanioServer)}/${encodeURI(url)}`);

  const data = await response.json();
  const data_list = [];
  Object.keys(data).forEach(function(key) {data_list.push(data[key]);});
  return data_list
}

export async function get_from_local_list(url) {
  const response = await fetch(`api/${encodeURI(url)}`);

  const data = await response.json();
  const data_list = [];
  Object.keys(data).forEach(function(key) {data_list.push(data[key]);});
  return data_list
}

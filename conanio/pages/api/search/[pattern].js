export default async ({ query: { pattern } }, res) => {
  const response = await fetch(`${encodeURI(process.env.conanioServer)}/search/${encodeURIComponent((pattern).toLowerCase())}`);
  if (!response.ok) {
    res.status(404).json({})
  }
  let data = await response.json();
  res.status(200).json(data)
}

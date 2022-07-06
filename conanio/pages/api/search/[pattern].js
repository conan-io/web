export default async (req, res) => {
  let filters = req.query.filters || ''
  const getFilters = () => {
    if (filters) {return `?filters=${encodeURIComponent(filters.split(','))}`}
    return ''
  }
  const response = await fetch(`${encodeURI(process.env.conanioServer)}/search/${encodeURIComponent((req.query.pattern).toLowerCase())}${getFilters()}`);
  if (!response.ok) {
    res.status(404).json({})
  }
  let data = await response.json();
  res.status(200).json(data)
}

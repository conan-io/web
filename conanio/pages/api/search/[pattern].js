export default async (req, res) => {
  let topics = req.query.topics || ''
  let licenses = req.query.licenses || ''
  const response = await fetch(
    `${encodeURI(process.env.conanioServer)}/search/${encodeURIComponent(
        (req.query.pattern).toLowerCase()
      )}?topics=${encodeURIComponent(
        topics.split(',')
      )}&licenses=${encodeURIComponent(
        licenses.split(',')
      )}`
  );
  if (!response.ok) {
    res.status(404).json({})
  }
  let data = await response.json();
  res.status(200).json(data)
}

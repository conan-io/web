// Fields come pre-encoded from caller
interface ApiSearchRequest {
  query: {
    pattern?: string;
    topics?: string;
    licenses?: string;
  };
}

// This is endpoint acts like a proxy to access backend from `useEffect` (client side)
// which by default has no access to the backend cluster
export default async function get(req: ApiSearchRequest, res: any) {
  let topics = req.query.topics || "";
  let licenses = req.query.licenses || "";
  // TODO: avoid composing the request by creating better service methods
  const response = await fetch(
    `${encodeURI(process.env.conanioServer)}/search/${req.query.pattern}?topics=${topics}&licenses=${licenses}`,
  );
  if (!response.ok) {
    res.status(404).json({});
  }
  let data = await response.json();
  res.status(200).json(data);
}

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const raw = req.query.packageId;
  const packageId =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  if (!packageId) {
    res.status(404).json({});
    return;
  }

  const response = await fetch(
    `${encodeURI(process.env.conanioServer)}/package/${encodeURIComponent(
      packageId.toLowerCase(),
    )}/use_it`,
  );
  if (!response.ok) {
    res.status(404).json({});
    return;
  }
  const data = await response.json();
  res.status(200).json(data);
}

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Public proxy for `GET /package/{name}/use_it` — browser calls `getUrls().api.public`
 * (`conanio/pages/api/package/[packageId]/use_it.ts`).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end();
    return;
  }

  const raw = req.query.packageId;
  const packageId = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  if (!packageId) {
    res.status(400).json({});
    return;
  }

  const base = process.env.conanioServer?.trim().replace(/\/+$/, "") || "http://localhost:5000";
  const slug = packageId.toLowerCase();
  const response = await fetch(`${encodeURI(base)}/package/${encodeURIComponent(slug)}/use_it`);

  if (!response.ok) {
    res.status(response.status === 404 ? 404 : 502).json({});
    return;
  }

  const data = await response.json();
  res.status(200).json(data);
}

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Public proxy for `GET /package/{name}/use_it`.
 * Browser requests should use this route (`getUrls().api.public`).
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
  const upstreamUrl = `${encodeURI(base)}/package/${encodeURIComponent(slug)}/use_it`;

  try {
    const response = await fetch(upstreamUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      if (response.status === 400) {
        res.status(400).json({});
        return;
      }
      if (response.status === 404) {
        res.status(404).json({});
        return;
      }
      res.status(502).json({});
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      const isTimeout = error.name === "TimeoutError" || error.name === "AbortError";
      if (isTimeout) {
        res.status(504).json({});
        return;
      }
    }
    res.status(502).json({});
  }
}

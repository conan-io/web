import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Public API: search exposed for **frontend** callers (`GET /api/search/:pattern`).
 * Forwards to the private backend (`conanioServer`). Server-side code should call
 * the backend directly via `getUrls().api.private`, not this route.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end();
    return;
  }

  const pattern = req.query.pattern;
  const patternStr = Array.isArray(pattern) ? pattern[0] : pattern;
  if (!patternStr) {
    res.status(400).json({});
    return;
  }

  const topics = typeof req.query.topics === "string" ? req.query.topics : "";
  const licenses = typeof req.query.licenses === "string" ? req.query.licenses : "";

  const base = process.env.conanioServer?.trim().replace(/\/+$/, "") || "http://localhost:5000";
  const upstreamUrl = `${encodeURI(base)}/search/${encodeURIComponent(patternStr)}?topics=${encodeURIComponent(topics)}&licenses=${encodeURIComponent(licenses)}`;

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

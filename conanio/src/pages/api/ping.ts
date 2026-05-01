import type { NextApiRequest, NextApiResponse } from "next";

/** Health / readiness — same contract as `conanio/pages/api/ping.ts`. */
export default function handler(_req: NextApiRequest, res: NextApiResponse<{ status: string }>) {
  res.status(200).json({ status: "ok" });
}

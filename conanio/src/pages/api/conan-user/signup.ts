import type { NextApiRequest, NextApiResponse } from "next";

type SignupPayload = {
  full_name?: string;
  email?: string;
  region?: string;
  gdpr_consent?: boolean;
};

/**
 * Public proxy for `POST /conan-user/signup` (auth backend).
 * Mirrors legacy behavior while keeping explicit method handling.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end();
    return;
  }

  const body = (req.body ?? {}) as SignupPayload;
  const payload: Required<SignupPayload> = {
    full_name: typeof body.full_name === "string" ? body.full_name : "",
    email: typeof body.email === "string" ? body.email : "",
    region: typeof body.region === "string" ? body.region : "",
    gdpr_consent: typeof body.gdpr_consent === "boolean" ? body.gdpr_consent : false,
  };

  const base =
    process.env.conanioAuthServer?.trim().replace(/\/+$/, "") || "";
  if (!base) {
    res.status(500).json({
      message: "Server misconfiguration: conanioAuthServer is not set.",
    });
    return;
  }

  const upstreamUrl = `${encodeURI(base)}/conan-user/signup`;

  try {
    const response = await fetch(upstreamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      if (response.status === 422) {
        const data = await response.json();
        res.status(422).json(data);
        return;
      }
      if (response.status === 400) {
        res.status(400).json({
          message: "Invalid signup payload.",
        });
        return;
      }
      res.status(response.status).json({
        message: "Sorry, something went wrong. Please try again later.",
      });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      const isTimeout =
        error.name === "TimeoutError" || error.name === "AbortError";
      if (isTimeout) {
        res.status(504).json({
          message: "Signup request timed out.",
        });
        return;
      }
    }
    res.status(502).json({
      message: "Signup service is unavailable.",
    });
  }
}

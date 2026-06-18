import type { NextApiRequest, NextApiResponse } from "next";

interface SignupRequest extends NextApiRequest {
  body: {
    first_name?: string;
    last_name?: string;
    email?: string;
    region?: string;
    marketing_consent?: boolean;
  };
}

export default async (req: SignupRequest, res: NextApiResponse) => {
  const { first_name = "", last_name = "", email = "", region = "", marketing_consent = false } = req.body;

  const response = await fetch(`${encodeURI(process.env.conanioAuthServer ?? "")}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      region,
      marketing_consent,
    }),
  });
  if (!response.ok) {
    const data = await response.json();
    if (response.status == 403 || response.status == 500) {
      data["message"] =
        data["message"] +
        " Please, try it again later. If the problem persists, contact us at conan@jfrog.com";
    } else if (response.status == 400 || response.status == 422) {
      data["message"] = data["message"] + " If you encounter any issues, please contact us at conan@jfrog.com";
    }
    res.status(response.status).json(data);
  } else {
    const data = await response.json();
    res.status(200).json(data);
  }
};

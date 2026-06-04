import type { NextApiRequest, NextApiResponse } from "next";

interface RecoverRequest extends NextApiRequest {
  body: {
    email?: string;
  };
}

export default async (req: RecoverRequest, res: NextApiResponse) => {
  const { email = "" } = req.body;

  const response = await fetch(`${encodeURI(process.env.conanioAuthServer ?? "")}/user/recover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  if (!response.ok) {
    const data = await response.json();
    if (response.status == 500) {
      data["message"] =
        data["message"] +
        " Please, try it again later. If the problem persists, contact us at conan@jfrog.com";
    } else if (response.status == 400) {
      data["message"] = data["message"] + " If you encounter any issues, please contact us at conan@jfrog.com";
    } else if (response.status == 404) {
      data["message"] =
        data["message"] +
        ': "' +
        email +
        '". If you encounter any issues, please contact us at conan@jfrog.com';
    }
    res.status(response.status).json(data);
  } else {
    const data = await response.json();
    res.status(200).json(data);
  }
};

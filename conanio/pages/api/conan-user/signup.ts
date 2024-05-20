import { NextApiRequest, NextApiResponse } from "next";

interface SignupRequest extends NextApiRequest {
  query: {
    full_name?: string;
    email?: string;
  };
}

export default async (req: SignupRequest, res: NextApiResponse) => {
  let full_name = req.query.full_name || "";
  let email = req.query.email || "";

  const response = await fetch(
    `${encodeURI(process.env.conanioAuthServer)}/conan-user/signup?full_name=${encodeURIComponent(
      full_name,
    )}&email=${encodeURIComponent(email)}`,
    {
      method: "POST",
    },
  );
  if (!response.ok) {
    res.status(response.status).json({});
  }
  let data = await response.json();
  res.status(200).json(data);
};

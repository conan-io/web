import { NextApiRequest, NextApiResponse } from "next";

interface SignupRequest extends NextApiRequest {
    body: {
        full_name?: string;
        email?: string;
        region?: string;
        gdpr_consent?: boolean;
    };
}

export default async (req: SignupRequest, res: NextApiResponse) => {
    const { full_name = "", email = "", region = "", gdpr_consent = false } = req.body;

  const response = await fetch(
    `${encodeURI(process.env.conanioAuthServer)}/conan-user/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,
        email,
        region,
        gdpr_consent,
      }),
    },
  );
  if (!response.ok) {
    if(response.status==422){
      let data = await response.json();
      res.status(response.status).json(data);
    }
    else{
      res.status(response.status).json({message: "Sorry, something went wrong. Please try again later."});
    }
  }
  else {
    let data = await response.json();
    res.status(200).json(data);
  }
};

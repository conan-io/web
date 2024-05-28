export default async (req, res) => {
    let full_name = req.query.full_name || ''
    let email = req.query.email || ''

    const response = await fetch(
        `${encodeURI(process.env.conanioAuthServer)}/conan-user/signup?full_name=${encodeURIComponent(
            full_name
        )}&email=${encodeURIComponent(
            email
        )}`,
        {
        method: 'POST'
        }
    );
    if (!response.status == '500') {
        res.status(500).json({})
    }
    let data = await response.json();
    res.status(200).json(data)
  }

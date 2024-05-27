export default async (req, res) => {
    let name = req.query.name || ''
    let last_name = req.query.last_name || ''
    let email = req.query.email || ''

    const response = await fetch(
        `${encodeURI(process.env.conanioAuthServer)}/conan-user/signup?name=${encodeURIComponent(
            name
        )}&last_name=${encodeURIComponent(
            last_name
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

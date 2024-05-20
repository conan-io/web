export default async function get(req, res){
    const response = await fetch(
      `${encodeURI(process.env.conanioServer)}/package/${encodeURIComponent(
          (req.query.packageId).toLowerCase()
        )}/use_it`
    );
    if (!response.ok) {
      res.status(404).json({})
    }
    let data = await response.json();
    res.status(200).json(data)
  }

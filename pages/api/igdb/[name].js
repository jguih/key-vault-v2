export default async function handler(req, res) {
  const { name } = req.query;
  
  let data;
  if (name) {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.igdb.com/v4/games", {
          method: "POST",
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': 'Bearer ' + process.env.TWITCH_ACCESS_TOKEN
          },
          body:
           `fields 
              name,
              artworks.image_id,
              cover.image_id,
              screenshots.image_id,
              first_release_date,
              game_modes.name,
              summary,
              genres.name;
            where version_parent = null; 
            search "${name}";`
        });
        data = await response.json();
      } catch (error) {
        res.status(400).json(error);
      }
    }
    await fetchData();
  }

  res.status(200).json(data);
}
export default async function handler(req, res) {
  const { id } = req.query;

  let data;
  if (id) {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.igdb.com/v4/language_supports", {
          method: "POST",
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': 'Bearer ' + process.env.TWITCH_ACCESS_TOKEN
          },
          body:
           `fields 
              language.*, 
              language_support_type.*,
              game;
            where game = ${id};`
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
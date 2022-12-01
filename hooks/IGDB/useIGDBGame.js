import { useEffect, useState } from 'react';

export default function useIGDBGame(name) {
  const [games, setGames] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (name) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("http://localhost:3000/api/igdb/"+name, {
            method: "POST",
            header: new Headers({
              'Accept': 'application/json'
            }),
          });
          const data = await response.json();

          setGames(data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [name])

  return {
    games: games,
    error,
    isLoading
  }
}


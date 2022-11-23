import useGame from "./useGame";
import { useEffect, useState } from "react";

export default function useGameByNameContains(name) {
  const { games, isLoading, isError } = useGame();
  const [filteredGames, setFilteredGames] = useState();

  useEffect(() => {
    // Waits for games to be defined
    if (games) {
      // Filter games that matches the name exactly
      const games1 = games.filter((game) => {
        if (name) {
          return game.name.toLowerCase().includes(name.toLowerCase());
        }
      })
      // Filter games that contains all name characters
      // Also include all games if name is undefined
      const games2 = games.filter((game) => {
        if (name) {
          const nameArr = name.toLowerCase().split("");
          return nameArr.every((char) => game.name.toLowerCase().includes(char));
        } else return true;
      })
      // Create a Set to remove duplicates
      setFilteredGames(
        [... new Set(games1.concat(games2))]
      );
    }
  }, [games, name]);

  return { games: filteredGames, isLoading, isError };
}
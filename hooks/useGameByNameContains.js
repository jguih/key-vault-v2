import useGame from "./useGame";
import { useEffect, useState } from "react";

export default function useGameByNameContains(name) {
  const { games, isLoading, isError } = useGame();
  const [filteredGames, setFilteredGames] = useState();

  useEffect(() => {
    // Waits for games to be defined
    if (games) {
      setFilteredGames(
        games.filter((game) => {
          if (name) {
            return game.name.toLowerCase().includes(name.toLowerCase())
          } else return true;
        })
      );
    }
  }, [games, name]);

  return { games: filteredGames, isLoading, isError };
}
import useGame from "./useGame";
import { useEffect, useState } from "react";

export default function useGameByName(name) {
  const { games, isLoading, isError } = useGame();
  const [ currentGame, setCurrentGame ] = useState();

  useEffect(() => {
    // Waits for games and name to be defined
    if (games && name) {
      // Gets the current game
      games.forEach((game) => {
        if (game.name.toLowerCase() === name) {
          setCurrentGame(game);
        }
      });
    }
  }, [games, name]);

  return { currentGame, isLoading, isError };
}
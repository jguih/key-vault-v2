import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getPlatformsIcons } from "../../../functions";
import useGame from "../../../hooks/useGame";
import mainTitle from "./MainTitle.module.scss"

function getTitle(name) {
  if (name) {
    // Formats the game title
    let _name = name.split(" ");

    return _name.map((name) => {
      return name[0].toUpperCase() + name.substring(1);
    }).join(" ");
  }
}

export default function MainTitle({ name }) {
  const { games, isLoading, isError } = useGame();
  const [currentGame, setCurrentGame] = useState();
  const [platforms, setPlatforms] = useState();

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

  useEffect(() => {
    if (currentGame) {
      setPlatforms(currentGame.platforms);
    }
  }, [currentGame]);

  return (
    <Container className="mt-4 mb-4">
      <div className={mainTitle.container}>
        <div className={mainTitle.title}>
          {getTitle(name)}
        </div>
        <div className={mainTitle["platforms-container"]}>
          {getPlatformsIcons(platforms)}
        </div>
      </div>
    </Container>
  );
}
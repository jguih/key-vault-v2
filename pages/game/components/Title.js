import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getPlatformsIcons } from "../../../functions";
import useGameByName from "../../../hooks/useGameByName";
import title from "./Title.module.scss"

function getTitle(name) {
  if (name) {
    // Formats the game title
    let _name = name.split(" ");

    return _name.map((name) => {
      return name[0].toUpperCase() + name.substring(1);
    }).join(" ");
  }
}

export default function Title({ name }) {
  const { currentGame, isLoading, isError } = useGameByName(name);
  const [platforms, setPlatforms] = useState();

  useEffect(() => {
    if (currentGame) {
      setPlatforms(currentGame.platforms);
    }
  }, [currentGame]);

  return (
    <Container className="mt-4 mb-4">
      <div className={title.container}>
        <div className={title.title}>
          {getTitle(name)}
        </div>
        <div className={title["platforms-container"]}>
          {getPlatformsIcons(platforms)}
        </div>
      </div>
    </Container>
  );
}
import { Container } from "react-bootstrap";
import { getPlatformsIcons } from "../../../functions";
import useGameByName from "../../../hooks/useGameByName";
import title from "./Title.module.scss";

function getGameTitle(name) {
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

  if (currentGame) {
    const gameTitle = getGameTitle(name);
    const platformIcons = getPlatformsIcons(currentGame.platforms);

    return (
      <Container className="mt-4 mb-4">
        <div className={title.container}>
          <div className={title.title}>
            {gameTitle}
          </div>
          <div className={title["platforms-container"]}>
            {platformIcons}
          </div>
        </div>
      </Container>
    );
  }
}
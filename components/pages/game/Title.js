import { Container } from "react-bootstrap";
import { getPlatformsIcons } from "../../../global";
import titleStyles from "../../../scss/modules/pages/game/Title.module.scss"

function getGameTitle(title) {
  if (title) {
    // Formats the game title
    let _title = title.split(" ");

    return _title.map((title) => {
      return title[0].toUpperCase() + title.substring(1);
    }).join(" ");
  }
}

export default function Title({ title, platformsName }) {
  const gameTitle = getGameTitle(title);
  const platformIcons = getPlatformsIcons(platformsName);

  return (
    <Container className="mt-4 mb-4">
      <div className={titleStyles.container}>
        <div className={titleStyles.title}>
          {gameTitle}
        </div>
        <div className={titleStyles["platforms-container"]}>
          {platformIcons}
        </div>
      </div>
    </Container>
  );
}
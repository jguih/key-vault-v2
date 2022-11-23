import { createGameCard } from '../../../../global';
import gamesGridStyles from "../../../../scss/modules/pages/game/search/GamesGrid.module.scss"

function getGameCard(game, index) {
  return (
    <div className={`${gamesGridStyles["card-wrapper"]}`} key={index}>
      {createGameCard(game)}
    </div>
  );
}

export default function GamesGrid({ games }) {
  if (games) {
    return (
      <div className={`${gamesGridStyles["games-grid"]}`}>
        {games.map((game, index) => getGameCard(game, index))}
      </div>
    );
  }
}
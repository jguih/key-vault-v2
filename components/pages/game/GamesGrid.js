import { createGameCard } from '../../../global';
import gamesGridStyles from "../../../scss/modules/pages/game/GamesGrid.module.scss"

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
      <div className={`${gamesGridStyles["games-grid"]} mt-4`}>
        {games.map((game, index) => getGameCard(game, index))}
      </div>
    );
  }
}
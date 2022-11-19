import { Container } from 'react-bootstrap';
import { createGameCard } from '../../../global';
import gamesGridStyles from "../../../scss/modules/pages/search/GamesGrid.module.scss"

export default function GamesGrid({ games }) {
  if (games) {
    return (
      <Container className={`${gamesGridStyles["games-grid"]} mt-4`}>
        {games.map((game) => getGameCard(game))}
      </Container>
    );
  }

  function getGameCard(game) {
    return (
      <div className={`${gamesGridStyles["card-wrapper"]}`}>
        {createGameCard(game)}
      </div>
    );
  }
}
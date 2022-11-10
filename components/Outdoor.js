import { Container, Image } from "react-bootstrap";
import outdoor from '../scss/modules/Outdoor.module.scss';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Outdoor() {
  const { data, error } = useSWR('http://localhost:3000/games.json', fetcher);

  if (error) return <div>Failed to load...</div>
  if (!data) return <div>Loading...</div>

  function getSmallGameCard(game, index) {
    if (index < 4) {
      return (
        <div className={outdoor.item}>
          <div className={outdoor["small-game-card"]}>
            <Image src="https://via.placeholder.com/300" />
            <div className={outdoor["title-container"]}>
              <span className={outdoor.title}>{game.name}</span>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <Container className="mt-4">
      <div className={outdoor.outdoor}>
        <Image
          src="https://via.placeholder.com/1300x700"
          width="100%"
        />
        <div className={outdoor["cards-grid"]}>
          {data.map((game, index) => getSmallGameCard(game, index))}
        </div>
      </div>
    </Container>
  );
}
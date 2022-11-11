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
        <div className={outdoor.item} key={index}>
          <div className={outdoor["small-game-card"]}>
            <Image src={game.imgUrl.cover} />
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
        <div className={outdoor["outdoor-img"]}>
          <Image
            src="https://images.igdb.com/igdb/image/upload/t_original/ar7dp.jpg"
            width="100%"
          />
        </div>
        <div className={outdoor["cards-grid"]}>
          {data.map((game, index) => getSmallGameCard(game, index))}
        </div>
      </div>
    </Container>
  );
}
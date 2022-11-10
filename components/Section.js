import { Container, Button, Badge } from "react-bootstrap";
import section from "../scss/modules/Section.module.scss";
import useSWR from 'swr';
import GameCard from "./GameCard";

// Generate platform icons based on data
function getPlatforms(platforms) {
  return platforms.map(platform => {
    if (platform === "Windows") {
      return <i className="bi bi-windows"></i>;
    } else if (platform === "Steam") {
      return <i className="bi bi-steam"></i>
    }
  });
}

function getClass(index) {
  if (index >= 4) {
    // Marks every item after the 4th with a class 'removed'
    // This limits the section to 4 items when screen is too small
    return section.item + " " + section["removed"];
  } else {
    return section.item;
  }
}

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Section({ title, rows }) {
  const { data, error } = useSWR('http://localhost:3000/games.json', fetcher);

  if (error) return <div>Failed to load...</div>
  if (!data) return <div>Loading...</div>

  function createGameCard(game, index) {
    if (index < rows * 5) {
      return (
        <div 
          className={getClass(index)}
          key={index}
        >
          <GameCard
            key={game.name+" "+game.id}
            name={game.name}
            price={game.price}
            discount={game.discount}
            isDiscountActive={game.isDiscountActive}
            platforms={getPlatforms(game.platforms)}
            imgUrl={game.imgUrl}
          />
        </div>
      );
    }
  }

  return (
    <Container className="mt-4 mb-4">
      <div className={section.container}>
        <div className={section.top}>
          <h3>{title}</h3>
          <Button variant="kv-primary-800">Ver mais</Button>
        </div>
        <hr/>
        <div className={section.content}>
          {data.map((game, index) => createGameCard(game, index))}
        </div>
      </div>
    </Container>
  );
}
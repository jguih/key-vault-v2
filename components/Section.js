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

// Format the price
function getPrice(price) {
  return <Badge>{"R$ " + price}</Badge>
}

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Section({ title, rows }) {
  const { data, error } = useSWR('http://localhost:3000/games.json', fetcher);

  if (error) return <div>Failed to load...</div>
  if (!data) return <div>Loading...</div>

  function getClass(index) {
    if (index === (rows * 5) - 1) {
      // Marks the last item with a class 'last-item'
      // This last item will be removed when screen is too small
      return section.item + " " + section["last-item"];
    } else {
      return section.item;
    }
  }

  function createGameCard(game, index) {
    if (index < rows * 5) {
      return (
        <div 
          className={getClass(index)}
        >
          <GameCard
            key={game.name+" "+game.id}
            name={game.name}
            price={getPrice(game.price)}
            platforms={getPlatforms(game.platforms)}
            imgUrl={game.imgUrl}
          />
        </div>
      );
    }
  }

  return (
    <Container>
      <div className={section.container}>
        <div className={section.top}>
          <h3>{title}</h3>
          <Button>Ver mais</Button>
        </div>
        <hr/>
        <div className={section.content}>
          {data.map((game, index) => createGameCard(game, index))}
        </div>
      </div>
    </Container>
  );
}
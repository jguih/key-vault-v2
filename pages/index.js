import GameCard from '../components/GameCard';
import Header from '../components/Header';
import Outdoor from '../components/Outdoor';
import Section from '../components/Section';
import SubHeader from '../components/SubHeader';
import { Badge } from 'react-bootstrap';

function getPlatforms(platforms) {
  return platforms.map(platform => {
    if (platform === "Windows") {
      return <i className="bi bi-windows"></i>;
    } else if (platform === "Steam") {
      return <i className="bi bi-steam"></i>
    }
  });
}

function getPrice(price) {
  return <Badge>{"R$ "+price}</Badge>
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/games.json');
  const games = await res.json();

  return {
    props: {
      games,
    },
  }
}

export default function Home({ games }) {
  return (
    <div className="d-grid gap-4">
      <Header activeKey="/" />
      <SubHeader />
      <Outdoor 
        mainImgUrl="https://via.placeholder.com/1600" 
      />
      <Section title="Promoção">
        {games.map((game, index) => {
          return (
            <GameCard
              key={index}
              name={game.name}
              price={getPrice(game.price)}
              platforms={getPlatforms(game.platforms)}
              imgUrl={game.imgUrl}
            />
          );
        })}
      </Section>
    </div>
  );
}

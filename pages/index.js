import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Outdoor from '../components/Outdoor';
import Section from '../components/Section';
import SubHeader from '../components/SubHeader';
import useGame from '../hooks/useGame';

export default function Home() {
  const router = useRouter();
  const { games, isLoading, isError } = useGame();
  const [outdoorGames, setOutdoorGames] = useState();
  const outdoorSize = 4; // Number of outdoor games
  const [recentlyAddedGames, setRecentlyAddedGames] = useState();
  const recentlyAddedGamesSize = 5; // Number of cards
  const [discountedGames, setDiscountedGames] = useState();
  const discountedGamesSize = 5;
  const [rpgGames, setRpgGames] = useState();
  const rpgGamesSize = 5;

  useEffect(() => {
    if (games) {
      const outdoorGamesArr = [];
      const discountedGamesArr = [];
      const recentlyAddedGamesArr = [];
      const rpgGamesArr = [];

      // Iterates through games until all arrays above are filled, then it stops
      games.every((game) => {
        const genresArr = game.genre.map((genre) => genre.toLowerCase())
        const isDiscountActive = game.isDiscountActive;
        const tagsArr = game.tag.map((tag) => tag.toLowerCase());

        if (isDiscountActive && discountedGamesArr.length < recentlyAddedGamesSize + 1) {
          discountedGamesArr.push(game);
        }

        if (tagsArr.includes("recently added")) {
          if (recentlyAddedGamesArr.length < recentlyAddedGamesSize + 1) {
            recentlyAddedGamesArr.push(game);
          }
          if (outdoorGamesArr.length < outdoorSize + 1) {
            outdoorGamesArr.push(game);
          }
        }

        if (genresArr.includes("rpg") && rpgGamesArr.length < rpgGamesSize + 1) {
          rpgGamesArr.push(game);
        }

        if (
          discountedGamesArr.length === recentlyAddedGamesSize && 
          recentlyAddedGamesArr.length === discountedGamesSize &&
          outdoorGamesArr.length === outdoorSize) {
          return false;
        }

        return true;
      })

      setOutdoorGames(outdoorGamesArr);
      setRecentlyAddedGames(recentlyAddedGamesArr);
      setDiscountedGames(discountedGamesArr);
      setRpgGames(rpgGamesArr);
    }
  }, [games]);

  const sectionOnClick = {
    recentlyAdded: function (e) {
      router.push({
        pathname: "/game",
        query: {
          tags: "recently added"
        }
      })
    },
    discounted: function (e) {
      router.push({
        pathname: "/game",
        query: {
          discounted: true
        }
      })
    },
    rpg: function (e) {
      router.push({
        pathname: "/game",
        query: {
          genres: "rpg"
        }
      })
    }
  }

  if (isLoading) {
    return (
      <Container>
        <Alert variant="success">Loading...</Alert>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Alert variant="danger">Failed to load</Alert>
      </Container>
    );
  }

  if (games) {
    return (
      <div className="d-flex flex-column justify-content-between h-100 ab">
        <Header activeKey={"/"} />
        <div className="mb-auto pb-4 pt-4">
          <SubHeader />
          <Outdoor games={outdoorGames} size={4} />
          <Section
            title="Promoção"
            games={discountedGames}
            onClick={sectionOnClick.discounted}
          />
          <Section
            title="RPG"
            games={rpgGames}
            onClick={sectionOnClick.rpg}
          />
          <Section
            title="Adicionados Recentemente"
            games={recentlyAddedGames}
            onClick={sectionOnClick.recentlyAdded}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
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
  const [sectionGames, setSectionGames] = useState({});
  const outdoorSize = 4;
  const discountedGamesSize = 5;
  const rpgGamesSize = 5;
  const upcomingGamesSize = 5;
  const recentGamesSize = 10;

  useEffect(() => {
    if (games) {
      let sortedGames = games
        .sort((gameA, gameB) => {
          return new Date(new Date(gameB.releaseDate)) -
            new Date(new Date(gameA.releaseDate))
        });
      const outdoorGamesArr = [];
      const upcomingGamesArr = [];
      const recentGamesArr = [];
      let count = 0;

      sortedGames.every((game) => {
        if (new Date() <= new Date(game.releaseDate)) {
          // Future Games
          if (upcomingGamesArr.length < upcomingGamesSize) {
            upcomingGamesArr.push(game);
          } else {
            count++;
          }
        } else if (new Date() > new Date(game.releaseDate)) {
          // Most recent, excluding future games
          if (outdoorGamesArr.length < outdoorSize) {
            outdoorGamesArr.push(game);
          } else if (recentGamesArr.length < recentGamesSize) {
            recentGamesArr.push(game);
          } else {
            count++;
          }
        }
        if (count === 2) return false;
        return true;
      });

      count = 0;
      const discountedGamesArr = [];
      const rpgGamesArr = [];
      sortedGames = sortedGames
        .sort((gameA, gameB) => {
          if (gameA.name < gameB.name) {
            return -1;
          }
          if (gameA.name > gameB.name) {
            return 1;
          }
          return 0
        });

      sortedGames.every((game) => {
        const isDiscountActive = game.isDiscountActive;
        const genresArr = game["game_genre"]?.map((g) => g.name.toLowerCase())

        if (isDiscountActive) {
          if (discountedGamesArr.length < discountedGamesSize) {
            discountedGamesArr.push(game);
          } else {
            count++;
          }
        } else if (genresArr?.includes("role-playing (rpg)")) {
          if (rpgGamesArr.length < rpgGamesSize) {
            rpgGamesArr.push(game);
          } else {
            count++;
          }
        }
        if (count === 2) return false;
        return true;
      });

      setSectionGames({
        outdoor: outdoorGamesArr,
        discounted: discountedGamesArr,
        rpg: rpgGamesArr,
        upcoming: upcomingGamesArr,
        recent: recentGamesArr
      })
    }
  }, [games]);

  const sectionOnClick = {
    recentlyAdded: function (e) {
      router.push({
        pathname: "/game",
        query: {

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
          genres: "role-playing (rpg)"
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
          <Outdoor games={sectionGames.outdoor} />
          <Section
            title="Chegando em Breve"
            games={sectionGames.upcoming}
          />
          <Section
            title="Promoção"
            games={sectionGames.discounted}
            onClick={sectionOnClick.discounted}
          />
          <Section
            title="Adicionados Recentemente"
            games={sectionGames.recent}
          />
          <Section
            title="RPG"
            games={sectionGames.rpg}
            onClick={sectionOnClick.rpg}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
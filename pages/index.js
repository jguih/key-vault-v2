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
      let sortedGames = games;
      const outdoorGamesArr = [];
      const upcomingGamesArr = [];
      const recentGamesArr = [];

      // Sort by release date Desc
      sortedGames = sortedGames
        .sort((gameA, gameB) => {
          if (gameA.releaseDate === "") return -1;
          if (gameB.releaseDate === "") return 1;
          const dateA = new Date(gameA.releaseDate);
          const dateB = new Date(gameB.releaseDate);
          if (dateA > dateB) {
            return -1;
          }
          if (dateA < dateB) {
            return 1;
          }
          return 0;
        });
      sortedGames.every((game) => {
        const date = game.releaseDate !== "" ?
          new Date(game.releaseDate) : "";
        if (new Date() < date || date === "") {
          if (upcomingGamesArr.length < upcomingGamesSize) {
            upcomingGamesArr.push(game);
          }
        }
        if (new Date() >= date && date !== "") {
          // Most recent, excluding future games
          if (outdoorGamesArr.length < outdoorSize) {
            outdoorGamesArr.push(game);
          } else if (recentGamesArr.length < recentGamesSize) {
            recentGamesArr.push(game);
          }
        }
        if (upcomingGamesArr.length === upcomingGamesSize &&
          outdoorGamesArr.length === outdoorSize &&
          recentGamesArr.length === recentGamesSize) {
          return false;
        }
        return true;
      });

      const discountedGamesArr = [];
      const rpgGamesArr = [];

      // Sort by name Asc
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
          }
        } else if (genresArr?.includes("role-playing (rpg)")) {
          if (rpgGamesArr.length < rpgGamesSize) {
            rpgGamesArr.push(game);
          }
        }
        if (discountedGamesArr.length === discountedGamesSize &&
          rpgGamesArr.length === rpgGamesSize) {
          return false;
        }
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
          sort: "releaseDateDesc"
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
    },
    upcoming: function (e) {
      router.push({
        pathname: "/game",
        query: {
          sort: "releaseDateDesc"
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
            onClick={sectionOnClick.upcoming}
          />
          <Section
            title="Promoção"
            games={sectionGames.discounted}
            onClick={sectionOnClick.discounted}
          />
          <Section
            title="Adicionados Recentemente"
            games={sectionGames.recent}
            onClick={sectionOnClick.recentlyAdded}
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
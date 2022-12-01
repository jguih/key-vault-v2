import { Container } from "react-bootstrap";
import GamesGrid from "./GamesGrid";
import bodyStyles from "../../../../scss/modules/pages/game/search/GameSearchPageBody.module.scss";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import { useRouter } from "next/router";
import SearchBar from "../../../ui/SearchBar";
import useGame from "../../../../hooks/useGame";

export default function GameSearchBody() {
  const router = useRouter();
  const entry = router.query.entry;
  const { games, isLoading, isError } = useGame();
  // FilteredGames is controlled by the Filter component!
  // 'games' will be used as a fallback to FilteredGames
  const [filteredGames, setFilteredGames] = useState();
  const [toBeFiltered, setToBeFiltered] = useState();

  useEffect(() => {
    // Waits for games to be defined
    if (games) {
      // Filter games that matches the name exactly
      const games1 = games.filter((game) => {
        if (entry) {
          return game.name.toLowerCase().includes(entry.toLowerCase());
        }
      })
      // Filter games that contains all name characters
      // Also include all games if name is undefined
      const games2 = games.filter((game) => {
        if (entry) {
          const nameArr = entry.toLowerCase().split("");
          return nameArr.every((char) => game.name.toLowerCase().includes(char));
        } else return true;
      })
      // Create a Set to remove duplicates
      setToBeFiltered(
        [... new Set(games1.concat(games2))]
      );
    }
  }, [games, entry]);

  const mySearchBar = {
    timeout: null,
    handleOnChange: function (e) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {

        let myQuery = { ...router.query };
        if (e.target.value) {
          myQuery.entry = e.target.value;
        } else {
          delete myQuery.entry;
        }

        router.push({
          pathname: "/game",
          query: myQuery
        })
      }, 600);
    },
    handleOnSubmit: function (e) {
      e.preventDefault();
      clearTimeout(this.timeout);

      let myQuery = { ...router.query };
      if (e.target.querySelector("input").value) {
        myQuery.entry = e.target.querySelector("input").value;
      } else {
        delete myQuery.entry;
      }

      router.push({
        pathname: "/game",
        query: myQuery
      })
    }
  }

  function getResults() {
    if (filteredGames) {
      return filteredGames.length > 1 ? `${filteredGames.length} Resultados` :
        filteredGames.length === 0 ? `${filteredGames.length} Resultados` :
          `${filteredGames.length} Resultado`;
    } else if (games) {
      return games.length > 1 ? `${games.length} Resultados` :
        games.length === 0 ? `${games.length} Resultados` :
          `${games.length} Resultado`;
    }
  }

  if (games) {
    return (
      <Container className={`mt-4 mb-4`}>
        <div className={`${bodyStyles["top-section"]}`}>
          <span className={`${bodyStyles["results"]}`}>
            {getResults()}
          </span>
          <SearchBar
            defaultValue={entry}
            onSubmit={(e) => mySearchBar.handleOnSubmit(e)}
            onChange={(e) => mySearchBar.handleOnChange(e)}
          />
        </div>
        <hr />
        <div className={`${bodyStyles["content-container"]}`}>
          <Filters
            games={toBeFiltered}
            onFilter={setFilteredGames}
          />
          <GamesGrid
            games={filteredGames}
          />
        </div>
      </Container>
    );
  }
}
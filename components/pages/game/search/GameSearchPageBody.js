import { Button, Container, Form, InputGroup } from "react-bootstrap";
import GamesGrid from "./GamesGrid";
import bodyStyles from "../../../../scss/modules/pages/game/search/GameSearchPageBody.module.scss";
import { useEffect, useState } from "react";
import useGameByNameContains from '../../../../hooks/useGameByNameContains';
import Filters from "./Filters";
import { useRouter } from "next/router";

export default function GameSearchBody() {
  const router = useRouter();
  const entry = router.query.entry;
  const { games, isLoading, isError } = useGameByNameContains(entry);
  // FilteredGames is controlled by the Filter component!
  // 'games' will be used as a fallback to FilteredGames
  const [filteredGames, setFilteredGames] = useState();

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
          <MySearchBar
            defaultValue={entry}
            onSubmit={(e) => mySearchBar.handleOnSubmit(e)}
            onChange={(e) => mySearchBar.handleOnChange(e)}
          />
        </div>
        <hr />
        <div className={`${bodyStyles["content-container"]}`}>
          <Filters
            games={games}
            onFilter={setFilteredGames}
          />
          <GamesGrid
            games={filteredGames ? filteredGames : games}
          />
        </div>
      </Container>
    );
  }
}

function MySearchBar({ defaultValue, onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <InputGroup className={`${bodyStyles["input-group"]}`}>
        <Form.Control
          className={`${bodyStyles["form-control"]}`}
          type="text"
          placeholder="Buscar"
          name="entry"
          defaultValue={defaultValue}
          onChange={(e) => onChange(e)}
        />
        <InputGroup.Text className={`${bodyStyles["input-group-text"]} p-0`}>
          <Button
            className={`${bodyStyles["button"]}`}
            variant={""}
            type="submit"
          >
            <i className={`bi bi-search`}></i>
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </form>
  );
}
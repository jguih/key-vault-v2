import { Button, Container, Form, InputGroup } from "react-bootstrap";
import GamesGrid from "./GamesGrid";
import bodyStyles from "../../../scss/modules/pages/game/GameSearchPageBody.module.scss";
import { useEffect, useState } from "react";
import useGameByNameContains from '../../../hooks/useGameByNameContains';
import Filters from "./Filters";
import { useRouter } from "next/router";

function ArrToMap(Arr) {
  console.log(Arr)
  const map = new Map();
  if (Arr) {
    Arr.forEach((value) => {
      if (value) {
        map.set(value, true);
      }
    })
  };
  return map;
}

export default function GameSearchBody() {
  const router = useRouter();
  const [entry, setEntry] = useState();
  const [genres, setGenres] = useState();
  const { games, isLoading, isError } = useGameByNameContains(entry);

  useEffect(() => {
    if (router.isReady) {
      console.log("router ready");
      setEntry(router.query.entry);
      setGenres(ArrToMap(router.query.genres ? router.query.genres.split(".") : [""]));
    }
  }, [router])

  const mySearchBar = {
    handleOnChange: function (e) {
      setEntry(e.target.value);
    },
    handleOnSubmit: function (e) {
      e.preventDefault();
      push();
    }
  }

  const filter = {
    handleOnChange: function (genre, value) {
      const _genres = new Map(genres);
      _genres.set(genre, value);
      setGenres(_genres);
    }
  }

  function push() {
    let _genres = [];

    genres.forEach((value, key) => {
      if (value === true) {
        _genres.push(key);
      }
    });

    router.push({
      pathname: "/game",
      query: {
        entry,
        genres: _genres.join(".")
      }
    });
  };

  if (games) {
    return (
      <Container className={`mt-4 mb-4`}>
        <div className={`${bodyStyles["top-section"]}`}>
          <span className={`${bodyStyles["results"]}`}>
            {games.length > 1 ? `${games.length} Resultados` :
              games.length === 0 ? `${games.length} Resultados` :
                `${games.length} Resultado`}
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
            genres={["RPG", "FPS", "Action", "Adventure"]}
            onChange={filter.handleOnChange}
          />
          <GamesGrid
            games={games}
          />
        </div>
      </Container>
    );
  }
}

function MySearchBar({ defaultValue, onSubmit, onChange }) {
  return (
    <form action="/game" onSubmit={onSubmit}>
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
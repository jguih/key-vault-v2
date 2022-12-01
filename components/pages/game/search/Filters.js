import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GameFields, getGamemode, toFirstUpperCase } from "../../../../global";
import useData from "../../../../hooks/useData";
import filterStyles from "../../../../scss/modules/pages/game/search/Filters.module.scss";
import * as Kv from "../../../ui/Kv";

export default function Filters({ games, onFilter }) {
  const router = useRouter();
  const { data } = useData();

  // States below are controlled by router changes
  const [checkedGenres, setCheckedGenres] = useState([]); // Genre checkboxes state
  const [checkedDiscount, setCheckedDiscount] = useState(); // Discount checkbox state
  const [checkedGamemodes, setCheckedGamemodes] = useState([]); // Game mode checkboxes state

  useEffect(() => {
    if (router.isReady && games) {
      let filteredGames = games;
      // Filter by genre
      if (router.query.genres) {
        // Get genres from URL
        const genresArr = router.query.genres.split(".")
          .map(genre => genre.toLowerCase());
          
        setCheckedGenres(genresArr);

        filteredGames = filteredGames.filter((game) => {
          const gameGenres = game[GameFields.GameGenre]
            ?.map((gameGenre) => gameGenre.name.toLowerCase());
          // Return true if every genresArr genre is included in gameGenres
          return genresArr?.every((genreName) => {
            // Return true if genresArr genre is included in gameGenres
            return gameGenres?.includes(genreName);
          })
        });
      } else {
        setCheckedGenres([]);
      }
      // Filter by discount
      if (router.query.discounted) {
        setCheckedDiscount(true);

        filteredGames = filteredGames.filter((game) => {
          return game.isDiscountActive;
        });
      } else {
        setCheckedDiscount(false);
      }
      // Filter by gamemode
      if (router.query.gamemodes) {
        const gamemodesArr = router.query.gamemodes.split(".")
          .map(g => g.toLowerCase());

        setCheckedGamemodes(gamemodesArr);

        filteredGames = filteredGames.filter((game) => {
          const gameGamemodes = game[GameFields.GameGamemode]
            ?.map(g => g.name.toLowerCase());
          return gamemodesArr?.every(gamemodeName => {
            return gameGamemodes?.includes(gamemodeName);
          })
        })
      } else {
        setCheckedGamemodes([]);
      }
      onFilter(filteredGames);
    }
  }, [router, games, onFilter]);

  const filter = {
    onChangeGenre: function (genre, e) {
      const genreName = genre.name.toLowerCase();

      let myQuery = { ...router.query };
      if (e.target.checked) {
        // Adding genre to URL
        if (router.query.genres) {
          myQuery.genres = router.query.genres + "." + genreName;
        } else {
          myQuery.genres = genreName;
        }
      } else {
        // Removing genre from URL
        const newGenres = checkedGenres.filter((genre) => genre !== genreName);
        if (newGenres.length > 0) {
          myQuery.genres = newGenres.join(".");
        } else {
          delete myQuery.genres;
        }
      }
      delete myQuery.page;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    getCheckedGenre: function (genre) {
      const genreName = genre.name.toLowerCase();
      return checkedGenres.includes(genreName);
    },
    onChangeDiscounted: function (e) {
      let myQuery = { ...router.query };
      if (e.target.checked) {
        // Adding 'discounted=true' to URL
        myQuery = {
          ...router.query,
          discounted: true
        }
      } else {
        // Removing 'discounted=true' from URL
        delete myQuery.discounted;
      }
      delete myQuery.page;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    onChangeGamemode: function (gamemode, e) {
      const gamemodeName = gamemode.name.toLowerCase();
      
      let myQuery = { ...router.query };
      if (e.target.checked) {
        if (router.query.gamemodes) {
          myQuery.gamemodes = router.query.gamemodes + "." + gamemodeName;
        } else {
          myQuery.gamemodes = gamemodeName;
        }
      } else {
        const newGamemodes = checkedGamemodes.filter((g) => g !== gamemodeName);
        if (newGamemodes.length > 0) {
          myQuery.gamemodes = newGamemodes.join(".");
        } else {
          delete myQuery.gamemodes;
        }
      }
      delete myQuery.page;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    }
  };

  if (!data) return;

  return (
    <div className={`${filterStyles.container}`}>
      <form>
        <Kv.Checkbox
          type="checkbox"
          label="Promoção"
          onChange={(e) => filter.onChangeDiscounted(e)}
          checked={checkedDiscount || false}
          id="discounted"
        />
      </form>
      <Kv.Accordion title="Categorias" expand={checkedGenres?.length > 0} bodyHeight={400}>
        <form>
          {data.genres?.map((genre, index) => {
            return (
              <Kv.Checkbox
                type="checkbox"
                label={genre.name}
                onChange={(e) => filter.onChangeGenre(genre, e)}
                checked={checkedGenres?.includes(genre.name.toLowerCase())}
                key={index}
                id={genre.name}
              />
            );
          })}
        </form>
      </Kv.Accordion>
      <Kv.Accordion title="Modos de Jogo" expand={checkedGamemodes?.length > 0} bodyHeight={100}>
        <form>
          {data.gamemodes?.map((gamemode, index) => {
            return (
              <Kv.Checkbox
                type="checkbox"
                label={getGamemode(gamemode.name)}
                onChange={(e) => filter.onChangeGamemode(gamemode, e)}
                checked={checkedGamemodes?.includes(gamemode.name.toLowerCase())}
                key={index}
                id={gamemode.name}
              />
            );
          })}
        </form>
      </Kv.Accordion>
      <Kv.Accordion title="Plataformas" bodyHeight={250}>

      </Kv.Accordion>
      <Kv.Accordion title="Preço" bodyHeight={250}>

      </Kv.Accordion>
      <Kv.Accordion title="Data de Lançamento" bodyHeight={250}>

      </Kv.Accordion>
      <Kv.Accordion title="Idiomas" bodyHeight={250}>

      </Kv.Accordion>
    </div>
  );
}
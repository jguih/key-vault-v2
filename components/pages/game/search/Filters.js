import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useGenre from "../../../../hooks/useGenre";
import filterStyles from "../../../../scss/modules/pages/game/search/Filters.module.scss";
import * as Kv from "../../../ui/Kv";

export default function Filters({ games, onFilter }) {
  const router = useRouter();

  // States below are controlled by router changes
  const [checkedGenres, setCheckedGenres] = useState([]); // Genre checkboxes state
  const [checkedDiscount, setCheckedDiscount] = useState(); // Discount checkbox state

  const { genres, isLoading, isError } = useGenre();

  useEffect(() => {
    let filteredGames = games;
    if (router.isReady) {
      // Filter by genre
      if (router.query.genres) {
        // Get genres from URL
        const genresArr = router.query.genres.split(".")
          .map(genre => genre.toLowerCase());

        setCheckedGenres(genresArr);

        filteredGames = filteredGames.filter((game) => {
          const gameGenres = game.genre.map((gameGenre) => gameGenre.toLowerCase());
          // Return true if every genresArr genre is included in gameGenres
          return genresArr.every((genreName) => {
            // Return true if genresArr genre is included in gameGenres
            return gameGenres.includes(genreName);
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
    }
    onFilter(filteredGames);
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
      console.log(genreName, checkedGenres.includes(genreName))
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
    }
  };

  if (genres) {
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
        <Kv.Accordion title="Categorias" expand={checkedGenres.length > 0}>
          <form>
            {genres.map((genre, index) => {
              return (
                <Kv.Checkbox
                  type="checkbox"
                  label={genre.name}
                  onChange={(e) => filter.onChangeGenre(genre, e)}
                  checked={checkedGenres.includes(genre.name.toLowerCase())}
                  key={index}
                  id={genre.name}
                />
              );
            })}
          </form>
        </Kv.Accordion>
        <Kv.Accordion title="Modos de Jogo">

        </Kv.Accordion>
        <Kv.Accordion title="Plataformas">

        </Kv.Accordion>
        <Kv.Accordion title="Preço">

        </Kv.Accordion>
        <Kv.Accordion title="Data de Lançamento">

        </Kv.Accordion>
        <Kv.Accordion title="Idiomas">

        </Kv.Accordion>
      </div>
    );
  }
}
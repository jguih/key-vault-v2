import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useGenre from "../../../../hooks/useGenre";
import filterStyles from "../../../../scss/modules/pages/game/search/Filters.module.scss";

export default function Filters({ games, onFilter }) {
  const router = useRouter();
  const [genresFilterMap, setGenresFilterMap] = useState(new Map());
  const { genres, isLoading, isError } = useGenre();

  useEffect(() => {
    if (router.isReady) {
      // Gets initial data from the URL
      // Initial genre 
      if (router.query.genres) {
        setGenresFilterMap(ArrToMap(router.query.genres.split(".")));
      }
    }
  }, [router])

  useEffect(() => {
    if (genresFilterMap) {
      // Decides if games will be filtered based on genre
      let filter = false;
      const genresArr = Array.from(genresFilterMap);
      genresArr.forEach(genre => {
        // If there's any true value inside genresArr games will be filtered
        if (genre[1]) {
          filter = true;
          return;
        }
      });

      if (filter) {
        // Gets an array of current checked genres
        let genresNameArr = [];
        genresArr.forEach(genre => {
          if (genre[1]) {
            genresNameArr.push(genre[0].toLowerCase());
          }
        });

        const filteredGames = games.filter((game) => {
          // Return true if every genresNameArr genre is included in gameGenres
          return genresNameArr.every((genreName) => {
            // Get lower case game genres
            const gameGenres = game.genre.map((gameGenre) => gameGenre.toLowerCase());
            // Return true if genresNameArr genre is included in gameGenres
            return gameGenres.includes(genreName);
          })
        });
        onFilter(filteredGames);
      } else {
        // If no filters are applied, simply return all games
        onFilter(games);
      }
    }
  }, [genresFilterMap, games])

  const filter = {
    onChangeGenresFilterMap: function (genre, checked) {
      const _genres = new Map(genresFilterMap);
      _genres.set(genre, checked);
      setGenresFilterMap(_genres);
    }
  };

  if (genres) {
    return (
      <div className={`${filterStyles.container}`}>
        <Accordion title="Categorias">
          <form>
            {genres.map((genre, index) => {
              return (
                <Form.Check
                  type="checkbox"
                  label={genre.name}
                  onChange={
                    (e) => filter.onChangeGenresFilterMap(genre.name, e.target.checked)
                  }
                  checked={genresFilterMap.get(genre.name) || false}
                  key={index}
                />
              );
            })}
          </form>
        </Accordion>
      </div>
    );
  }
}

function Accordion({ title, children }) {
  const [chevron, setChevron] = useState("right");
  const accordionBodyRef = React.createRef();

  return (
    <div className={`${filterStyles.accordion}`}>
      <Button
        className={`${filterStyles["accordion-header"]}`}
        onClick={handleOnClick}
      ><i className={`bi bi-chevron-${chevron}`}></i> {title}</Button>
      <div
        className={`${filterStyles["accordion-body"]}`}
        ref={accordionBodyRef}
      >
        {children}
      </div>
    </div>
  );

  function handleOnClick() {
    // Toggle accordion body visibility
    const accordionBody = accordionBodyRef.current;
    accordionBody.classList.toggle(filterStyles["show-body"]);

    // Toggle chevron icon
    if (chevron === "right") {
      setChevron("down")
    } else {
      setChevron("right")
    }
  }
}

function ArrToMap(Arr) {
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
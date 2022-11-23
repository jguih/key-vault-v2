import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useGenre from "../../../../hooks/useGenre";
import filterStyles from "../../../../scss/modules/pages/game/search/Filters.module.scss";

export default function Filters({ games, onFilter }) {
  const router = useRouter();
  const [checkedGenres, setCheckedGenres] = useState([]);
  const { genres, isLoading, isError } = useGenre();

  useEffect(() => {
    let filteredGames = games;
    if (router.isReady) {

      if (router.query.genres) {
        const genresArr = router.query.genres.split(".")
          .map(genre => genre.toLowerCase());

        setCheckedGenres(genresArr);
        console.log(router.query.genres)

        filteredGames = filteredGames.filter((game) => {
          const gameGenres = game.genre.map((gameGenre) => gameGenre.toLowerCase());
          // Return true if every genresNameArr genre is included in gameGenres
          return genresArr.every((genreName) => {
            // Return true if genresNameArr genre is included in gameGenres
            return gameGenres.includes(genreName);
          })
        });

      }
      onFilter(filteredGames);
    }
  }, [router, games]);

  const filter = {
    onChangeGenre: function (genre, checked) {
      const genreName = genre.name.toLowerCase();

      let myQuery;
      if (checked) {
        // Adding genre to URL
        if (router.query.genres) {
          myQuery = {
            ...router.query,
            genres: router.query.genres + "." + genreName
          }
        } else {
          myQuery = {
            ...router.query,
            genres: genreName
          }
        }
      } else {
        // Removing genre from URL
        let genresArr = router.query.genres.split(".");
        genresArr = genresArr.map((genre) => genre.toLowerCase());
        const newGenres = genresArr.filter((genre) => genre !== genreName);

        myQuery = {
          ...router.query,
          genres: newGenres.join(".")
        }
      }
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    getCheckedGenre: function (genre) {
      const genreName = genre.name.toLowerCase();
      return checkedGenres ? checkedGenres.includes(genreName) : false;
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
                  onChange={(e) => filter.onChangeGenre(genre, e.target.checked)}
                  defaultChecked={filter.getCheckedGenre(genre)}
                  key={index}
                />
              );
            })}
          </form>
        </Accordion>
        <Accordion title="Modos de Jogo">

        </Accordion>
        <Accordion title="Plataformas">

        </Accordion>
        <Accordion title="Preço">

        </Accordion>
        <Accordion title="Data de Lançamento">

        </Accordion>
        <Accordion title="Idiomas">

        </Accordion>
      </div>
    );
  }
}

function Accordion({ title, children }) {
  const [chevron, setChevron] = useState("right");
  const accordionBodyRef = React.createRef();

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
}


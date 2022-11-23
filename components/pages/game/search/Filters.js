import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useGenre from "../../../../hooks/useGenre";
import filterStyles from "../../../../scss/modules/pages/game/search/Filters.module.scss";

export default function Filters({ games, onFilter }) {
  const router = useRouter();
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [checkedDiscount, setCheckedDiscount] = useState();
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
      }
      // Filter by discount
      if (router.query.discounted) {
        setCheckedDiscount(true);

        filteredGames = filteredGames.filter((game) => {
          return game.isDiscountActive;
        });
      }

      onFilter(filteredGames);
    }
  }, [router, games]);

  const filter = {
    onChangeGenre: function (genre, checked) {
      const genreName = genre.name.toLowerCase();

      let myQuery = { ...router.query };
      if (checked) {
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
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    getCheckedGenre: function (genre) {
      const genreName = genre.name.toLowerCase();
      return checkedGenres ? checkedGenres.includes(genreName) : false;
    },
    onChangeDiscounted: function (checked) {
      let myQuery = { ...router.query };
      if (checked) {
        // Adding 'discounted=true' to URL
        myQuery = {
          ...router.query,
          discounted: true
        }
      } else {
        // Removing 'discounted=true' from URL
        delete myQuery.discounted;
      }
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
          <Form.Check
            className={`${filterStyles.checkbox}`}
            type="checkbox"
            label="Promoção"
            onChange={(e) => filter.onChangeDiscounted(e.target.checked)}
            defaultChecked={checkedDiscount}
          />
        </form>
        <Accordion title="Categorias">
          <form>
            {genres.map((genre, index) => {
              return (
                <Form.Check
                  className={`${filterStyles.checkbox}`}
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
  const headerRef = React.createRef();

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

    headerRef.current.classList.toggle(filterStyles.active);
  }

  return (
    <div className={`${filterStyles.accordion}`}>
      <Button
        className={`${filterStyles["accordion-header"]}`}
        onClick={handleOnClick}
        ref={headerRef}
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


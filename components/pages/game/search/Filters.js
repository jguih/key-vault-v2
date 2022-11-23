import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useGenre from "../../../../hooks/useGenre";
import filterStyles from "../../../../scss/modules/pages/game/search/Filters.module.scss";

export default function Filters({ games, onFilter }) {
  const router = useRouter();

  // States below are controlled by router changes
  const [checkedGenres, setCheckedGenres] = useState([]); // Genre checkboxes state
  const [checkedDiscount, setCheckedDiscount] = useState(); // Discount checkbox state
  const [shouldExpandGenres, setShouldExpandGenres] = useState();

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
        setShouldExpandGenres(true);

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
        setShouldExpandGenres(false);
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

      onFilter(filteredGames);
    }
  }, [router, games, onFilter]);

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
      console.log(genreName, checkedGenres.includes(genreName))
      return checkedGenres.includes(genreName);
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
            checked={checkedDiscount || false}
            id="discounted"
          />
        </form>
        <Accordion title="Categorias" expand={shouldExpandGenres}>
          <form>
            {genres.map((genre, index) => {
              return (
                <Form.Check
                  className={`${filterStyles.checkbox}`}
                  type="checkbox"
                  label={genre.name}
                  onChange={(e) => filter.onChangeGenre(genre, e.target.checked)}
                  checked={checkedGenres.includes(genre.name.toLowerCase())}
                  key={index}
                  id={genre.name}
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

function Accordion({ title, children, expand }) {
  const [chevron, setChevron] = useState("right");
  const accordionBodyRef = React.createRef();
  const headerRef = React.createRef();

  function toggleChevron() {
    const accordionBody = accordionBodyRef.current;
    
    if (accordionBody.classList.contains(filterStyles["show-body"])) {
      setChevron("down");
    } else {
      setChevron("right")
    }
  }

  function toggleExpandAccordion() {
    // Toggle accordion body visibility
    const accordionBody = accordionBodyRef.current;
    accordionBody.classList.toggle(filterStyles["show-body"]);

    toggleChevron();

    headerRef.current.classList.toggle(filterStyles.active);
  }

  function expandAccordion() {
    const accordionBody = accordionBodyRef.current;
    accordionBody.classList.add(filterStyles["show-body"]);

    toggleChevron();

    headerRef.current.classList.add(filterStyles.active);
  }

  useEffect(() => {
    if (expand) {
      expandAccordion();
    }
  }, [expand])

  return (
    <div className={`${filterStyles.accordion}`}>
      <Button
        className={`${filterStyles["accordion-header"]}`}
        onClick={toggleExpandAccordion}
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


import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { getGamemode, getPlatformsIcons, toFirstUpperCase } from "../../../../global";
import useData from "../../../../hooks/useData";
import useGame from "../../../../hooks/useGame";
import styles from "../../../../scss/modules/pages/game/search/Filters.module.scss";
import * as Kv from "../../../ui/Kv";

const FilterContext = React.createContext();

export default function Filters({ onFilter }) {
  const router = useRouter();
  const { games, isLoading, isError } = useGame();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  // States below are controlled by router changes
  const [checkedGenres, setCheckedGenres] = useState([]); // Genre checkboxes state
  const [checkedDiscount, setCheckedDiscount] = useState(); // Discount checkbox state
  const [checkedGamemodes, setCheckedGamemodes] = useState([]); // Game mode checkboxes state
  const [checkedPlatforms, setCheckedPlatforms] = useState([]); // Platform checkboxes state
  const [checkedLanguages, setCheckedLanguages] = useState([]); // Languages checkboxes state

  const checked = {
    checkedGenres,
    checkedDiscount,
    checkedGamemodes,
    checkedLanguages,
    checkedPlatforms
  }

  useEffect(() => {
    if (router.isReady && games) {
      let filteredGames = games
        ?.sort((gameA, gameB) => {
          if (gameA.name < gameB.name) {
            return -1;
          }
          if (gameA.name > gameB.name) {
            return 1;
          }
          return 0
        });
      // Filter by entry
      if (router.query.entry) {
        const entry = router.query.entry;
        // Filter games that matches the name exactly
        const games1 = filteredGames.filter((game) => {
          if (entry) {
            return game.name.toLowerCase().includes(entry.toLowerCase());
          }
        })
        // Filter games that contains all name characters
        // Also include all games if entry is undefined
        const games2 = filteredGames.filter((game) => {
          if (entry) {
            const nameArr = entry.toLowerCase().split("");
            return nameArr.every((char) => game.name.toLowerCase().includes(char));
          } else return true;
        })
        filteredGames = [...new Set(games1.concat(games2))];
      }
      // Filter by genre
      if (router.query.genres) {
        // Get genres from URL
        const genresArr = router.query.genres.split(".")
          .map(genre => genre.toLowerCase());

        setCheckedGenres(genresArr);

        filteredGames = filteredGames.filter((game) => {
          const gameGenres = game["game_genre"]
            ?.map((gameGenre) => gameGenre.name.toLowerCase());
          // Return true if every genresArr genre is included in gameGenres
          return genresArr.every((genreName) => {
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
          const gameGamemodes = game["game_gamemode"]
            ?.map(g => g.name.toLowerCase());
          return gamemodesArr.every(gamemodeName => {
            return gameGamemodes?.includes(gamemodeName);
          })
        })
      } else {
        setCheckedGamemodes([]);
      }
      // Filter by platforms
      if (router.query.platforms) {
        const platformsArr = router.query.platforms.split(".")
          .map(p => p.toLowerCase());

        setCheckedPlatforms(platformsArr);

        filteredGames = filteredGames.filter((game) => {
          const gamePlatforms = game["game_platform"]
            ?.map(g => g.name.toLowerCase());
          return platformsArr.every(platformName => {
            return gamePlatforms?.includes(platformName);
          })
        })
      } else {
        setCheckedPlatforms([]);
      }
      // Filter by languages
      if (router.query.languages) {
        const languagesArr = router.query.languages.split(".")
          .map(l => l.toLowerCase());

        setCheckedLanguages(languagesArr);

        filteredGames = filteredGames.filter((game) => {
          const gameLanguages = game["game_language_support"]
            ?.map(ls => ls.language)?.map(l => l["ptBR_name"]?.toLowerCase());
          return languagesArr.every(languageName => {
            return gameLanguages?.includes(languageName);
          })
        })
      } else {
        setCheckedLanguages([]);
      }
      // Order By Price Asc
      if (router.query.sort?.toLowerCase() === "priceasc") {
        filteredGames = filteredGames
          .sort((gameA, gameB) => {
            let priceA;
            let priceB;

            if (gameA.isDiscountActive) {
              priceA = gameA.price - (1 * gameA.price * gameA.discount);
            } else {
              priceA = gameA.price;
            }

            if (gameB.isDiscountActive) {
              priceB = gameB.price - (1 * gameB.price * gameB.discount);
            } else {
              priceB = gameB.price;
            }

            if (priceA < priceB) {
              return -1;
            } else if (priceA > priceB) {
              return 1;
            }
            return 0;
          })
      }
      // Order By Price Desc
      if (router.query.sort?.toLowerCase() === "pricedesc") {
        filteredGames = filteredGames
          .sort((gameA, gameB) => {
            let priceA;
            let priceB;

            if (gameA.isDiscountActive) {
              priceA = gameA.price - (1 * gameA.price * gameA.discount);
            } else {
              priceA = gameA.price;
            }

            if (gameB.isDiscountActive) {
              priceB = gameB.price - (1 * gameB.price * gameB.discount);
            } else {
              priceB = gameB.price;
            }

            if (priceA > priceB) {
              return -1;
            } else if (priceA < priceB) {
              return 1;
            }
            return 0;
          })
      }
      // Order by Name Asc
      if (router.query.sort?.toLowerCase() === "nameasc") {
        filteredGames = filteredGames
          .sort((gameA, gameB) => {
            if (gameA.name < gameB.name) {
              return -1;
            }
            if (gameA.name > gameB.name) {
              return 1;
            }
            return 0
          });
      }
      // Order by Name Desc
      if (router.query.sort?.toLowerCase() === "namedesc") {
        filteredGames = filteredGames
          .sort((gameA, gameB) => {
            if (gameA.name > gameB.name) {
              return -1;
            }
            if (gameA.name < gameB.name) {
              return 1;
            }
            return 0
          });
      }
      // Order by Release Date Asc
      if (router.query.sort?.toLowerCase() === "releasedateasc") {
        filteredGames = filteredGames
          .sort((gameA, gameB) => {
            if (gameA.releaseDate === "") return 1;
            if (gameB.releaseDate === "") return -1;
            const dateA = new Date(gameA.releaseDate);
            const dateB = new Date(gameB.releaseDate);
            if (dateA > dateB) {
              return 1;
            }
            if (dateA < dateB) {
              return -1;
            }
            return 0;
          });
      }
      // Order by Release Date Desc
      if (router.query.sort?.toLowerCase() === "releasedatedesc") {
        filteredGames = filteredGames
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
          })
      }
      onFilter([...filteredGames]);
    }
  }, [router, games, onFilter]);

  return (
    <FilterContext.Provider value={checked}>
      <div className={`${styles["main-container"]}`}>
        <FiltersBody />
      </div>
      <div className={`${styles["responsive-container"]}`}>
        <Button
          onClick={() => setShowOffCanvas(true)}
          variant="kv-secondary-800"
        >
          Filtros
        </Button>
        <FiltersOffCanvas
          show={showOffCanvas}
          handleHide={() => setShowOffCanvas(false)}
        >
          <FiltersBody />
        </FiltersOffCanvas>
      </div>
    </FilterContext.Provider>
  );
}

function FiltersBody() {
  const fc = useContext(FilterContext);
  const { checkedDiscount, checkedGenres, checkedGamemodes, checkedLanguages, checkedPlatforms } = fc;
  const { data } = useData();
  const router = useRouter();

  const filter = {
    onChangeGenre: function (genre, e) {
      e.preventDefault();
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
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    shouldCheckGenre: function (genre) {
      const genreName = genre.name.toLowerCase();
      return checkedGenres.includes(genreName);
    },
    getGenreEndLabel: function () {
      if (checkedGenres?.length > 0) {
        return (
          <p className={`${styles["end-label"]} m-0`}>
            {checkedGenres.length}
          </p>
        )
      } else return;
    },
    onClickGenreEndLabel: function () {
      let myQuery = { ...router.query };
      delete myQuery.genres;
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    onChangeDiscounted: function (e) {
      e.preventDefault();
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
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    onChangeGamemode: function (gamemode, e) {
      e.preventDefault();
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
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    shouldCheckGamemode: (gamemode) => {
      const gamemodeName = gamemode.name.toLowerCase();
      return checkedGamemodes?.includes(gamemodeName);
    },
    getGamemodeEndLabel: function () {
      if (checkedGamemodes?.length > 0) {
        return (
          <p className={`${styles["end-label"]} m-0`}>
            {checkedGamemodes.length}
          </p>
        )
      } else return;
    },
    onClickGamemodeEndLabel: function () {
      let myQuery = { ...router.query };
      delete myQuery.gamemodes;
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    onChangePlatform: function (platform, e) {
      e.preventDefault();
      const platformName = platform.name.toLowerCase();

      let myQuery = { ...router.query };
      if (e.target.checked) {
        if (router.query.platforms) {
          myQuery.platforms = router.query.platforms + "." + platformName;
        } else {
          myQuery.platforms = platformName;
        }
      } else {
        const newPlatforms = checkedPlatforms.filter((p) => p !== platformName);
        if (newPlatforms.length > 0) {
          myQuery.platforms = newPlatforms.join(".");
        } else {
          delete myQuery.platforms;
        }
      }
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    shouldCheckPlatform: function (platform) {
      const platformName = platform.name.toLowerCase();
      return checkedPlatforms.includes(platformName);
    },
    getPlatformEndLabel: function () {
      if (checkedPlatforms?.length > 0) {
        return (
          <p className={`${styles["end-label"]} m-0`}>
            {checkedPlatforms.length}
          </p>
        )
      } else return;
    },
    onClickPlatformEndLabel: function () {
      let myQuery = { ...router.query };
      delete myQuery.platforms;
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    onChangeLanguage: function (language, e) {
      e.preventDefault();
      const languageName = language["ptBR_name"]?.toLowerCase();
      if (!languageName) return;

      let myQuery = { ...router.query };
      if (e.target.checked) {
        if (router.query.languages) {
          myQuery.languages = router.query.languages + "." + languageName;
        } else {
          myQuery.languages = languageName;
        }
      } else {
        const newLanguages = checkedLanguages.filter((p) => p !== languageName);
        if (newLanguages.length > 0) {
          myQuery.languages = newLanguages.join(".");
        } else {
          delete myQuery.languages;
        }
      }
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    },
    shouldCheckLanguage: function (language) {
      const languageName = language?.["ptBR_name"]?.toLowerCase();
      return checkedLanguages.includes(languageName);
    },
    getLanguageEndLabel: function () {
      if (checkedLanguages?.length > 0) {
        return (
          <p className={`${styles["end-label"]} m-0`}>
            {checkedLanguages.length}
          </p>
        )
      } else return;
    },
    onClickLanguageEndLabel: function () {
      let myQuery = { ...router.query };
      delete myQuery.languages;
      myQuery.page = 1;
      router.push({
        pathname: "/game",
        query: myQuery
      })
    }
  };

  if (!data) return;

  return (
    <div className={`${styles.container} sticky-top pt-3`}>
      <Kv.Checkbox
        type="checkbox"
        label="Promoção"
        onChange={(e) => filter.onChangeDiscounted(e)}
        checked={checkedDiscount || false}
        id="discounted"
      />
      <Kv.Accordion
        title="Categorias"
        expand={checkedGenres?.length > 0}
        bodyHeight={400}
        endLabel={filter.getGenreEndLabel()}
        onClickEndLabel={() => filter.onClickGenreEndLabel()}
      >
        {data.genres?.map((genre, index) => {
          return (
            <Kv.Checkbox
              type="checkbox"
              label={genre.name}
              onChange={(e) => filter.onChangeGenre(genre, e)}
              checked={filter.shouldCheckGenre(genre)}
              key={index}
              id={genre.name}
            />
          );
        })}
      </Kv.Accordion>
      <Kv.Accordion
        title="Modos de Jogo"
        expand={checkedGamemodes?.length > 0}
        bodyHeight={100}
        endLabel={filter.getGamemodeEndLabel()}
        onClickEndLabel={() => filter.onClickGamemodeEndLabel()}
      >
        {data.gamemodes?.map((gamemode, index) => {
          return (
            <Kv.Checkbox
              type="checkbox"
              label={getGamemode(gamemode.name)}
              onChange={(e) => filter.onChangeGamemode(gamemode, e)}
              checked={filter.shouldCheckGamemode(gamemode)}
              key={index}
              id={gamemode.name}
            />
          );
        })}
      </Kv.Accordion>
      <Kv.Accordion
        title="Plataformas"
        expand={checkedPlatforms?.length > 0}
        bodyHeight={100}
        endLabel={filter.getPlatformEndLabel()}
        onClickEndLabel={() => filter.onClickPlatformEndLabel()}
      >
        {data.platforms?.map((platform, index) => {
          return (
            <Kv.Checkbox
              type="checkbox"
              label={getPlatformsIcons(platform.name, { withName: true })}
              onChange={(e) => filter.onChangePlatform(platform, e)}
              checked={filter.shouldCheckPlatform(platform)}
              key={index}
              id={platform.name}
            />
          );
        })}
      </Kv.Accordion>
      <Kv.Accordion
        title="Idiomas"
        expand={checkedLanguages?.length > 0}
        bodyHeight={320}
        endLabel={filter.getLanguageEndLabel()}
        onClickEndLabel={() => filter.onClickLanguageEndLabel()}
      >
        {data.languages?.map((language, index) => {
          return (
            <Kv.Checkbox
              type="checkbox"
              label={toFirstUpperCase(language["ptBR_name"])}
              onChange={(e) => filter.onChangeLanguage(language, e)}
              checked={filter.shouldCheckLanguage(language)}
              key={index}
              id={language["ptBR_name"]}
            />
          );
        })}
      </Kv.Accordion>
    </div>
  )
}

function FiltersOffCanvas({ show, handleHide, children }) {
  return (
    <Offcanvas
      show={show}
      onHide={handleHide}
      className="text-bg-kv-primary-900"
    >
      <Offcanvas.Header>
        <Offcanvas.Title>
          Filtros
        </Offcanvas.Title>
        <Button className={`${styles["offcanvas-close-btn"]}`} onClick={handleHide}>
          <i className="bi bi-x-lg"></i>
        </Button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
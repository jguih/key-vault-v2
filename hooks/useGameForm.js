import { useEffect, useReducer, useState } from "react";
import { decimalFormatter, GameFields, GameSystemRequirements, getFullDate, getGamemode, getIGDBImageURL, getPlatformsIcons, IGDBImageSize, imgTypes, toFirstUpperCase } from "../global";
import useData from "./useData";
import { errorsActions, useGameFormErrors } from "./useGameFormErrors";
import useGame from "./useGame";

export const gameActions = {
  AddFieldValue: "ADD-FIELD-VALUE",
  ToggleGenre: "TOGGLE-GENRE",
  ToggleGamemode: "TOGGLE-GAMEMODE",
  TogglePlatform: "TOGGLE-PLATFORM",
  ToggleIsDiscountActive: "TOGGLE-IS-DISCOUNT-ACTIVE",
  AddImg: "ADD-IMG",
  RemoveImg: "REMOVE-IMG",
  AddGameLanguageSupport: "ADD-GAME-LANGUAGE-SUPPORT",
  RemoveGameLanguageSupport: "REMOVE-GAME-LANGUAGE-SUPPORT",
  AddSysReqFieldValue: "ADD-SYSTEM-REQUIREMENTS-FIELD-VALUE",
  Reset: "RESET",
}

function validateLanguageSupport(languageSupport) {
  if (Object.keys(languageSupport.language).length === 0 ||
    !languageSupport.hasOwnProperty("audio") ||
    !languageSupport.hasOwnProperty("subtitles") ||
    !languageSupport.hasOwnProperty("interface")) {
    return false;
  }
  if (languageSupport.audio !== true && languageSupport.audio !== false) {
    return false;
  }
  if (languageSupport.subtitles !== true && languageSupport.subtitles !== false) {
    return false;
  }
  if (languageSupport.interface !== true && languageSupport.interface !== false) {
    return false;
  }
  return true;
}

const gameReducer = (state, action) => {
  switch (action.type) {

    case gameActions.AddFieldValue:
      return {
        ...state,
        [action.field]: action.payload,
      };

    case gameActions.ToggleGenre:
      let genres = state[GameFields.GameGenre];
      if (action.checked) {
        if (!genres.map(g => g.id).includes(action.payload.id)) {
          genres.push(action.payload);
        }
      } else {
        genres = genres.filter(genre => genre.id !== action.payload.id);
      }
      return {
        ...state,
        game_genre: genres
      }

    case gameActions.ToggleGamemode:
      let gamemodes = state[GameFields.GameGamemode];
      if (action.checked) {
        if (!gamemodes.map(g => g.id).includes(action.payload.id)) {
          gamemodes.push(action.payload);
        }
      } else {
        gamemodes = gamemodes.filter(g => g.id !== action.payload.id);
      }
      return {
        ...state,
        game_gamemode: gamemodes
      }

    case gameActions.TogglePlatform:
      let platforms = state["game_platform"];
      if (action.checked) {
        platforms.push(action.payload);
      } else {
        platforms = platforms.filter(p => p.id !== action.payload.id);
      }
      return {
        ...state,
        game_platform: platforms
      }

    case gameActions.ToggleIsDiscountActive:
      return {
        ...state,
        isDiscountActive: action.checked
      }

    case gameActions.AddImg:
      if (!action.payload.hasOwnProperty("type")) return state;
      if (!action.payload.hasOwnProperty("url")) return state;
      if (action.payload.type !== imgTypes.Cover &&
        action.payload.type !== imgTypes.Screenshot &&
        action.payload.type !== imgTypes.Artwork) return state;
      return {
        ...state,
        game_image: [...state[GameFields.GameImage], action.payload]
      }

    case gameActions.RemoveImg:
      let images = state[GameFields.GameImage];
      images = images.filter(image => image != action.payload);
      return {
        ...state,
        game_image: images
      }

    case gameActions.AddGameLanguageSupport:
      if (!validateLanguageSupport(action.payload)) return state;
      const currentLs = state[GameFields.GameLanguageSupport];
      const currentLsLanguageIds = currentLs.map(ls => ls.language.id);
      if (currentLsLanguageIds.includes(action.payload.language.id)) return state;
      return {
        ...state,
        game_language_support: [
          ...state[GameFields.GameLanguageSupport],
          action.payload
        ]
      }

    case gameActions.RemoveGameLanguageSupport:
      if (!validateLanguageSupport(action.payload)) return state;
      let languageSupport = state[GameFields.GameLanguageSupport];
      languageSupport = languageSupport
        .filter(ls => ls.language.id !== action.payload.language.id);
      return {
        ...state,
        game_language_support: languageSupport
      }

    case gameActions.AddSysReqFieldValue:
      let minimmumSysReq = state["game_system_requirements"]
        .filter(gsr => gsr.type === GameSystemRequirements.Minimum);
      let recommendedSysReq = state["game_system_requirements"]
        .filter(gsr => gsr.type === GameSystemRequirements.Recommended);
      if (action.sysType === GameSystemRequirements.Minimum) {
        // Invalid Field
        if (!minimmumSysReq[0].hasOwnProperty(`${action.field}`)) return state;

        minimmumSysReq[0][action.field] = action.payload;
      } else if (action.sysType === GameSystemRequirements.Recommended) {
        // Invalid Field
        if (!minimmumSysReq[0].hasOwnProperty(`${action.field}`)) return state;

        recommendedSysReq[0][action.field] = action.payload;
      } else { // Invalid type
        return state;
      }
      return {
        ...state,
        game_system_requirements: minimmumSysReq.concat(recommendedSysReq)
      }

    case gameActions.Reset:
      return {
        [GameFields.name]: "",
        [GameFields.description]: "",
        [GameFields.developer]: "",
        [GameFields.publisher]: "",
        [GameFields.releaseDate]: "",
        [GameFields.price]: "",
        [GameFields.discount]: "0",
        [GameFields.isDiscountActive]: false,
        [GameFields.GameLanguageSupport]: [],
        [GameFields.GameSystemRequirements]: [
          {
            [GameFields.GameSystemRequirementsFields.type]: "minimum",
            [GameFields.GameSystemRequirementsFields.so]: "",
            [GameFields.GameSystemRequirementsFields.storage]: "",
            [GameFields.GameSystemRequirementsFields.cpu]: "",
            [GameFields.GameSystemRequirementsFields.memory]: "",
            [GameFields.GameSystemRequirementsFields.gpu]: "",
            [GameFields.GameSystemRequirementsFields.directx]: "",
            [GameFields.GameSystemRequirementsFields.internet]: "",
            [GameFields.GameSystemRequirementsFields.other]: ""
          },
          {
            [GameFields.GameSystemRequirementsFields.type]: "recommended",
            [GameFields.GameSystemRequirementsFields.so]: "",
            [GameFields.GameSystemRequirementsFields.storage]: "",
            [GameFields.GameSystemRequirementsFields.cpu]: "",
            [GameFields.GameSystemRequirementsFields.memory]: "",
            [GameFields.GameSystemRequirementsFields.gpu]: "",
            [GameFields.GameSystemRequirementsFields.directx]: "",
            [GameFields.GameSystemRequirementsFields.internet]: "",
            [GameFields.GameSystemRequirementsFields.other]: ""
          }
        ],
        [GameFields.GamePlatform]: [],
        [GameFields.GameGenre]: [],
        [GameFields.GameGamemode]: [],
        [GameFields.GameImage]: [],
      }

    default:
      return state;
  }
}

const initialValues = {
  [GameFields.name]: "",
  [GameFields.description]: "",
  [GameFields.developer]: "",
  [GameFields.publisher]: "",
  [GameFields.releaseDate]: "",
  [GameFields.price]: "",
  [GameFields.discount]: "0",
  [GameFields.isDiscountActive]: false,
  [GameFields.GameLanguageSupport]: [],
  [GameFields.GameSystemRequirements]: [
    {
      [GameFields.GameSystemRequirementsFields.type]: "minimum",
      [GameFields.GameSystemRequirementsFields.so]: "",
      [GameFields.GameSystemRequirementsFields.storage]: "",
      [GameFields.GameSystemRequirementsFields.cpu]: "",
      [GameFields.GameSystemRequirementsFields.memory]: "",
      [GameFields.GameSystemRequirementsFields.gpu]: "",
      [GameFields.GameSystemRequirementsFields.directx]: "",
      [GameFields.GameSystemRequirementsFields.internet]: "",
      [GameFields.GameSystemRequirementsFields.other]: ""
    },
    {
      [GameFields.GameSystemRequirementsFields.type]: "recommended",
      [GameFields.GameSystemRequirementsFields.so]: "",
      [GameFields.GameSystemRequirementsFields.storage]: "",
      [GameFields.GameSystemRequirementsFields.cpu]: "",
      [GameFields.GameSystemRequirementsFields.memory]: "",
      [GameFields.GameSystemRequirementsFields.gpu]: "",
      [GameFields.GameSystemRequirementsFields.directx]: "",
      [GameFields.GameSystemRequirementsFields.internet]: "",
      [GameFields.GameSystemRequirementsFields.other]: ""
    }
  ],
  [GameFields.GamePlatform]: [],
  [GameFields.GameGenre]: [],
  [GameFields.GameGamemode]: [],
  [GameFields.GameImage]: [],
}

export function useGameForm() {
  const [game, dispatchGame] = useReducer(gameReducer, initialValues);
  const { error, dispatchError, validate } = useGameFormErrors();
  const { data } = useData();
  const [isIgdbDispatched, setIsIgdbDispatched] = useState(false);
  const [igdbNotFound, setIgdbNotFound] = useState({});
  const {games, isLoading, isError, names} = useGame();

  useEffect(() => {
    if (isIgdbDispatched) {
      document.getElementsByName("field").forEach(e => {
        e.focus();
        e.blur();
      })
    }
  }, [isIgdbDispatched])

  const field = (name, options) => {
    return {
      name: "field",
      id: name,
      value: game[name] || "",
      onChange: (e) => {
        dispatchGame({
          type: gameActions.AddFieldValue,
          field: name,
          payload: e.target.value
        })
        validate.field(name, e, options);
        if (name === GameFields.name && names?.includes(e.target.value.toLowerCase())) {
          dispatchError({
            type: errorsActions.AddFieldError,
            name: name,
            payload: {
              type: "invalid name",
              message: "Jogo já existe!"
            }
          })
        }
      },
      onBlur: (e) => {
        validate.field(name, e, options);
        if (name === GameFields.name && names?.includes(e.target.value.toLowerCase())) {
          dispatchError({
            type: errorsActions.AddFieldError,
            name: name,
            payload: {
              type: "invalid name",
              message: "Jogo já existe!"
            }
          })
        }
      },
      onInvalid: (e) => {
        e.preventDefault();
        validate.field(name, e, options);
      },
      onKeyDown: (e) => {
        // Prevents user from submitting form when ENTER key pressed
        if (e.keyCode === 13) {
          e.preventDefault();
        }
        // Prevents user from typing '-' if options.min is set to 0
        if (options?.min === "0" && (e.keyCode === 189 || e.keyCode === 109)) {
          e.preventDefault();
        }
      },
      spellCheck: "false",
      required: options?.required || false,
      max: options?.max || "",
      min: options?.min || "",
      step: options?.step || "",
    }
  };

  const genre = (genre) => {
    return {
      name: "genres",
      id: genre.name,
      checked: game[GameFields.GameGenre]?.map(genre => genre.id)?.includes(genre.id) ?? false,
      label: toFirstUpperCase(genre.name),
      type: "checkbox",
      onChange: (e) => {
        dispatchGame({
          type: gameActions.ToggleGenre,
          checked: e.target.checked,
          payload: genre
        })
      },
    }
  }

  const gamemode = (gamemode) => {
    return {
      name: "gamemodes",
      id: gamemode.name,
      checked: game[GameFields.GameGamemode]?.map(g => g.id)?.includes(gamemode.id) ?? false,
      label: getGamemode(toFirstUpperCase(gamemode.name)),
      type: "checkbox",
      onChange: (e) => {
        dispatchGame({
          type: gameActions.ToggleGamemode,
          checked: e.target.checked,
          payload: gamemode
        })
      }
    }
  }

  const platform = (platform) => {
    return {
      name: "platforms",
      id: platform.name,
      checked: game[GameFields.GamePlatform]?.map(p => p.id)?.includes(platform.id) ?? false,
      label: getPlatformsIcons(platform.name, { withName: true }),
      type: "checkbox",
      onChange: (e) => {
        dispatchGame({
          type: gameActions.TogglePlatform,
          checked: e.target.checked,
          payload: platform
        })
      }
    }
  }

  const isDiscountActive = (name) => {
    return {
      name: name,
      id: name,
      checked: game.discount > 0 ? game.isDiscountActive : false,
      label: name,
      type: "checkbox",
      onChange: (e) => {
        dispatchGame({
          type: gameActions.ToggleIsDiscountActive,
          checked: game.discount > 0 ? e.target.checked : false
        })
      }
    }
  }

  const urlField = (name, type) => {
    return {
      name: name,
      onKeyDown: (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }

        const [valid, validURL] = validate.urlField(name, e);

        if (valid) {
          dispatchGame({
            type: gameActions.AddImg,
            payload: {
              type: type,
              url: validURL.href
            }
          })
          // Clear urlField
          e.target.value = null;
        }
      },
      onBlur: (e) => {
        validate.urlField(name, e, { onBlur: true });
      }
    }
  }

  const sysReqField = (name, type) => {
    return {
      name: name,
      label: toFirstUpperCase(name),
      value: game[GameFields.GameSystemRequirements].filter(gsr => gsr.type === type)[0][name],
      onChange: (e) => {
        dispatchGame({
          type: gameActions.AddSysReqFieldValue,
          sysType: type,
          field: e.target.name,
          payload: e.target.value
        })
      },
      onKeyDown: (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      }
    };
  }

  const dispatchIGDBGame = (gameData, func) => {
    if (!gameData || !gameData.game ||
      !gameData.languageSupport || !gameData.involvedCompanies) {
      return;
    }
    const game = gameData.game;
    const artworks = game.artworks?.map(artwork => {
      return {
        type: imgTypes.Artwork,
        url: getIGDBImageURL(IGDBImageSize.original, artwork["image_id"])
      };
    });
    const cover = {
      type: imgTypes.Cover,
      url: getIGDBImageURL(IGDBImageSize.cover_big, game.cover?.["image_id"])
    }
    const screenshots = game.screenshots?.map(screenshot => {
      return {
        type: imgTypes.Screenshot,
        url: getIGDBImageURL(IGDBImageSize.original, screenshot["image_id"])
      };
    })
    const firstReleaseDate = getFullDate(game["first_release_date"]);
    const gamemodesNameArr = game["game_modes"]?.map(gm => gm.name.toLowerCase());
    // Every gamemode that matches both IGDB game and KeyVault's database
    const matchGamemodes = data.gamemodes
      ?.filter(gamemode => gamemodesNameArr.includes(gamemode.name.toLowerCase()));
    const genresNameArr = game.genres?.map(g => g.name.toLowerCase());
    // Every genre that matches both IGDB game and KeyVault's database
    const matchGenres = data.genres
      ?.filter(genre => genresNameArr.includes(genre.name.toLowerCase()));
    const name = game.name;
    const summary = game.summary;

    const languageSupport = gameData.languageSupport;
    const languageSupportArr = languageSupport
      ?.map(ls => {
        return {
          name: ls.language.name.toLowerCase(),
          type: ls["language_support_type"].name.toLowerCase()
        }
      });
    const languageSupportNamesArr = languageSupportArr?.map(l => l.name.toLowerCase());
    const matchLanguages = data.languages
      ?.filter(l => languageSupportNamesArr.includes(l["enUS_name"].toLowerCase()));
    const matchLanguageSupport = matchLanguages.map(ml => {
      const ls = languageSupportArr?.filter(ls => ls.name === ml["enUS_name"]);
      return {
        language: {
          ...ml
        },
        audio: ls.map(ls => ls.type).includes("audio"),
        subtitles: ls.map(ls => ls.type).includes("subtitles"),
        interface: ls.map(ls => ls.type).includes("interface")
      }
    })

    const involvedCompanies = gameData.involvedCompanies;
    const developersNameArr = involvedCompanies?.filter(ic => ic.developer === true)
      ?.map(ic => ic.company.name);
    const publisherNameArr = involvedCompanies?.filter(ic => ic.publisher === true)
      ?.map(ic => ic.company.name);

    const kvGenresNameArr = data.genres?.map(g => g.name.toLowerCase());
    const kvGamemodesNameArr = data.gamemodes?.map(g => g.name.toLowerCase());
    const kvLanguagesNameArr = data.languages?.map(l => l["enUS_name"].toLowerCase());
    // Values that were not found in current KeyVault's database, 
    // but were present in the IGDB game
    const notFound = {
      genres: genresNameArr
        ?.filter(genreName => !kvGenresNameArr?.includes(genreName)),
      gamemodes: gamemodesNameArr
        ?.filter(gamemodeName => !kvGamemodesNameArr?.includes(gamemodeName)),
      languages: new Set(languageSupportNamesArr
        ?.filter(l => !kvLanguagesNameArr?.includes(l)))
    }
    setIgdbNotFound(notFound);

    dispatchGame({
      type: gameActions.Reset
    })

    dispatchGame({
      type: gameActions.AddFieldValue,
      field: GameFields.name,
      payload: name || ""
    })

    dispatchGame({
      type: gameActions.AddFieldValue,
      field: GameFields.description,
      payload: summary || ""
    })

    dispatchGame({
      type: gameActions.AddFieldValue,
      field: GameFields.releaseDate,
      payload: firstReleaseDate || ""
    })

    artworks?.forEach(artwork => {
      dispatchGame({
        type: gameActions.AddImg,
        payload: artwork
      })
    })

    dispatchGame({
      type: gameActions.AddImg,
      payload: cover
    })

    screenshots?.forEach(screenshot => {
      dispatchGame({
        type: gameActions.AddImg,
        payload: screenshot
      })
    })

    matchGenres?.forEach(genre => {
      dispatchGame({
        type: gameActions.ToggleGenre,
        payload: genre,
        checked: true
      })
    })

    matchGamemodes?.forEach(gamemode => {
      dispatchGame({
        type: gameActions.ToggleGamemode,
        payload: gamemode,
        checked: true
      })
    })

    dispatchGame({
      type: gameActions.AddFieldValue,
      field: GameFields.developer,
      payload: developersNameArr?.join(", ")
    })

    dispatchGame({
      type: gameActions.AddFieldValue,
      field: GameFields.publisher,
      payload: publisherNameArr?.join(", ")
    })

    matchLanguageSupport?.forEach(mls => {
      dispatchGame({
        type: gameActions.AddGameLanguageSupport,
        payload: mls
      })
    })

    if (func) func();
    setIsIgdbDispatched(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error.field).length > 0 || Object.keys(error.urlField).length > 0) {
      console.log("Error")
      return
    }
    // All fields are valid and ready to be submitted
    game.id = games[games.length - 1].id + 1;
    const price = game[GameFields.price];
    const discount = game[GameFields.discount];
    game[GameFields.price] = Number.parseFloat(price);
    game[GameFields.discount] = Number.parseInt(discount)/100;
    const gameJson = JSON.stringify(game, null, 2);
    console.log(gameJson)
    games.push(game);
    dispatchGame({
      type: gameActions.Reset
    })
    setIsIgdbDispatched(false);
    setIgdbNotFound({});
  }

  return {
    game,
    dispatchGame,
    register: {
      field,
      genre,
      isDiscountActive,
      urlField,
      gamemode,
      platform,
      sysReqField
    },
    handleSubmit,
    error,
    dispatchIGDBGame,
    isIgdbDispatched,
    igdbNotFound
  }
}
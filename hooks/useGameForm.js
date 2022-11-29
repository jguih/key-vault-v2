import { useEffect, useMemo, useReducer, useState } from "react";
import { brlCurrencyFormatter, getGamemode, getPlatformsIcons, toFirstUpperCase } from "../global";
import { errorsActions, useGameFormErrors } from "./useGameFormErrors";

export const imgTypes = {
  Cover: "cover",
  Screenshot: "screenshot",
  Artwork: "artwork"
}

export const gameActions = {
  AddFieldValue: "TEXT-INPUT",
  ToggleGenre: "TOGGLE-GENRE",
  ToggleGamemode: "TOGGLE-GAMEMODE",
  TogglePlatform: "TOGGLE-PLATFORM",
  ToggleIsDiscountActive: "TOGGLE-IS-DISCOUNT-ACTIVE",
  AddImg: "ADD-IMG",
  RemoveImg: "REMOVE-IMG",
}

const gameReducer = (state, action) => {
  switch (action.type) {

    case gameActions.AddFieldValue:
      return {
        ...state,
        [action.field]: action.payload,
      };

    case gameActions.ToggleGenre:
      let genres = state["game_genre"];
      if (action.checked) {
        genres.push(action.payload);
      } else {
        genres = genres.filter(genre => genre.id !== action.payload.id);
      }
      return {
        ...state,
        game_genre: genres
      }

    case gameActions.ToggleGamemode:
      let gamemodes = state["game_gamemode"];
      if (action.checked) {
        gamemodes.push(action.payload);
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
      return {
        ...state,
        game_image: [...state["game_image"], action.payload]
      }

    case gameActions.RemoveImg:
      let images = state["game_image"];
      images = images.filter(image => image != action.payload);
      return {
        ...state,
        game_image: images
      }

    default:
      return state;
  }
}

const initialValues = {
  name: "",
  description: "",
  developer: "",
  publisher: "",
  releaseDate: "",
  price: "",
  discount: "",
  isDiscountActive: false,
  game_language_support: [],
  game_system_requirements: [],
  game_platform: [],
  game_genre: [],
  game_gamemode: [],
  game_image: [],
}

const sample = {
  name: "Spider Man",
  description: "Homem Aranha",
  developer: "Sony",
  publisher: "Sony",
  releaseDate: "2022-06-22",
  price: "250.00",
  discount: "20",
  isDiscountActive: true,
  game_language_support: [
    {
      language: {
        id: 1,
        enUS_name: "english",
        ptBR_name: "inglês"
      },
      audio: true,
      subtitles: true,
      interface: true
    },
    {
      language: {
        id: 2,
        enUS_name: "portuguese",
        ptBR_name: "português"
      },
      audio: false,
      subtitles: true,
      interface: true
    }
  ],
  game_system_requirements: [],
  game_platform: [
    {
      "id": 1,
      "name": "steam"
    }
  ],
  game_genre: [
    {
      id: 1,
      name: "RPG"
    },
    {
      id: 2,
      name: "FPS"
    },
    {
      id: 3,
      name: "Shooter"
    }
  ],
  game_gamemode: [
    {
      "id": 1,
      "name": "singleplayer"
    }
  ],
  game_image: [
    {
      type: "cover",
      url: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.png"
    },
    {
      type: "artwork",
      url: "https://images.igdb.com/igdb/image/upload/t_original/xyrkou2h4zxjnmitk8gi.jpg"
    },
    {
      type: "screenshot",
      url: "https://images.igdb.com/igdb/image/upload/t_original/nofld5l3txxuqhp7j8cc.jpg"
    }
  ],
}

export function useGameForm() {
  const [game, dispatchGame] = useReducer(gameReducer, sample);
  const { error, dispatchError, validate } = useGameFormErrors();

  const field = (name, options) => {
    return {
      name: name,
      value: game[name] || "",
      onChange: (e) => {
        dispatchGame({
          type: gameActions.AddFieldValue,
          field: e.target.name,
          payload: e.target.value
        })
        validate.field(name, e, options);
      },
      onBlur: (e) => {
        validate.field(name, e, options);
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
        if (options?.min === 0 && (e.keyCode === 189 || e.keyCode === 109)) {
          e.preventDefault();
        }
      },
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
      checked: game["game_genre"]?.map(genre => genre.id)?.includes(genre.id) ?? false,
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
      checked: game["game_gamemode"]?.map(g => g.id)?.includes(gamemode.id) ?? false,
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
      checked: game["game_platform"]?.map(p => p.id)?.includes(platform.id) ?? false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("...submitting");
    // All fields are valid and ready to be submitted
    // ...
    console.log(game);
  }

  return {
    game,
    dispatchGame,
    register: { field, genre, isDiscountActive, urlField, gamemode, platform },
    handleSubmit,
    error
  }
}
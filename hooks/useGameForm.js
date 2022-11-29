import { useEffect, useMemo, useReducer, useState } from "react";
import { brlCurrencyFormatter } from "../global";
import { errorsActions, useGameFormErrors } from "./useGameFormErrors";

export const imgTypes = {
  Cover: "cover",
  Screenshot: "screenshot",
  Artwork: "artwork"
}

export const gameActions = {
  AddFieldValue: "TEXT-INPUT",
  ToggleGenre: "TOGGLE-GENRE",
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
      let genres = state.genre;
      if (action.checked) {
        genres.push(action.payload);
      } else {
        genres = genres.filter(genre => genre !== action.payload);
      }
      return {
        ...state,
        genre: genres
      }

    case gameActions.ToggleIsDiscountActive:
      return {
        ...state,
        isDiscountActive: action.checked
      }

    case gameActions.AddImg:
      return {
        ...state,
        image: [...state.image, action.payload]
      }

    case gameActions.RemoveImg:
      let images = state.image;
      images = images.filter(image => image != action.payload);
      return {
        ...state,
        image: images
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
  language_support: [],
  system_requirement: [],
  platform: [],
  genre: [],
  gamemode: [],
  image: [],
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
  language_support: [
    {
      language_id: 1,
      audio: true,
      subtitles: true,
      interface: true
    }
  ],
  system_requirement: [],
  platform: [],
  genre: [
    1, 
    2, 
    3
  ],
  gamemode: [],
  image: [
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
      checked: game.genre.includes(genre.id),
      label: genre.name,
      type: "checkbox",
      onChange: (e) => {
        dispatchGame({
          type: gameActions.ToggleGenre,
          checked: e.target.checked,
          payload: genre.id
        })
      },
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
    register: { field, genre, isDiscountActive, urlField },
    handleSubmit,
    error
  }
}
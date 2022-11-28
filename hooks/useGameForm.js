import { useEffect, useMemo, useReducer, useState } from "react";
import { errorsActions, useGameFormErrors } from "./useGameFormErrors";

export const imgTypes = {
  Cover: "cover",
  Screenshot: "screenshot",
  Artwork: "artwork"
}

export const gameActions = {
  TextInput: "TEXT-INPUT",
  ToggleGenre: "TOGGLE-GENRE",
  ToggleIsDiscountActive: "TOGGLE-IS-DISCOUNT-ACTIVE",
  AddImg: "ADD-IMG",
  RemoveImg: "REMOVE-IMG",
}

const gameReducer = (state, action) => {
  switch (action.type) {

    case gameActions.TextInput:
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
  discount: 0,
  isDiscountActive: false,
  language_support: [],
  system_requirement: [],
  platform: [],
  image: [],
  genre: [],
  gamemode: [],
}

export function useGameForm() {
  const [game, dispatchGame] = useReducer(gameReducer, initialValues);
  const {error, dispatchError, validate} = useGameFormErrors();
  const validateAll = useMemo(() => {
    return validate.all();
  }, [error]);

  const field = (name, options) => {
    return {
      name: name,
      value: game[name],
      onChange: (e) => {
        dispatchGame({
          type: gameActions.TextInput,
          field: e.target.name,
          payload: e.target.value
        })
        validate.field(name, options, e);
      },
      onBlur: (e) => {
        validate.field(name, options, e);
      },
      required: options?.required || false
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
      checked: game.isDiscountActive,
      label: name,
      type: "checkbox",
      onChange: (e) => {
        dispatchGame({
          type: gameActions.ToggleIsDiscountActive,
          checked: e.target.checked
        })
      }
    }
  }

  const urlField = (name, type) => {
    return {
      name: name,
      onKeyDown: (e) => {
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

  const handleSubmit = (formRef) => {
    // Visit all input fields and blur them to check for errors
    formRef.current.querySelectorAll("input").forEach(input => {
      input.focus();
      input.blur();
    });

    if (validateAll && game !== initialValues) {
      // All fields are valid and ready to be submitted
      // ...
      console.log(game);
    }
  }

  return {
    game,
    dispatchGame,
    register: { field, genre, isDiscountActive, urlField },
    handleSubmit,
    error
  }
}
import { useEffect, useReducer } from "react";
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
  const [error, dispatchErr] = useGameFormErrors();

  useEffect(() => {
    console.log(error)
  }, [error])

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

        if (options?.required && !e.target.value) {
          dispatchErr({
            type: errorsActions.AddFieldError,
            name: name,
            payload: {
              message: "Campo Obrigatório!"
            }
          })
        } else if (e.target.value && error.field?.[name]) {
          dispatchErr({
            type: errorsActions.RemoveFieldError,
            name: name
          })
        }
      },
      required: options?.required || false
    }
  };

  const genre = (genre) => {
    return {
      name: genre.name,
      checked: game.genre.includes(genre.id),
      label: genre.name,
      type: "checkbox",
      id: genre.name,
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
      checked: game.isDiscountActive,
      label: name,
      type: "checkbox",
      id: name,
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
        if (e.keyCode === 13 && e.target.value) {
          try {
            const validURL = new URL(e.target.value)
            // Dispatch game with valid URL
            dispatchGame({
              type: gameActions.AddImg,
              payload: {
                type: type,
                url: validURL.href
              }
            })
            // Clear field
            e.target.value = null;
            // Remove error if URL is valid, if there is any
            if (error.urlField[name]) {
              dispatchErr({
                type: errorsActions.RemoveUrlError,
                name: name
              })
            }
          } catch (err) {
            // Dispatch an error
            if (!error.urlField[name]) {
              dispatchErr({
                type: errorsActions.AddUrlError,
                name: name,
                payload: {
                  message: "URL Inválida!"
                }
              })
            }
          }
        } else if (e.keyCode === 13) {
          if (error.urlField[name]) {
            dispatchErr({
              type: errorsActions.RemoveUrlError,
              name: name
            })
          }
        }
      },
      onBlur: (e) => {
        if (!e.target.value) {
          if (error.urlField[name]) {
            dispatchErr({
              type: errorsActions.RemoveUrlError,
              name: name
            })
          }
        } else {
          try {
            const validURL = new URL(e.target.value)
          } catch (err) {
            // Dispatch error if not already present
            if (!error.urlField[name]) {
              dispatchErr({
                type: errorsActions.AddUrlError,
                name: name,
                payload: {
                  message: "URL Inválida!"
                }
              })
            }
          }
        }
      }
    }
  }

  const handleSubmit = () => {
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
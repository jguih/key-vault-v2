import { useEffect, useReducer } from "react";

export const errorsActions = {
  AddUrlError: "ADD-IMG-ERROR",
  RemoveUrlError: "REMOVE-IMG-ERROR",
  AddFieldError: "ADD-FIELD-ERROR",
  RemoveFieldError: "REMOVE-FIELD-ERROR"
}

const errorsReducer = (state, action) => {
  switch (action.type) {
    case errorsActions.AddUrlError:
      return {
        ...state,
        urlField: {
          ...state.urlField,
          [action.name]: action.payload
        }
      }

    case errorsActions.RemoveUrlError:
      const urlErr = state.urlField;
      delete urlErr[action.name];
      return {
        ...state,
        urlField: urlErr
      }

    case errorsActions.AddFieldError:
      return {
        ...state,
        field: {
          ...state.field,
          [action.name]: action.payload
        }
      }

    case errorsActions.RemoveFieldError:
      const fieldErr = state.field;
      delete fieldErr[action.name];
      return {
        ...state,
        field: fieldErr
      }

    default:
      return state;
  }
}

const initialValues = {
  urlField: {},
  field: {}
}

export function useGameFormErrors() {
  const [error, dispatchError] = useReducer(errorsReducer, initialValues);

  const validate = {
    field: (fieldName, e, options) => {
      const validity = e.target.validity;
      let valid = true;

      if (validity.valueMissing) {
        valid = false;
        if (!error.field?.[fieldName]) {
          dispatchError({
            type: errorsActions.AddFieldError,
            name: fieldName,
            payload: {
              type: "required",
              message: "Campo Obrigatório!"
            }
          });
        }
      }

      if (validity.rangeOverflow) {
        valid = false;
        if (!error.field?.[fieldName]) {
          dispatchError({
            type: errorsActions.AddFieldError,
            name: fieldName,
            payload: {
              type: "rangeOverflow",
              message: `Não deve exceder ${options?.max}`
            }
          });
        }
      }

      if (validity.rangeUnderflow) {
        valid = false;
        if (!error.field?.[fieldName]) {
          dispatchError({
            type: errorsActions.AddFieldError,
            name: fieldName,
            payload: {
              type: "rangeUnderflow",
              message: `Não deve ser menor que ${options?.min}`
            }
          });
        }
      }

      if (validity.stepMismatch) {
        valid = false;
        if (!error.field?.[fieldName]) {
          dispatchError({
            type: errorsActions.AddFieldError,
            name: fieldName,
            payload: {
              type: "stepMismatch",
              message: "Valor inválido!"
            }
          });
        }
      }

      if (error.field?.[fieldName] && valid) {
        dispatchError({
          type: errorsActions.RemoveFieldError,
          name: fieldName
        });
      }

      return valid;
    },
    urlField: (fieldName, e, options) => {
      let valid = false;
      let validURL;

      // If ENTER is pressed or onBlur event triggered AND value is defined
      if ((e.keyCode === 13 || options?.onBlur) && e.target.value) {
        try {
          validURL = new URL(e.target.value);

          valid = true;
          if (error.urlField[fieldName]) {
            dispatchError({
              type: errorsActions.RemoveUrlError,
              name: fieldName
            })
          }
        } catch (err) {
          if (!error.urlField[fieldName]) {
            dispatchError({
              type: errorsActions.AddUrlError,
              name: fieldName,
              payload: {
                type: "invalid url",
                message: "URL Inválida!"
              }
            })
          }
        }
      } else if (e.keyCode === 13 || options?.onBlur) {
        if (error.urlField[fieldName]) {
          dispatchError({
            type: errorsActions.RemoveUrlError,
            name: fieldName
          })
        }
      }

      return [valid, validURL];
    }
  }

  return {
    error,
    dispatchError,
    validate
  };
}
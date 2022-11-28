import { useReducer } from "react";

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
    all: () => {
      return (
        Object.keys(error.urlField).length === 0 && 
        Object.keys(error.field).length === 0
      );
    },
    field: (fieldName, options, e) => {
      let valid = true;
    
      if (options?.required && !e.target.value) {
        valid = false;
        if (!error.field?.[fieldName]) {
          dispatchError({
            type: errorsActions.AddFieldError,
            name: fieldName,
            payload: {
              message: "Campo Obrigatório!"
            }
          });
        }
      } else if (options?.required && e.target.value) {
        valid = true;
        if (error.field?.[fieldName]) {
          dispatchError({
            type: errorsActions.RemoveFieldError,
            name: fieldName
          });
        }
      }
    
      return valid;
    },
    urlField: (fieldName, e, options) => {
      let valid = false;
      let validURL;

      // If ENTER is pressed or onBlur event triggered AND value is defined
      if ( (e.keyCode === 13 || options?.onBlur) && e.target.value) {
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
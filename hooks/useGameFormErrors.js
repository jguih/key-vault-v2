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
  const [error, dispatchErr] = useReducer(errorsReducer, initialValues);

  return [error, dispatchErr];
}
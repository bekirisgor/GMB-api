import {
  FETCH_ACCOUNTS_BEGIN,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE
} from "./action";

const initialState = {
  accounts: [],
  loading: false,
  error: null
};

export const accounts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload.accounts
      };
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: true,
        accounts: [],
        error: action.payload.error
      };
    default:
      return state;
  }
};

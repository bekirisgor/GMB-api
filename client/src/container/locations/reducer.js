import { FETCH_LOCATIONS_BEGIN, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_FAILURE } from './actions';

const initialState = {
  locationGroups: [],
  loading: false,
  error: null,
};

export const locations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        locationGroups: action.payload.locations,
      };
    case FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        locationGroups: null,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};

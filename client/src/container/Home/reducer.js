import produce from 'immer';
import _ from 'lodash';
import { FETCH_BEGIN, FETCH_REVIEWS, FETCH_LOCATIONS, FETCH_ACCOUNTS, FETCH_ERROR } from './action';

const initialState = {
  locationGroups: [{ locationsID: [] }],

  locations: [{ reviewsID: [] }],
  reviews: [],
  loading: false,
  error: null,
};

export const fetch = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_BEGIN:
        draft.loading = true;
        draft.error = false;
        break;

      case FETCH_ACCOUNTS:
        draft.loading = false;
        draft.error = false;
        console.log(...state.locationGroups[0].locationsID);
        action.payload.data.forEach((item, index) => {
          draft.locationGroups[index] = {
            ...item,
            locationsID: [] || [state.locationGroups[index].locationsID],
          };
        });

        break;
      case FETCH_LOCATIONS:
        draft.loading = false;
        draft.error = false;

        draft.locations.push(action.payload.data);

        break;
      default:
        return draft;
    }
  });

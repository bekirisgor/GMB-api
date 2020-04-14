import produce from 'immer';

import {
  FETCH_BEGIN,
  FETCH_LOCATIONS,
  FETCH_ACCOUNTS,
  SET_VISIBLE_LOCATIONS,
  FETCH_REVIEWS,
  FETCH_ERROR,
} from './action';

const initialState = {
  locationGroups: {},

  locations: {},
  visibleLocationsID: ['accounts/115207451364315737681/locations/4439430707710281699'],
  reviews: {},
  updateTime: {},
  loading: 0,
  error: null,
};

export const fetch = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_BEGIN:
        draft.loading = state.loading + 1;
        draft.error = false;
        break;

      case FETCH_ACCOUNTS:
        draft.loading = state.loading - 1;
        draft.error = false;

        console.log('itemmmm', action.payload.data);
        draft.updateTime.groupsTime = new Date();
        action.payload.data.forEach((item) => {
          draft.locationGroups[item.name] = {
            ...item,
            locationsID: [] || [state.locationGroups[item.name].locationsID],
          };
        });

        break;
      case FETCH_LOCATIONS:
        draft.loading = state.loading - 1;

        draft.updateTime.locationTime = new Date();
        action.payload.data.forEach((item) => {
          draft.locations[item.name] = {
            ...item,
            reviewsID: [] || [state.locations[item.name].reviewsID],
          };
          draft.locationGroups[action.index].locationsID.push(item.name);
        });
        break;
      case FETCH_REVIEWS:
        draft.loading = 0;
        draft.updateTime.reviewsTime = new Date();
        action.payload.data.forEach((item) => {
          draft.reviews[item.name] = {
            ...item,
          };
        });
        break;
      case SET_VISIBLE_LOCATIONS:
        draft.visibleLocationsID = action.ID;
        break;
      case FETCH_ERROR:
        draft.error = action.error;
        break;

      default:
        return state;
    }
  });

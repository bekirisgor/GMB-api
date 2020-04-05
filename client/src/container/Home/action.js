import axios from 'axios';

export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_ERROR = 'FETCH_ERROR';

const fetchBegin = () => ({
  type: FETCH_BEGIN,
});

const fetchAccountSuccess = (data) => ({
  type: FETCH_ACCOUNTS,
  payload: { data },
});
const fetchLocationSuccess = (data, index) => ({
  type: FETCH_LOCATIONS,
  payload: { data },
  index,
});
const fetchError = (error) => ({
  type: FETCH_ERROR,
  error: { error },
});

export const fetchAccounts = () => {
  return async (dispatch) => {
    dispatch(fetchBegin());

    return axios
      .get('/accounts/list')
      .then((res) => {
        const locationGroups = res.data.filter((items) => items.type === 'LOCATION_GROUP');
        dispatch(fetchAccountSuccess(locationGroups));
      })
      .catch((error) => {
        return dispatch(fetchError(error));
      });
  };
};
export const fetchLocations = (accountID = '', index) => {
  return async (dispatch) => {
    dispatch(fetchBegin());
    console.log('location begin', accountID, encodeURIComponent(accountID));

    return axios
      .get(`/locations/list/${encodeURIComponent(accountID)}`)
      .then((res) => {
        console.log('location data', res.data);
        dispatch(fetchLocationSuccess(res.data, index));
      })
      .catch((error) => {
        return dispatch(fetchError(error));
      });
  };
};

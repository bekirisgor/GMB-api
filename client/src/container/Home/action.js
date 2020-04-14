import axios from 'axios';

//Constants
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const SET_VISIBLE_LOCATIONS = 'SET_VISIBLE_LOCATIONS';

//Actions
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
const fetchReviewsSuccess = (data, index) => ({
  type: FETCH_REVIEWS,
  payload: { data },
  index: { index },
});

const fetchError = (error) => ({
  type: FETCH_ERROR,
  error: { error },
});

const visibleLocations = (locationID, status) => ({
  type: SET_VISIBLE_LOCATIONS,
  ID: locationID,
});

//Action Functions
export const setVisibleLocations = (locationID) => {
  return (dispatch) => {
    dispatch(visibleLocations(locationID));
  };
};
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

export const fetchLocations = () => {
  return async (dispatch) => {
    dispatch(fetchBegin());

    return axios
      .get('/accounts/list')
      .then((res) => {
        const locationGroups = res.data.filter((items) => items.type === 'LOCATION_GROUP');
        console.log('locgroups', locationGroups);
        dispatch(fetchAccountSuccess(locationGroups));
        locationGroups.forEach(async (item, index) => {
          dispatch(fetchBegin());
          const accountID = item.name;
          console.log('accid', accountID);
          axios.get('/locations/list/' + encodeURIComponent(accountID)).then((resloc) => {
            dispatch(fetchLocationSuccess(resloc.data, accountID));
          });
        });
      })

      .catch((error) => {
        return dispatch(fetchError(error));
      });

    /*
      axios
      .get(`/locations/list/${encodeURIComponent(accountID)}`)
      .then((res) => {
        console.log('location data', res.data);
        dispatch(fetchLocationSuccess(res.data, index));
      })
      .catch((error) => {
        return dispatch(fetchError(error));
      });
      */
  };
};

export const fetchReviews = (locationID = '') => {
  return async (dispatch) => {
    dispatch(fetchBegin());

    return axios
      .get(`/reviews/list/${encodeURIComponent(locationID)}`)
      .then((res) => dispatch(fetchReviewsSuccess(res.data, locationID)))
      .catch((error) => {
        return dispatch(fetchError(error));
      });
  };
};
/*
export const sendReviewReply = (review = "", reviewID = "") => {
  return async (dispatch) => {
    dispatch(fetchBegin());
    await axios
      .post("/reviews/reply", { review, reviewID })
      .then((response) => dispatch(sendReviewSucces(response.data)))
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
};
*/

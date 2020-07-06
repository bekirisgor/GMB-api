import axios from 'axios';

//Constants
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const SET_VISIBLE_LOCATIONS = 'SET_VISIBLE_LOCATIONS';

//Actions
const fetchBegin = (ID) => ({
  type: FETCH_BEGIN,
  ID,
});
//Fetch Data
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
//Set Visible Data
const visibleLocations = (locationID, state) => ({
  type: SET_VISIBLE_LOCATIONS,
  ID: locationID,
  status: state,
});

//Send data

const sendReviewSucces = (data, reviewID) => ({
  type: SEND_REVIEWS_SUCCESS,
  payload: { data },
  ID: reviewID,
});

//Action Functions
export const setVisibleLocations = (locationID, status) => {
  return (dispatch) => {
    dispatch(visibleLocations(locationID, status));
  };
};
export const fetchAccounts = () => {
  return async (dispatch) => {
    dispatch(fetchBegin('acc'));

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

export const fetchLocation = (accountID) => {
  return async (dispatch) => {
    dispatch(fetchBegin(accountID));

    return axios.get('/locations/list/' + encodeURIComponent(accountID)).then((res) => {
      dispatch(fetchLocationSuccess(res.data, accountID));
    });
  };
};

export const fetchReviews = (locationID = '') => {
  return async (dispatch) => {
    dispatch(fetchBegin());

    return axios
      .get(`/reviews/list/${encodeURIComponent(locationID)}`)
      .then((res) => {
        dispatch(fetchReviewsSuccess(res.data, locationID));
      })
      .catch((error) => {
        return dispatch(fetchError(error));
      });
  };
};

export const SEND_REVIEWS_BEGIN = 'SEND_REVIEWS_BEGIN';
export const SEND_REVIEWS_SUCCESS = 'SEND_REVIEWS_SUCCESS';
export const SEND_REVIEWS_FAILURE = 'SEND_REVIEWS_FAILURE';

export const sendReviewReply = (review = '', reviewID = '') => {
  return async (dispatch) => {
    dispatch(fetchBegin());
    await axios
      .post('/reviews/reply', { review, reviewID })
      .then((response) => {
        console.log('home action reply', response);
        dispatch(sendReviewSucces(response.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
};

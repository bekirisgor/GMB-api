import axios from "axios";

export const FETCH_LOCATIONS_BEGIN = "FETCH_LOCATIONS_BEGIN";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

const fetchLocationsBegin = () => ({
  type: FETCH_LOCATIONS_BEGIN,
});

const fetchLocationsSucces = (locations) => ({
  type: FETCH_LOCATIONS_SUCCESS,
  payload: { locations },
});

const fetchLocationsFailure = (error) => ({
  type: FETCH_LOCATIONS_FAILURE,
  payload: { error },
});

export const fetchLocations = (accountID = []) => async (dispatch) => {
  dispatch(fetchLocationsBegin());
  accountID.map(async (items) => {
    console.log(items);
    try {
      const res = await axios.get("/locations/list/${encodeURIComponent(items)}");
      return dispatch(fetchLocationsSucces(res.data));
    } catch (error) {
      return dispatch(fetchLocationsFailure(error));
    }
  });
};

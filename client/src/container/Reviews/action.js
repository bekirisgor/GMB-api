import axios from "axios";

export const FETCH_REVIEWS_BEGIN = "FETCH_REVIEWS_BEGIN";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";
// fetch reviews
const fetchReviewsBegin = () => ({
  type: FETCH_REVIEWS_BEGIN,
});

const fetchReviewsSucces = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: { reviews },
});

const fetchReviewsFailure = (error) => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: { error },
});

export const fetchReviews = (locationID = "") => {
  return async (dispatch) => {
    dispatch(fetchReviewsBegin());

    return axios
      .get(`/reviews/list/${encodeURIComponent(locationID)}`)
      .then((res) => dispatch(fetchReviewsSucces(res.data)))
      .catch((error) => {
        return dispatch(fetchReviewsFailure(error));
  });
  };
};

export const SEND_REVIEWS_BEGIN = "SEND_REVIEWS_BEGIN";
export const SEND_REVIEWS_SUCCESS = "SEND_REVIEWS_SUCCESS";
export const SEND_REVIEWS_FAILURE = "SEND_REVIEWS_FAILURE";

export const sendReviewReply = (review = "", reviewID = "") => {
  return async (dispatch) => {
    dispatch(sendReviewBegin());
    await axios
      .post("/reviews/reply", { review, reviewID })
      .then((response) => dispatch(sendReviewSucces(response.data)))
      .catch((error) => {
        dispatch(sendReviewError(error));
      });
  };
};

//Send Reviews reply
const sendReviewBegin = () => ({
  type: SEND_REVIEWS_BEGIN,
});

const sendReviewSucces = (reply) => ({
  type: SEND_REVIEWS_SUCCESS,
  payload: { reply },
});

const sendReviewError = (replyError) => ({
  type: SEND_REVIEWS_FAILURE,
  payload: { replyError },
});

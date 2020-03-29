import {
  FETCH_REVIEWS_BEGIN,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  SEND_REVIEWS_BEGIN,
  SEND_REVIEWS_SUCCESS,
  SEND_REVIEWS_FAILURE,
} from './action';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  reply: '',
  replyError: null,
  replyLoading: false,
};

export const reviews = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        loading: true,
        reviews: [],
        error: action.payload.error,
      };
    case SEND_REVIEWS_BEGIN:
      return {
        ...state,
        replyLoading: true,
        replyError: null,
      };
    case SEND_REVIEWS_SUCCESS:
      return {
        ...state,
        replyLoading: false,
        reply: action.payload.reply,
        replyError: null,
      };
    case SEND_REVIEWS_FAILURE:
      return {
        ...state,
        replyLoading: false,
        reply: '',
        replyError: action.payload.replyError,
      };

    default:
      return state;
  }
};

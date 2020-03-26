import axios from "axios";

export const FETCH_ACCOUNTS_BEGIN = "FETCH_ACCOUNTS_BEGIN";
export const FETCH_ACCOUNTS_SUCCESS = "FETCH_ACCOUNTS_SUCCESS";
export const FETCH_ACCOUNTS_FAILURE = "FETCH_ACCOUNTS_FAILURE";

export const fetchAccounts = () => {
  console.log("sss");

  return async function(dispatch) {
    dispatch(fetchAccountsBegin());
    console.log("aaaaa");

    return await axios
      .get("/accounts/list")
      .then(res => {
        dispatch(fetchAccountsSucces(res.data));
      })
      .catch(error => {
        return dispatch(fetchAccountsFailure(error));
      });
  };
};

const fetchAccountsBegin = () => ({
  type: FETCH_ACCOUNTS_BEGIN
});

const fetchAccountsSucces = accounts => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  payload: { accounts }
});

const fetchAccountsFailure = error => ({
  type: FETCH_ACCOUNTS_FAILURE,
  payload: { error }
});

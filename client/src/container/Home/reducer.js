import { FETCH_ACCOUNTS_BEGIN } from '../accounts/action';
import { reviews } from '../Reviews/reducer';

const initialState = {
  accounts: {
    locationGroups: [{ reviews: [] }],
    accountGroups: [],
    organizationGroups: []
  }
};

export const accounts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          locationGroups: []
        }
      };
  }
};

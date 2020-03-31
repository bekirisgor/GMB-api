import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import { connectRouter } from "connected-react-router";
import { locations } from "./container/locations/reducer";
import { accounts } from "./container/accounts/reducer";
import { reviews } from "./container/Reviews/reducer";

const rootReducer = (history) =>
  combineReducers({
    accounts,
    reviews,
    locations,
    router: connectRouter(history),
  });

const configureStore = (prelodedState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(createLogger());
  }

  middlewares.push(reduxPromiseMiddleware);
  const composed = [applyMiddleware(...middlewares)];

  if (process.env.NODE_ENV === "development") {
    composed.push(
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
  }

  const store = createStore(rootReducer(history), prelodedState, compose(...composed));
  return store;
};

export default configureStore;

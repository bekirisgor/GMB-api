import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { fetch } from './container/Home/reducer';

const rootReducer = (history) =>
  combineReducers({
    fetch,

    router: connectRouter(history),
  });

const configureStore = (prelodedState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  middlewares.push(reduxPromiseMiddleware);
  const composed = [applyMiddleware(...middlewares)];

  if (process.env.NODE_ENV === 'development') {
    composed.push(
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
  }

  const store = createStore(
    rootReducer(history),
    prelodedState,
    composeWithDevTools(
      /* logger must be the last middleware in chain to log actions */
      applyMiddleware(thunk, createLogger()),
    ),
  );
  return store;
};

export default configureStore;

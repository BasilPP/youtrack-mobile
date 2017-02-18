/* @flow */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';

function getApi() {
  const api = store.getState().app.api;
  if (!api) {
    throw new Error('Trying to use API until it is initialized in store');
  }
  return api;
}

const middlewares = [thunk.withExtraArgument(getApi)];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(
  reducer,
  global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

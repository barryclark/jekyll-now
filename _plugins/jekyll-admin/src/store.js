import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './ducks';

const logger = createLogger();

const configureStoreProd = initialState => {
  const middlewares = [thunk];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
};

const configureStoreDev = initialState => {
  const middlewares = [reduxImmutableStateInvariant(), thunk, logger];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('./ducks', () => {
      const nextReducer = require('./ducks').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const configureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;

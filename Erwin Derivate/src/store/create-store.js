import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import errorReporterMiddleware from './error-reporter';
import loggerMiddleware from './logger';
import rootReducer from '../reducers';

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, errorReporterMiddleware];

  if (window.__DEV__) {
    middleware.push(loggerMiddleware);
  }

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [
    autoRehydrate(),
  ];

  let composeEnhancers = compose;

  if (window.__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  const persistor = persistStore(store, {
    whitelist: ['user'],
  });

  return {
    store,
    persistor,
  };
};

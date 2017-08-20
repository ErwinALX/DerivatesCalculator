// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/create-store';
import App from './app';
import registerServiceWorker from './register-service-worker';

// ========================================================
// Global Variable Initialization
// ========================================================
window.__DEV__ = process.env.NODE_ENV === 'development';
window.__PROD__ = process.env.NODE_ENV === 'production';
window.__TEST__ = process.env.NODE_ENV === 'test';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__;
const { store, persistor } = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  const rootElement = (
    <App persistor={persistor} store={store} />
  );
  ReactDOM.render(
    rootElement,
    MOUNT_NODE,
  );
};

// This code is excluded from production bundle
if (window.__DEV__) {
  if (module.hot) {
    // Setup hot module replacement
    module.hot.accept('./app', () => {
      setImmediate(() => {
        // eslint-disable-next-line no-unused-vars
        const rootEl = require('./app');
        render();
      });
    });
  }
}

// ========================================================
// Go!
// ========================================================
render();
registerServiceWorker();

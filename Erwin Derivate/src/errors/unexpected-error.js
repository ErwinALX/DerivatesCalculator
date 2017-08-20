// @flow

import Raven from 'raven-js';

if (window.__PROD__) {
  Raven
  .config('https://c23cdb11e5e64e19b73d230c759df432@sentry.io/171881')
  .install();
}

export default class UnexpectedError extends Error {
  causeError: Error;

  constructor(error: Error) {
    super('Something unexpected happened. We\'ve been notified and are working on it. Thank you for your patience.');
    this.causeError = error;

    if (window.__PROD__) {
      Raven.captureException(error);
    }

    if (window.__DEV__) {
      console.log(error.stack);
    }
  }
}

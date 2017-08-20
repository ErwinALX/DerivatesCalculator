// @flow

import type { Action } from '../types';
import { UnexpectedError } from '../errors';

const errorReporterMiddleware = (/* store */) =>
  (next: (action: Action) => void) => (action: Action) => {
    try {
      return next(action);
    } catch (error) {
      throw new UnexpectedError(error);
    }
  };

export default errorReporterMiddleware;

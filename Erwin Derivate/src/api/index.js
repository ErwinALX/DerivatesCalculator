// @flow

import qs from 'qs';

import autobind from '../utils/autobind';

const API_URL = 'https://api.url/prefix';

type Path = string | {
  path: string,
  query: {},
};

function getApiPath(halfPath: Path): string {
  if (typeof halfPath === 'string') {
    return halfPath;
  }

  const querystring: string = qs.stringify(halfPath.query, { encode: false });
  return `${halfPath.path}?${querystring}`;
}

function getApiUrl(halfPath: Path): string {
  const path = getApiPath(halfPath);
  return `${API_URL}${path}`;
}

export default class ApiController {
  constructor() {
    autobind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async decorateRequestOptions(options: *) {
    const token = null;

    return {
      ...options,
      headers: {
        ...(options.headers || {}),
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
  }

  /* eslint-disable no-console */
  async apiFetch(path: Path, options: *) {
    if (window.__DEV__) {
      console.group(`${options.method} ${getApiPath(path)}`);
      console.debug('start time', new Date());
      console.time('duration');
    }

    try {
      const reqOptions = await this.decorateRequestOptions(options);
      const result = await fetch(getApiUrl(path), reqOptions);

      if (result.status >= 400) {
        throw new Error(result.statusText);
      }

      if (window.__DEV__) {
        console.timeEnd('duration');
        console.debug('result', result);
        console.groupEnd();
      }

      return result;
    } catch (error) {
      if (window.__DEV__) {
        console.timeEnd('duration');
        console.debug('error', error.message);
        console.groupEnd();
      }

      throw new Error();
    }
  }
  /* eslint-enable no-console */

  get(path: Path): Promise<Response> {
    return this.apiFetch(path, {
      method: 'GET',
    });
  }

  post(path: Path, payload?: {}): Promise<Response> {
    return this.apiFetch(path, {
      method: 'POST',
      body: payload && JSON.stringify(payload),
    });
  }

  put(path: Path, payload?: {}): Promise<Response> {
    return this.apiFetch(path, {
      method: 'PUT',
      body: payload && JSON.stringify(payload),
    });
  }

  delete(path: Path): Promise<Response> {
    return this.apiFetch(path, {
      method: 'DELETE',
    });
  }
}

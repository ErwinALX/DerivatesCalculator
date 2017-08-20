// @flow

import autobind from '../utils/autobind';

type Callback<T> = (key: string, value: T) => void;

export default class Subscription<T: *> {
  _query: any;
  _realCallbacks: WeakMap<Callback<T>, (snapshot: any) => void>;

  constructor(query: any) {
    autobind(this);
    this._query = query;
    this._realCallbacks = new WeakMap();
  }

  childAdded(callback: Callback<T>) {
    return this.subscribe('child_added', callback);
  }

  childChanged(callback: Callback<T>) {
    return this.subscribe('child_changed', callback);
  }

  childRemoved(callback: Callback<T>) {
    return this.subscribe('child_removed', callback);
  }

  onValue(callback: Callback<T>) {
    return this.subscribe('value', callback);
  }

  subscribe(eventType: string, callback: Callback<T>) {
    const realCallback = (snapshot) => {
      const value: T = snapshot.val();
      callback(snapshot.key, value);
    };
    this._realCallbacks.set(callback, realCallback);
    this._query.on(eventType, realCallback);
    return this;
  }

  unsubscribe(eventType: string, callback: Callback<T>) {
    const realCallback = this._realCallbacks.get(callback);
    this._query.off(eventType, realCallback);
    return this;
  }

  stop() {
    this._query.off();
    return this;
  }
}

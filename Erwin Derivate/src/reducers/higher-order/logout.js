// @flow

/*
*
* Assume all reducers have the signature:
* function reducer(state: State = initialState, action: Action = { type: 'NOOP' })
* and that when type === 'NOOP' they return the current state.
* Therefore reducer() === initialState.
*
*/

import type {
  Reducer,
} from '../../types';

export default function withLogout<S: *>(reducer: Reducer<S>): Reducer<S> {
  return (state, action) => {
    if (action && action.type === 'LOGOUT') {
      return reducer();
    }
    return reducer(state, action);
  };
}

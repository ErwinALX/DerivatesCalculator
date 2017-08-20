// @flow

// Re-exports
export type { Location, RouterHistory } from 'react-router-dom';

// Utility types
export type SerializableScalarType = string | number | null;

export type StringMap<T> = {
  [key: string]: T,
};

export type MapIndexState<T> = {
  map: StringMap<T>,
  index: Array<string>,
};

// Extra

// Models

// State
export type State = {
  views: {},
};

// Action Types
export type LogoutAction = {
  type: 'LOGOUT',
};

export type AuthReadyAction = {
  type: 'AUTH_READY',
};

export type NoopAction = {
  type: 'NOOP',
};

export type Action =
  | LogoutAction
  | AuthReadyAction
  | NoopAction;

// Redux Associated Types
export type GetState = () => State;
export type ReturnAction = Promise<Action> | Action;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => ReturnAction; // eslint-disable-line
export type AsyncAction = ThunkAction | ReturnAction;
export type Dispatch = (action: AsyncAction) => ReturnAction;

export type MapStateToProps<Props> = (state: State) => $Shape<Props>;
export type MapDispatchToProps<Props> = (dispatch: Dispatch) => $Shape<Props>;

export type Reducer<S> = (state?: S, action?: Action) => S;

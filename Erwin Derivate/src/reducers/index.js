// @flow

import { combineReducers } from 'redux';

import type {
  Reducer,
  State,
} from '../types';

import views from './views';

const rootReducer: Reducer<State> = combineReducers({
  views,
});

export default rootReducer;

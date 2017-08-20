// @flow

import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import type {
  MapStateToProps,
  MapDispatchToProps,
  State,
} from '../types';

import HomeContainer from '../containers/home';

type Props = {
};

const mapStateToProps: MapStateToProps<Props> = (state: State) => ({
});

const mapDispatchToProps: MapDispatchToProps<Props> = (dispath: Dispatch) => ({
});

class RootRouter extends Component {
  props: Props;

  render() {
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootRouter);

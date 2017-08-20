// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from '../utils/autobind';
import Algebrite from 'algebrite';
import Recharts from 'recharts';
import type {Dispatch, MapStateToProps, MapDispatchToProps, State}
from '../types';

import HomeView from '../views/home';

type Props = {};

type ContainerState = {};

const mapStateToProps : MapStateToProps < Props > = (state : State) => ({});

const mapDispatchToProps : MapDispatchToProps < Props > = (dispath : Dispatch) => ({});

class HomeContainer extends Component {
  constructor(props, context) {
    super(props, context);
    autobind(this);

    this.state = {
      value: '',
      list: [],
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateList = this.updateList.bind(this);
    this.setGraphicOncanvas = this.setGraphicOncanvas.bind(this);
  }
  props : Props;
  state : ContainerState;

  render() {
    return (
      <HomeView
        {...this.props}
        {...this.state}
        onSubmitExpression={this.onSubmitExpression}
        handleChange={this.handleChange}
        updateList={this.updateList}
        setGraphicOncanvas={this.setGraphicOncanvas}
        result={this.state.data}
      />
    );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  updateList(event) {
    var derivative = Algebrite.derivative(this.state.value).toString();
    this.setState({
      list: [
        derivative, ...this.state.list
      ]
    });
    this.setGraphicOncanvas();
  }

  setGraphicOncanvas() {
    const derivative = Algebrite.derivative(this.state.value).toString();
    const result = [];
    for (let i = 0; i < 10; i++) {
      const x = i + 1;
      const d = Algebrite.eval(derivative, 'x', x);
      const y = Number.parseFloat(d.toString());

      result.push({ x: x, y: y });
    }

    this.setState({ data: result });
  }

  onSubmitExpression() {
    alert('Alerta de prueba me estoy accionando');
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

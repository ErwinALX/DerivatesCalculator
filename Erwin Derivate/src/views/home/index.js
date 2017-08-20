// @flow

import React from 'react';
import {FormattedMessage} from 'react-intl';
import {render} from 'react-dom';
import {
  Button,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  FromGroup,
  HelpBlock,
  Grid,
  Row,
  Col,
  NavBar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Navbar,
  Panel,
  input,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { LineChart, Line,XAxis,YAxis,CartesianGrid,recharts,Tooltip,Legend } from 'recharts';
import './style.css';
import {AppName} from '../../constants';

type Props = {
  count: number
};

const GraficaInstance = (props) => (
  <PanelParent>
    <span className="span_alineacion">Grafica</span>
      <LineChart width={500} height={400} data={props.result} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} >
        <XAxis dataKey='x'/>
        <YAxis dataKey='y'/>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
  </PanelParent>
);

const FormInstance = (props) => (
  <Form horizontal>
    <FormGroup >
      <Col sm={12}>
        <FormControl type="Text" placeholder="Digite La Expresion" value={props.value} onChange={props.handleChange}/>
      </Col>
    </FormGroup>

    <FormGroup>
      <Col sm={10}>
        <Button onClick={props.updateList}>
          Derivate
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

const CalculadoraInstance = (props) => (
  <PanelParent>
    <span className="span_alineacion">Calculadora</span>
    <FormInstance onSubmitExpression={props.onSubmitExpression} value={props.value} dato={props.handleChange} handleChange={props.handleChange} updateList={props.updateList}/>
    <hr></hr>
    <ListGroup>
      {props.list.map(value=>(<ListGroupItem>{value}</ListGroupItem>))}
    </ListGroup>
  </PanelParent>

);

const PanelParent = (props) => (
  <Panel>
    {props.children}
  </Panel>
);

const GridInstance = (props) => (
  <Grid>
    <Row className="show-grid">
      <Col md={6} mdPush={6}>
        <PanelParent>
          <GraficaInstance result={props.result}/> {/* Grafica */}
        </PanelParent>
      </Col>
      <Col md={6} mdPull={6}>
        <PanelParent>
          <CalculadoraInstance  list={props.list} onSubmitExpression={props.onSubmitExpression} value={props.value} handleChange={props.handleChange} updateList={props.updateList}/ > {/* Calculadora */}
        </PanelParent>

      </Col>
    </Row>
  </Grid>
);
const NavbarInstance = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="http://erwin-website.herokuapp.com/index.html">Erwin Derivate</a>
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavDropdown eventKey={3} title="MoreInfo" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider/>
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const HomeView = (props) => {
   return (
    <div className='home'>
      <NavbarInstance/>
      <GridInstance list={props.list} onSubmitExpression={props.onSubmitExpression} value={props.value} handleChange={props.handleChange} updateList={props.updateList} result={props.result}/>
    </div>
  );
}
export default HomeView;

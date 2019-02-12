import React from 'react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';

const App = () => (
  <Container fluid>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/checkout" component={Checkout} />
    </Switch>
  </Container>
);

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMobile from '../src/Components/NavMobile/NavMobile';
import Main from './Pages/Main/Main';
import Details from './Pages/Details/Details';

function Routes() {
  return (
    <Router>
      <NavMobile />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/details" component={Details} />
      </Switch>
    </Router>
  );
}

export default Routes;

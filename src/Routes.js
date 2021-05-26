import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Category from './Pages/Category/Category';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact paty="/category" component={Category} />
      </Switch>
    </Router>
  );
}

export default Routes;

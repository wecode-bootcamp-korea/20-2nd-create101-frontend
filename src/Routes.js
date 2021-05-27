import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MobileNav from '../src/Components/MobileNav/MobileNav';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Details from './Pages/Details/Details';
import Category from './Pages/Category/Category';
import CreateClass from './Pages/CreateClass/CreateClass';
import { RecoilRoot } from 'recoil';

function Routes() {
  return (
    <Router>
      <MobileNav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/category" component={Category} />
        <RecoilRoot>
          <Route exact path="/create" component={CreateClass} />
        </RecoilRoot>
      </Switch>
    </Router>
  );
}

export default Routes;

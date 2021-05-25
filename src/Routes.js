import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import MobileNav from '../src/Components/MobileNav/MobileNav';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Details from './Pages/Details/Details';
import Category from './Pages/Category/Category';
import CreateClass from './Pages/CreateClass/CreateClass';
import Footer from './Components/Footer/Footer';
import MyPage from './Pages/MyPage/MyPage';
import Nav from './Components/Nav/Nav';

function Routes() {
  return (
    <Router>
      <Nav />
      <MobileNav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/category/:categoryName" component={Category} />
        <RecoilRoot>
          <Route exact path="/create" component={CreateClass} />
        </RecoilRoot>
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;

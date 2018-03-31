// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { Menu, BottomBar } from './menu';
import { SignIn, SignOut, SignUp, ForgotPass } from './auth';
import { ErrorMessage, errorMessage } from './errorMessage';

import { Home } from './home';
import { UserDetails } from './userDetails';
import { UserDetailsEdit } from './userDetailsEdit';
import { Members } from './members';
import { Events } from './events';

let root = document.getElementById('root');
if(root) {
  ReactDOM.render((
    <HashRouter>
      <div class="main">
        <ErrorMessage />
        <Menu />
        <Switch>
          <div class="content">
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/forgotpass' component={ForgotPass} />
          <Route exact path='/signout' component={SignOut} />
          <Route exact path='/' component={Home} />
          <Route exact path='/members' component={Members} />
          <Route exact path='/user/:id' component={UserDetails} />
          <Route exact path='/user/:id/edit' component={UserDetailsEdit} />
          </div>
        </Switch>
        <BottomBar />
      </div>
    </HashRouter>
  ), root);
}

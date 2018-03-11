// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { Menu, BottomBar } from './menu';
import { SignIn, SignOut, SignUp } from './auth';
import { ErrorMessage, errorMessage } from './errorMessage';

import { Home } from './home';
import { UserDetails } from './userDetails';
import { Members } from './members';
import { Events } from './events';

let root = document.getElementById('root');
if(root) {
  ReactDOM.render((
    <HashRouter>
      <div>
        <ErrorMessage />
        <Menu />
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signout' component={SignOut} />
          <Route exact path='/' component={Home} />
          <Route exact path='/friends' component={Members} />
          <Route exact path='/user/:id' component={UserDetails} />
        </Switch>
        <BottomBar />
      </div>
    </HashRouter>
  ), root);
}

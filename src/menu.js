// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { lang, en, no } from './lang';
import { connection } from './connect';
import { User, userService } from './userService';
import { Event, eventService } from './eventService';
import { ErrorMessage, errorMessage } from './errorMessage';

class Menu extends React.Component<{}> {
  render() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      return (
        <div id="menuBar" className="toolBar">
          <div id="menuItems">
            <NavLink activeStyle={{color: 'green'}} exact to='/'>{lang.home}</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to={'/user/' + signedInUser.id}>{lang.myPage}</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to='/events'>{lang.events}</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to='/friends'>{lang.members}</NavLink>{' '}
          </div>
          <div id="signOut">
            <NavLink activeStyle={{color: 'green'}} to='/signout'>{lang.signOut}</NavLink>{' '}
          </div>
        </div>
      );
    }
    return (
        <div id='signInBar' className="toolBar">
          <div id="signIn">
            <NavLink activeStyle={{color: 'green'}} to='/signin'>{lang.signIn}</NavLink>{' '}
          </div>
          <div id='signInHelp'>
            <NavLink activeStyle={{color: 'green'}} to='/signup'>{lang.signUp}</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to='/forgotpass'>{lang.forgotPass}</NavLink>{' '}
          </div>
        </div>
    );
  }

  componentDidMount() {
    menu = this;
  }

  componentWillUnmount() {
    menu = null;
  }
}
let menu: ?Menu;

class BottomBar extends React.Component<{}> {
  refs: {
    langButton: HTMLButtonElement
  }

  render() {
    return(
      <div id='bottomBar' className="toolBar">
        <div id='langSelect'>
          <button ref='langButton'>{lang.switchLanguage}</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.refs.langButton.onclick = () => {
      switch (localStorage.getItem("lang")) {
        case 'en':
          localStorage.setItem('lang', 'no');
          break;
        case 'no':
          localStorage.setItem('lang', 'en');
          break;
        default:
          localStorage.setItem('lang', 'no');
      }
      window.location.reload();
    };
  }
}

export { Menu, menu, BottomBar };

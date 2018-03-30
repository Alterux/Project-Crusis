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
    lang: HTMLSelectElement,
    langButton: HTMLButtonElement,
  }


  render() {
    return(
      <div id="bottomBar">

      {/* Language selection */}
        <div id="langSelect">
            <select name="lang" id="lang" ref="lang">
              <option value="en">English</option>
              <option value="no">Norsk</option>
            </select>
            <button ref='langButton' id="langButton">{lang.save}</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Get language or set language norwegian if none.
    let cLang = localStorage.getItem('lang');
    if (cLang) {
      this.refs.lang.value = cLang
    } else {
      localStorage.setItem('lang', 'no');
      window.location.reload();
    }

    // Set language onclick save.
    this.refs.langButton.onclick = () => {
      let sLang = this.refs.lang.value;
      if (cLang !== sLang) {
        localStorage.setItem('lang', sLang);
        window.location.reload();
      }
    };
  }
}

export { Menu, menu, BottomBar };

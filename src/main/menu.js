// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { connection } from '../services/connect';
import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

type Props = {};
type State = {};

class Menu extends React.Component<Props, State> {
  refs: {
    lang: HTMLInputElement,
  }

  render() {
    let signedInUser = userService.getSignedInUser();

    let toolBar = () => {
      if(signedInUser) {
        return (
          <div className='menuWrapper'>
            <div id='menuItems'>
              <NavLink className='leftMost navLink' activeClassName='active' exact to='/'>{lang.home}</NavLink>{' '}
              <NavLink className='navLink' activeClassName='active' to={'/user/' + signedInUser.id}>{lang.myPage}</NavLink>{' '}
              <NavLink className='navLink' activeClassName='active' to='/events'>{lang.events}</NavLink>{' '}
              <NavLink className='navLink' activeClassName='active' to='/members'>{lang.members}</NavLink>{' '}
            </div>
            <div id='signOut'>
              <NavLink className='rightMost navLink' activeClassName='active' to='/signout'>{lang.signOut}</NavLink>{' '}
            </div>
          </div>
        );
      }
    }

    return (
      <div id='menuBar' className='toolBar'>
        {toolBar()}
        <div className='langSelectAuth'>
          <select name='lang' id='lang' ref='lang'>
            <option value='en'>English</option>
            <option value='no'>Norsk</option>
          </select>
        </div>
      </div>
    );
  }

  componentDidMount() {
    menu = this;

    // Get language or set language norwegian if none.
    let currentLang = localStorage.getItem('lang');
    if (currentLang) {
      this.refs.lang.value = currentLang;
    } else {
      localStorage.setItem('lang', 'no');
      window.location.reload();
    }

    // Set language onchange
    this.refs.lang.onchange = () => {
      localStorage.setItem('lang', this.refs.lang.value);
      window.location.reload();
    }
  }

  componentWillUnmount() {
    menu = null;
  }
}
let menu: ?Menu;

export { Menu, menu };

// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { connection } from '../services/connect';
import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';
import { inputDays, inputMonths, inputYears, inputUserType } from '../util/selectOptions';

type Props = {
  match: {
    params: {
      id: number
    }
  }
};

type State = {};

class UserLoginEdit extends React.Component<Props, State> {
  refs: {
    backButton: HTMLInputElement,
    saveEmailButton: HTMLInputElement,
    savePasswordButton: HTMLInputElement,
    inputEmail: HTMLInputElement,
    inputPassword: HTMLInputElement,
    inputCurrentPassword: HTMLInputElement,
    inputNewPassword: HTMLInputElement,
    inputNewPasswordMatch: HTMLInputElement,
  };

  user = {};
  signedInUser = {};

  hashCode(str: string) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  render() {
    let user = this.user;
    let signedInUser = this.signedInUser;
    let userTypeMsg;

    let inputFormUserType = () => {
      if (signedInUser.userType === 3) {
        return (
          <div className='inputFormUserType'>
            <h3>{lang.userType}</h3>
            {inputUserType('inputUserType', 'form formUserType')}
          </div>
        );
      }
    }

    return (
      <div className='full contentWrapper'>
        <div id="title">
          <img id="logo" src="resources/logo.svg"></img>
          <div className="titleText"><h1>{lang.title}</h1></div>
        </div>
        <div className='textBoxWrapper'>

          <div className='big-entry inputForm'>
            <div className='inputFormEmail'>
              <h3>{lang.change} {lang.email}</h3>
              <input className='form' type='email' ref='inputEmail' placeholder={lang.email} required />
              <input className='form' type='password' ref='inputPassword' placeholder={lang.password} required />
            </div>
            <div className='inputFormButton'>
              <button className='form' id='signInButton' ref='saveEmailButton'>{lang.update} {lang.email}</button>
            </div>
          </div>

          <div className='big-entry inputForm'>
            <div className='inputFormPassword'>
              <h3>{lang.change} {lang.password}</h3>
              <input className='form' type='password' ref='inputCurrentPassword' placeholder={lang.currentPassword} required />
              <input className='form' type='password' ref='inputNewPassword' placeholder={lang.newPassword} required />
              <input className='form' type='password' ref='inputNewPasswordMatch' placeholder={lang.newPasswordMatch} required />
            </div>
            <div className='inputFormButton'>
              <button className='form' id='signInButton' ref='savePasswordButton'>{lang.update} {lang.password}</button>
            </div>
          </div>

          <div className='inputForm'>
            <div className='inputFormButton'>
              <button className='lonely form inputButton backButton' ref='backButton'>{lang.back}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {

    // User
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      this.signedInUser = signedInUser;

      userService.getUser(this.props.match.params.id).then((user) => {
        this.user = user[0];
        this.forceUpdate();

        let id = this.user.id;

        this.refs.inputEmail.value = this.user.email;

        // back button
        this.refs.backButton.onclick = () => {
          history.push('/user/' + user[0].id);
        }

        // save email button
        this.refs.saveEmailButton.onclick = () => {

          let email = this.refs.inputEmail.value;
          let password = this.refs.inputPassword.value;
          let hashedPass = this.hashCode(password + email);
          let passCheck = this.hashCode(password + this.user.email);

          if (passCheck == this.user.password) {
            userService.editEmail(email, hashedPass, id);
            console.log('Email Updated.');
            history.push('/user/' + user[0].id);
          } else {
            console.log('Incorrect password!');
          }
        }

        // save password button
        this.refs.savePasswordButton.onclick = () => {

          let email = this.user.email;
          let currentPassword = this.refs.inputCurrentPassword.value;
          let newPassword = this.refs.inputNewPassword.value;
          let newPasswordMatch = this.refs.inputNewPasswordMatch.value;
          let hashedPass = this.hashCode(newPassword + email);
          let passCheck = this.hashCode(currentPassword + email);

          if (passCheck == this.user.password) {
            userService.editPassword(hashedPass, id);
            console.log('Password Updated.');
            history.push('/user/' + user[0].id);
          } else {
            console.log('Incorrect password!')
          }
        }
      }).catch((error: Error) => {
        if(errorMessage) console.log(error);
      });
    }
  }

  // Called when the this.props-object change while the component is mounted
  // For instance, when navigating from path /user/1 to /user/2
  componentWillReceiveProps() {
    setTimeout(() => { this.componentDidMount(); }, 0); // Enqueue this.componentDidMount() after props has changed
  }
}

export { UserLoginEdit };

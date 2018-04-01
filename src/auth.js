// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { lang, en, no } from './lang';
import { connection } from './connect';
import { User, userService } from './userService';
import { Event, eventService } from './eventService';
import { ErrorMessage, errorMessage } from './errorMessage';

import { Menu, menu } from './menu';

class SignIn extends React.Component<{}> {
  refs: {
    signInUsername: HTMLInputElement,
    signInPassword: HTMLInputElement,
    signInButton: HTMLButtonElement,
  }

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
    return (
      <div id="signInPage">
        <div id="title">
          <img id="logo" src="resources/logo.svg"></img>
          <div className="titleText"><h1>{lang.title}</h1></div>
        </div>
        <div className="inputForm">
          <input className="form" id="formUser" type='text' ref='signInUsername' placeholder={lang.email} />
          <input className="form" id="formPass" type='password' ref='signInPassword' placeholder={lang.password} />
          <button className="form" id="signInButton" ref='signInButton'>{lang.signIn}</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if(menu) menu.forceUpdate();

    this.refs.signInButton.onclick = () => {
      let hashedPass = this.hashCode(this.refs.signInPassword.value + this.refs.signInUsername.value);
      userService.signIn(this.refs.signInUsername.value, hashedPass).then(() => {
        history.push('/');
      }).catch((error: Error) => {
        // Converts error to string og removes "Error: " from the beginning.
        // Output is only the errormessage from lang.js.
        if(errorMessage) errorMessage.set(String(error).slice(7));
      });
    };
  }
}

class SignOut extends React.Component<{}> {

  render() {
    return (<div></div>);
  }

  componentDidMount() {
    if(menu) menu.forceUpdate();

    let result = confirm(lang.confirmSignOut);
    if (result) {
      localStorage.removeItem('signedInUser');
      history.push('/');
    } else {
      history.goBack();
    }
    this.forceUpdate();
  }
}

class SignUp extends React.Component<{}> {
  refs: {
    signUpUsername: HTMLInputElement,
    signUpPassword: HTMLInputElement,
    signUpFirstname: HTMLInputElement,
    signUpLastname: HTMLInputElement,
    signUpButton: HTMLButtonElement
  }

  accountCreated: number;

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
    let accountCreated = this.accountCreated;

    if (accountCreated === 1) {
      return (
        <div>
          <div id="title">
            <img id="logo" src="resources/logo.svg"></img>
            <div className="titleText"><h1>{lang.title}</h1></div>
          </div>
          <div className="inputForm">
            {lang.signedUpMsg}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div id="title">
            <img id="logo" src="resources/logo.svg"></img>
            <div className="titleText"><h1>{lang.title}</h1></div>
          </div>


          <div className="inputForm">

            <div className="inputFormAuth">
              <h3>{lang.signIn}</h3>
              <input className="form" id="formUser" type='text' ref='signUpUsername' placeholder={lang.email} required />
              <input className="form" id="formPass" type='password' ref='signUpPassword' placeholder={lang.password} required />
            </div>

            <div className="inputFormName">
              <h3>{lang.name}</h3>
              <input className="form" type='text' ref='signUpFirstname' placeholder={lang.firstName} required />
              <input className="form" type='text' ref='signUpMiddlename' placeholder={lang.middleName} />
              <input className="form" type='text' ref='signUpLastname' placeholder={lang.lastName} required />
            </div>

            <div className="inputFormBirth">
              <h3>{lang.birthdate}</h3>
              <input className="form" type='number' ref='signUpBirthDay' placeholder={lang.day} min='1' max='31' required />
              <select className="form" id="signUpBirthMonth" ref="signUpBirthDay" required>
                <option value="" disabled selected>{lang.month}</option>
                <option value="1">{lang.jan}</option>
                <option value="2">{lang.feb}</option>
                <option value="3">{lang.mar}</option>
                <option value="4">{lang.apr}</option>
                <option value="5">{lang.may}</option>
                <option value="6">{lang.jun}</option>
                <option value="7">{lang.jul}</option>
                <option value="8">{lang.aug}</option>
                <option value="9">{lang.sep}</option>
                <option value="10">{lang.oct}</option>
                <option value="11">{lang.nov}</option>
                <option value="12">{lang.dec}</option>
              </select>
              <input className="form" type='number' ref='signUpBirthYear' placeholder={lang.year} min='1905' max='2018' required />
            </div>

            <div className="inputFormAddress">
              <h3>{lang.address}</h3>
              <input className="form" type='text' ref='signUpCity' placeholder={lang.city} required />
            </div>

            <div className="inputFormButton">
              <button className="form" id="signInButton" ref='signUpButton'>{lang.signUp}</button>
            </div>

          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    if(menu) menu.forceUpdate();

    if (this.refs.signUpButton) {
      this.refs.signUpButton.onclick = () => {
        let hashedPass = this.hashCode(this.refs.signUpPassword.value + this.refs.signUpUsername.value);
        userService.signUp(this.refs.signUpUsername.value, hashedPass, this.refs.signUpFirstname.value, this.refs.signUpLastname.value).then(() => {
          this.accountCreated = 1;
          this.forceUpdate();
        }).catch((error: Error) => {
          // Converts error to string og removes "Error: " from the beginning.
          // Output is only the errormessage from lang.js.
          if(errorMessage) errorMessage.set(String(error).slice(7));
        });
      };
    }
  }
}

class ForgotPass extends React.Component<{}> {

  render() {
    return (
      <div>
        <div id="title">
          <img id="logo" src="resources/logo.svg"></img>
          <div className="titleText"><h1>{lang.title}</h1></div>
        </div>
        <div className="inputForm">
          {lang.forgotPassMsg}
        </div>
      </div>
    );
  }

  componentDidMount() {

  }
}

export { SignIn, SignOut, SignUp, ForgotPass };

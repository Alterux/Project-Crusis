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

import { inputDays, inputMonths, inputYears } from './selectOptions';

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
          <input className="form formAuth" id="formUser" type='text' ref='signInUsername' placeholder={lang.email} />
          <input className="form formAuth" id="formPass" type='password' ref='signInPassword' placeholder={lang.password} />
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
    inputUsername: HTMLInputElement,
    inputPassword: HTMLInputElement,
    inputFirstname: HTMLInputElement,
    inputMiddlename: HTMLInputElement,
    inputLastname: HTMLInputElement,
    inputBirthDay: HTMLInputElement,
    inputBirthMonth: HTMLInputElement,
    inputBirthYear: HTMLInputElement,
    inputCity: HTMLInputElement,
    inputButton: HTMLButtonElement
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
              <input className="form formAuth" id="formUser" type='text' ref='inputUsername' placeholder={lang.email} required />
              <input className="form formAuth" id="formPass" type='password' ref='inputPassword' placeholder={lang.password} required />
            </div>

            <div className="inputFormName">
              <h3>{lang.name}</h3>
              <input className="form" type='text' ref='inputFirstname' placeholder={lang.firstName} required />
              <input className="form" type='text' ref='inputMiddlename' placeholder={lang.middleName} />
              <input className="form" type='text' ref='inputLastname' placeholder={lang.lastName} required />
            </div>

            <div className="inputFormBirth">
              <h3>{lang.birthdate}</h3>
              {inputDays()}
              {inputMonths()}
              {inputYears()}
            </div>

            <div className="inputFormAddress">
              <h3>{lang.address}</h3>
              <input className="form" type='text' ref='inputCity' placeholder={lang.city} required />
            </div>

            <div className="inputFormButton">
              <button className="form" id="signInButton" ref='inputButton'>{lang.signUp}</button>
            </div>

          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    if(menu) menu.forceUpdate();

    if (this.refs.inputButton) {
      this.refs.inputButton.onclick = () => {

        let userName = this.refs.inputUsername.value;
        let hashedPass = this.hashCode(this.refs.inputPassword.value + this.refs.inputUsername.value);
        let firstName = this.refs.inputFirstname.value;
        let middleName = this.refs.inputMiddlename.value;
        let lastName = this.refs.inputLastname.value;
        let birthDate = this.refs.inputBirthYear.value + '-' + this.refs.inputBirthMonth.value + '-' + this.refs.inputBirthDay.value;
        let city = this.refs.inputCity.value;

        userService.signUp(userName, hashedPass, firstName, middleName, lastName, birthDate, city).then(() => {
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

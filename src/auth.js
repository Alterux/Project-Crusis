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
    inputPasswordMatch: HTMLInputElement,
    inputFirstname: HTMLInputElement,
    inputMiddlename: HTMLInputElement,
    inputLastname: HTMLInputElement,
    inputBirthDay: HTMLInputElement,
    inputBirthMonth: HTMLInputElement,
    inputBirthYear: HTMLInputElement,
    inputCity: HTMLInputElement,
    inputButton: HTMLButtonElement
  }

  setState: any;
  accountCreated: number;
  errorEmail: boolean;
  errorPass: boolean;
  errorPassMatch: boolean;
  errorFirstName: boolean;
  errorLastName: boolean;
  errorBirth: boolean;
  errorCity: boolean;

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
    let errorEmail = this.errorEmail;
    let errorPass = this.errorPass;
    let errorPassMatch = this.errorPassMatch;
    let errorFirstName = this.errorFirstName;
    let errorLastName = this.errorLastName;
    let errorBirth = this.errorBirth;
    let errorCity = this.errorCity;

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
            <form>

            <div className="inputFormAuth">
              <input className="form formAuth" id="formUser" type='text' ref='inputUsername' placeholder={lang.email} required />
                {errorEmail ? <div className='errorInput'>{lang.errorEmail}<i /></div> : null}
              <input className="form formAuth" id="formPass" type='password' ref='inputPassword' placeholder={lang.password} required />
                {errorPass ? <div className='errorInput'><i />{lang.errorPass}</div> : null}
              <input className="form formAuth" id="formPass" type='password' ref='inputPasswordMatch' placeholder={lang.passwordMatch} required />
                {errorPassMatch ? <div className='errorInput'><i />{lang.errorPassMatch}</div> : null}
            </div>

            <div className="inputFormName">
              <h3>{lang.name}</h3>
              <input className="form" type='text' ref='inputFirstname' placeholder={lang.firstName} required />
                {errorFirstName ? <div className='errorInput'><i />{lang.errorFirstName}</div> : null}
              <input className="form" type='text' ref='inputMiddlename' placeholder={lang.middleName} />
              <input className="form" type='text' ref='inputLastname' placeholder={lang.lastName} required />
                {errorLastName ? <div className='errorInput'><i />{lang.errorLastName}</div> : null}
            </div>

            <div className="inputFormBirth">
              <h3>{lang.birthdate}</h3>
              {inputDays()}
              {inputMonths()}
              {inputYears()}
                {errorBirth ? <div className='errorInput'><i />{lang.errorBirth}</div> : null}
            </div>

            <div className="inputFormAddress">
              <h3>{lang.address}</h3>
              <input className="form" type='text' ref='inputCity' placeholder={lang.city} required />
                {errorCity ? <div className='errorInput'><i />{lang.errorCity}</div> : null}
            </div>

            <div className="inputFormButton">
              <button className="form" id="signInButton" ref='inputButton'>{lang.signUp}</button>
            </div>
            </form>

          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    if(menu) menu.forceUpdate();

    if (this.refs.inputButton) {
      this.refs.inputButton.onclick = () => {

        const MAILFORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        let userName = this.refs.inputUsername.value;
        let password = this.refs.inputPassword.value;
        let passwordMatch = this.refs.inputPasswordMatch.value;
        let hashedPass = this.hashCode(this.refs.inputPassword.value + this.refs.inputUsername.value);
        let firstName = this.refs.inputFirstname.value;
        let middleName = this.refs.inputMiddlename.value;
        let lastName = this.refs.inputLastname.value;
        let birthYear = this.refs.inputBirthYear.value;
        let birthMonth = this.refs.inputBirthMonth.value;
        let birthDay = this.refs.inputBirthDay.value;
        let birthDate = birthYear + '-' + birthMonth + '-' + birthDay;
        let city = this.refs.inputCity.value;

        if (!userName.match(MAILFORMAT)) this.errorEmail = true;
        if (!password) this.errorPass = true;
        if (passwordMatch !== password) this.errorPassMatch = true;
        if (!firstName) this.errorFirstName = true;
        if (!lastName) this.errorLastName = true;
        if (!birthYear || !birthMonth || !birthDay) this.errorBirth = true;
        if (!city) this.errorCity = true;

        if (this.errorEmail || this.errorPass || this.errorFirstName || this.errorLastName || this.errorBirth || this.errorCity) {
          console.log('signup error');
        } else {
          userService.signUp(userName, hashedPass, firstName, middleName, lastName, birthDate, city).then(() => {
            this.accountCreated = 1;
            this.forceUpdate();
          }).catch((error: Error) => {
            // Converts error to string og removes "Error: " from the beginning.
            // Output is only the errormessage from lang.js.
            if(errorMessage) errorMessage.set(String(error).slice(7));
          });
        }
        this.forceUpdate();

        this.refs.inputUsername.onchange = () => {this.errorEmail = false; this.forceUpdate();}
        this.refs.inputPassword.onchange = () => {this.errorPass = false; this.forceUpdate();}
        this.refs.inputPasswordMatch.onchange = () => {this.errorPassMatch = false; this.forceUpdate();}
        this.refs.inputFirstname.onchange = () => {this.errorFirstName = false; this.forceUpdate();}
        this.refs.inputLastname.onchange = () => {this.errorLastName = false; this.forceUpdate();}
        this.refs.inputBirthYear.onchange = () => {this.errorBirth = false; this.forceUpdate();}
        this.refs.inputBirthMonth.onchange = () => {this.errorBirth = false; this.forceUpdate();}
        this.refs.inputBirthDay.onchange = () => {this.errorBirth = false; this.forceUpdate();}
        this.refs.inputCity.onchange = () => {this.errorCity = false; this.forceUpdate();}
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

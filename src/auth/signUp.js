// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { Menu, menu } from '../main/menu';

import { User, userService } from '../services/userService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';
import { inputDays, inputMonths, inputYears } from '../util/selectOptions';

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
  accountCreated: boolean = false;
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

    if (accountCreated === true) {
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
              <input className="form formAuth" id="formUser" type='email' ref='inputUsername' placeholder={lang.email} required />
                {errorEmail ? <div className='errorInput'><i />{lang.errorEmail}</div> : null}
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
              {inputDays('inputBirthDay', 'form birth')}
              {inputMonths('inputBirthMonth', 'form birth month')}
              {inputYears('inputBirthYear', 'form birth year')}
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

    // on input change => set to validate on input
    this.refs.inputUsername.onchange = () => {validateEmail(); this.refs.inputUsername.oninput = () => {validateEmail()}};
    this.refs.inputPassword.onchange = () => {validatePassword(); this.refs.inputPassword.oninput = () => {validatePassword()}};
    this.refs.inputPasswordMatch.onchange = () => {validatePasswordMatch(); this.refs.inputPasswordMatch.oninput = () => {validatePasswordMatch()}};
    this.refs.inputFirstname.onchange = () => {validateFirstName(); this.refs.inputFirstname.oninput = () => {validateFirstName()};};
    this.refs.inputMiddlename.onchange = () => {validateMiddleName()};
    this.refs.inputLastname.onchange = () => {validateLastName(); this.refs.inputLastname.oninput = () => {validateLastName()}};
    this.refs.inputCity.onchange = () => {validateCity(); this.refs.inputCity.oninput = () => {validateCity()}};

    // button loaded and clicked
    if (this.refs.inputButton) {
      this.refs.inputButton.onclick = () => {

        // get values
        let userName = this.refs.inputUsername.value;
        let hashedPass = this.hashCode(this.refs.inputPassword.value + this.refs.inputUsername.value);
        let firstName = this.refs.inputFirstname.value;
        let middleName = this.refs.inputMiddlename.value;
        let lastName = this.refs.inputLastname.value;
        let birthYear = this.refs.inputBirthYear.value;
        let birthMonth = this.refs.inputBirthMonth.value;
        let birthDay = this.refs.inputBirthDay.value;
        let birthDate = birthYear + '-' + birthMonth + '-' + birthDay;
        let city = this.refs.inputCity.value;

        // birth validation only after button clicked
        this.refs.inputBirthYear.onchange = () => {validateBirth()};
        this.refs.inputBirthMonth.onchange = () => {validateBirth()};
        this.refs.inputBirthDay.onchange = () => {validateBirth()};

        // final validation
        validateEmail();
        validatePassword();
        validatePasswordMatch();
        validateFirstName();
        validateLastName();
        validateBirth();
        validateBirth();
        validateBirth();
        validateCity();

        // validation fail
        if (this.errorEmail || this.errorPass || this.errorPassMatch || this.errorFirstName || this.errorLastName || this.errorBirth || this.errorCity) {
          console.log('signup error');
        } else {
          // validation pass
          userService.signUp(userName, hashedPass, firstName, middleName, lastName, birthDate, city).then(() => {
            this.accountCreated = true;
          }).catch((error: Error) => {
            if(errorMessage) console.log(error);
          });
          this.forceUpdate();
        };
      };
    };

    // constants for validating email and password
    const MAILFORMAT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const LOWERCASE = /[a-z]/g;
    const UPPERCASE = /[A-Z]/g;
    const NUMBERS = /[0-9]/g;

    // email validation
    let validateEmail = () => {
      let userName = this.refs.inputUsername.value;
      if (!userName || !userName.match(MAILFORMAT)) {
        this.errorEmail = true;
        this.refs.inputUsername.setCustomValidity('invalid');
      } else {
        this.errorEmail = false;
        this.refs.inputUsername.setCustomValidity('');
      };
      this.forceUpdate();
    };

    // password validation
    let validatePassword = () => {
      let password = this.refs.inputPassword.value;
      if (!password || password.length < 8 || !password.match(LOWERCASE) || !password.match(UPPERCASE) || !password.match(NUMBERS)) {
        this.errorPass = true;
        this.refs.inputPassword.setCustomValidity('invalid');
      } else {
        this.errorPass = false;
        this.refs.inputPassword.setCustomValidity('');
      };
      this.forceUpdate();
    };

    // password confirmation
    let validatePasswordMatch = () => {
      let password = this.refs.inputPassword.value;
      let passwordMatch = this.refs.inputPasswordMatch.value;
      if (!this.errorPass && (!passwordMatch || passwordMatch !== password)) {
        this.errorPassMatch = true;
        this.refs.inputPasswordMatch.setCustomValidity('invalid');
      } else {
        this.errorPassMatch = false;
        this.refs.inputPasswordMatch.setCustomValidity('');
      };
      this.forceUpdate();
    };

    // firstname validation
    let validateFirstName = () => {
      let firstName = this.refs.inputFirstname.value;
      if (!firstName) {
        this.errorFirstName = true;
      } else {
        this.errorFirstName = false;
      };
      this.forceUpdate();
    };

    // middlename validation
    let validateMiddleName = () => {
      let middleName = this.refs.inputMiddlename.value;
      if (middleName) {
        this.refs.inputMiddlename.style.border = 'solid 1px #00b251';
        this.refs.inputMiddlename.style.borderRight = 'solid 3px #00b251';
      };
      this.forceUpdate();
    };

    // lastname validation
    let validateLastName = () => {
      let lastName = this.refs.inputLastname.value;
      if (!lastName) {
        this.errorLastName = true;
      } else {
        this.errorLastName = false;
      };
      this.forceUpdate();
    };

    // birthdate validation
    let validateBirth = () => {
      let birthYear = this.refs.inputBirthYear.value;
      let birthMonth = this.refs.inputBirthMonth.value;
      let birthDay = this.refs.inputBirthDay.value;
      if (!birthYear || !birthMonth || !birthDay) {
        this.errorBirth = true;
      } else {
        this.errorBirth = false;
      };
      this.forceUpdate();
    };

    // city validation
    let validateCity = () => {
      let city = this.refs.inputCity.value;
      if (!city) {
        this.errorCity = true;
      } else {
        this.errorCity = false;
      };
      this.forceUpdate();
    };

  };
};

export { SignUp };

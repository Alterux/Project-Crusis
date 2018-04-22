// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { menu } from '../main/menu';

import { User, userService } from '../services/userService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';
import { inputDays, inputMonths, inputYears } from '../util/selectOptions';

type Props = {};

type State = {
  inputsFilled: boolean,
  errorSignUp: boolean,
  accountCreated: boolean,
};

class SignUp extends React.Component<Props, State> {
  state = {
    inputsFilled: false,
    errorSignUp: false,
    accountCreated: false,
  }

  refs: {
    inputPhone: HTMLInputElement,
    inputUsername: HTMLInputElement,
    inputPassword: HTMLInputElement,
    inputPasswordMatch: HTMLInputElement,
    inputFirstname: HTMLInputElement,
    inputMiddlename: HTMLInputElement,
    inputLastname: HTMLInputElement,
    inputBirthDay: HTMLInputElement,
    inputBirthMonth: HTMLInputElement,
    inputBirthYear: HTMLInputElement,
    inputAddress: HTMLInputElement,
    inputPostcode: HTMLInputElement,
    inputCity: HTMLInputElement,
    inputButton: HTMLButtonElement,
    backButton: HTMLButtonElement
  }

  errorValidation: boolean = false;
  errorPhone: boolean;
  errorEmail: boolean;
  errorPass: boolean;
  errorPassMatch: boolean;
  errorFirstName: boolean;
  errorLastName: boolean;
  errorBirth: boolean;
  errorAddress: boolean;
  errorPostcode: boolean;
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

  noError() {
    if (this.state.inputsFilled) {
      return (
        <div className='noError'><h3>{lang.noError}</h3></div>
      );
    } else {
      return (
        <div className='notFilled'><h3>{lang.notFilled}</h3></div>
      );
    }
  }

  errorSignUp() {
    return (
      <div>
        {this.errorEmail ? <div className='errorInput'>{lang.errorEmail}</div> : null}
        {this.errorPass ? <div className='errorInput'>{lang.errorPass}</div> : null}
        {this.errorPassMatch ? <div className='errorInput'>{lang.errorPassMatch}</div> : null}
        {this.errorPhone ? <div className='errorInput'>{lang.errorPhone}</div> : null}
        {this.errorFirstName ? <div className='errorInput'>{lang.errorFirstName}</div> : null}
        {this.errorLastName ? <div className='errorInput'>{lang.errorLastName}</div> : null}
        {this.errorBirth ? <div className='errorInput'>{lang.errorBirth}</div> : null}
        {this.errorAddress ? <div className='errorInput'>{lang.errorAddress}</div> : null}
        {this.errorPostcode ? <div className='errorInput'>{lang.errorPostcode}</div> : null}
        {this.errorCity ? <div className='last errorInput'>{lang.errorCity}</div> : null}
      </div>
    );
  }

  render() {
    let errorPhone = this.errorPhone;
    let errorEmail = this.errorEmail;
    let errorPass = this.errorPass;
    let errorPassMatch = this.errorPassMatch;
    let errorFirstName = this.errorFirstName;
    let errorLastName = this.errorLastName;
    let errorBirth = this.errorBirth;
    let errorAddress = this.errorAddress;
    let errorPostcode = this.errorPostcode;
    let errorCity = this.errorCity;

    if (this.state.accountCreated) {
      return (
        <div className="signInPage">
          <div id="title">
            <img id="logo" src="resources/logo.svg"></img>
            <div className="titleText"><h1>{lang.title}</h1></div>
          </div>
          <div className="big-entry inputForm">
            {lang.signedUpMsg}
          </div>
          <div className='big-entry inputForm'>
            <div className='inputFormButton'>
              <button className='lonely form inputButton backButton' ref='backButton'>{lang.back}</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="signInPage">
          <div id="title">
            <img id="logo" src="resources/logo.svg"></img>
            <div className="titleText"><h1>{lang.title}</h1></div>
          </div>

          <div className="big-entry inputForm">
            <div className='status'>Status</div>
            {this.state.errorSignUp ? this.errorSignUp() : this.noError()}
          </div>

          <div className="big-entry inputForm">
            <form>

            <div className="inputFormAuth">
              <input className="form formAuth" id="formUser" type='email' ref='inputUsername' placeholder={lang.email} required />
              <input className="form formAuth" id="formPass" type='password' ref='inputPassword' placeholder={lang.password} required />
              {this.errorPass ? <div className='details errorInput'>{lang.errorPassInfo}</div> : null}
              <input className="form formAuth" id="formPass" type='password' ref='inputPasswordMatch' placeholder={lang.passwordMatch} required />
            </div>

            <div className="inputFormPhone">
              <h3>{lang.phone}</h3>
              <input className="form" type='text' ref='inputPhone' placeholder={lang.phone} required />
            </div>

            <div className="inputFormName">
              <h3>{lang.name}</h3>
              <input className="form" type='text' ref='inputFirstname' placeholder={lang.firstName} required />
              <input className="form" type='text' ref='inputMiddlename' placeholder={lang.middleName} />
              <input className="form" type='text' ref='inputLastname' placeholder={lang.lastName} required />
            </div>

            <div className="inputFormBirth">
              <h3>{lang.birthdate}</h3>
              {inputDays('inputBirthDay', 'form birth')}
              {inputMonths('inputBirthMonth', 'form birth month')}
              {inputYears('inputBirthYear', 'form birth year')}
            </div>

            <div className="inputFormAddress">
              <h3>{lang.address}</h3>
              <input className="form" type='text' ref='inputAddress' placeholder={lang.address} required />
              <input className="form postcode" type='text' ref='inputPostcode' placeholder={lang.postcode} required />
              <input className="form city" type='text' ref='inputCity' placeholder={lang.city} required />
            </div>

            <div className="inputFormButton">
              <button className="form" id="signInButton" ref='inputButton'>{lang.signUp}</button>
            </div>
            </form>
          </div>
          <div className='big-entry inputForm'>
            <div className='inputFormButton'>
              <button className='lonely form inputButton backButton' ref='backButton'>{lang.back}</button>
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    if(menu) menu.forceUpdate();

    // back button
    this.refs.backButton.onclick = () => {
      history.push('/signIn');
    }

    // on input change => set to validate on input
    if (this.refs.inputUsername) {
      window.onchange = () => {
        let phone = this.refs.inputPhone.value;
        let userName = this.refs.inputUsername.value;
        let password = this.refs.inputPassword.value;
        let passwordMatch = this.refs.inputPasswordMatch.value;
        let firstName = this.refs.inputFirstname.value;
        let lastName = this.refs.inputLastname.value;
        let birthYear = this.refs.inputBirthYear.value;
        let birthMonth = this.refs.inputBirthMonth.value;
        let birthDay = this.refs.inputBirthDay.value;
        let address = this.refs.inputAddress.value;
        let postcode = this.refs.inputPostcode.value;
        let city = this.refs.inputCity.value;

        if (!phone || !userName || !password || !passwordMatch || !firstName || !lastName || !birthDay || !birthMonth || !birthYear || !address || !postcode || !city) {
          console.log('Not all input fields are filled')
        } else {
          this.setState({inputsFilled: true});
        }

        if (this.errorPhone || this.errorEmail || this.errorPass || this.errorPassMatch || this.errorFirstName || this.errorLastName || this.errorBirth || this.errorAddress || this.errorPostcode || this.errorCity) {
          this.errorValidation = true;
          this.setState({errorSignUp: true});
        } else {
          this.errorValidation = false;
          this.setState({errorSignUp: false});
        }
      }
    }

    this.refs.inputPhone.onchange = () => {validatePhone(); this.refs.inputPhone.oninput = () => {validatePhone()}}
    this.refs.inputUsername.onchange = () => {validateEmail(); this.refs.inputUsername.oninput = () => {validateEmail()}}
    this.refs.inputPassword.onchange = () => {validatePassword(); this.refs.inputPassword.oninput = () => {validatePassword()}}
    this.refs.inputPasswordMatch.onchange = () => {validatePasswordMatch(); this.refs.inputPasswordMatch.oninput = () => {validatePasswordMatch()}}
    this.refs.inputFirstname.onchange = () => {validateFirstName(); this.refs.inputFirstname.oninput = () => {validateFirstName()}}
    this.refs.inputMiddlename.onchange = () => {validateMiddleName()}
    this.refs.inputLastname.onchange = () => {validateLastName(); this.refs.inputLastname.oninput = () => {validateLastName()}}
    this.refs.inputAddress.onchange = () => {validateAddress(); this.refs.inputAddress.oninput = () => {validateAddress()}}
    this.refs.inputPostcode.onchange = () => {validatePostcode(); this.refs.inputPostcode.oninput = () => {validatePostcode()}}
    this.refs.inputCity.onchange = () => {validateCity(); this.refs.inputCity.oninput = () => {validateCity()}}

    // button loaded and clicked
    if (this.refs.inputButton) {
      this.refs.inputButton.onclick = () => {

        // get values
        let phone = parseInt(this.refs.inputPhone.value);
        let userName = this.refs.inputUsername.value;
        let hashedPass = this.hashCode(this.refs.inputPassword.value + this.refs.inputUsername.value);
        let firstName = this.refs.inputFirstname.value;
        let middleName = this.refs.inputMiddlename.value;
        let lastName = this.refs.inputLastname.value;
        let birthYear = this.refs.inputBirthYear.value;
        let birthMonth = this.refs.inputBirthMonth.value;
        let birthDay = this.refs.inputBirthDay.value;
        let birthDate = birthYear + '-' + birthMonth + '-' + birthDay;
        let address = this.refs.inputAddress.value;
        let postcode = parseInt(this.refs.inputPostcode.value);
        let city = this.refs.inputCity.value;

        // birth validation only after button clicked
        this.refs.inputBirthYear.onchange = () => {validateBirth()}
        this.refs.inputBirthMonth.onchange = () => {validateBirth()}
        this.refs.inputBirthDay.onchange = () => {validateBirth()}

        // final validation
        validatePhone(); this.refs.inputPhone.oninput = () => {validatePhone()}
        validateEmail(); this.refs.inputUsername.oninput = () => {validateEmail()}
        validatePassword(); this.refs.inputPassword.oninput = () => {validatePassword()}
        validatePasswordMatch(); this.refs.inputPasswordMatch.oninput = () => {validatePasswordMatch()}
        validateFirstName(); this.refs.inputFirstname.oninput = () => {validateFirstName()}
        validateMiddleName();
        validateLastName(); this.refs.inputLastname.oninput = () => {validateLastName()}
        validateBirth();
        validateAddress(); this.refs.inputAddress.oninput = () => {validateAddress()}
        validatePostcode(); this.refs.inputPostcode.oninput = () => {validatePostcode()}
        validateCity(); this.refs.inputCity.oninput = () => {validateCity()}

        // validation fail
        if (this.errorValidation) {
          this.setState({errorSignUp: true});
          console.log('signup error');
        } else {
          // validation pass
          userService.signUp(userName, hashedPass, phone, firstName, middleName, lastName, birthDate, address, postcode, city).then(() => {
            this.setState({accountCreated: true});
            // back button
            this.refs.backButton.onclick = () => {
              history.push('/signIn');
            }
          }).catch((error: Error) => {
            if(errorMessage) console.log(error);
          });
        }
      }
    }

    // constants for validating email and password
    const MAILFORMAT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const LOWERCASE = /[a-z]/g;
    const UPPERCASE = /[A-Z]/g;
    const NUMBERS = /[0-9]/g;

    // phone validation
    let validatePhone = () => {
      let phone = this.refs.inputPhone.value;
      if (!phone || isNaN(phone) || phone.length < 5) {
        this.errorPhone = true;
        this.errorValidation = true;
        this.refs.inputPhone.setCustomValidity('invalid');
      } else {
        this.errorPhone = false;
        this.refs.inputPhone.setCustomValidity('');
      }
      this.forceUpdate();
    }

    // email validation
    let validateEmail = () => {
      let userName = this.refs.inputUsername.value;
      if (!userName || !userName.match(MAILFORMAT)) {
        this.errorEmail = true;
        this.errorValidation = true;
        this.refs.inputUsername.setCustomValidity('invalid');
      } else {
        this.errorEmail = false;
        this.refs.inputUsername.setCustomValidity('');
      }
      this.forceUpdate();
    }

    // password validation
    let validatePassword = () => {
      let password = this.refs.inputPassword.value;
      if (!password || password.length < 8 || !password.match(LOWERCASE) || !password.match(UPPERCASE) || !password.match(NUMBERS)) {
        this.errorPass = true;
        this.errorValidation = true;
        this.refs.inputPassword.setCustomValidity('invalid');
      } else {
        this.errorPass = false;
        this.refs.inputPassword.setCustomValidity('');
      }
      this.forceUpdate();
    }

    // password confirmation
    let validatePasswordMatch = () => {
      let password = this.refs.inputPassword.value;
      let passwordMatch = this.refs.inputPasswordMatch.value;
      if (!passwordMatch || passwordMatch !== password) {
        this.errorPassMatch = true;
        this.errorValidation = true;
        this.refs.inputPasswordMatch.setCustomValidity('invalid');
      } else {
        this.errorPassMatch = false;
        this.refs.inputPasswordMatch.setCustomValidity('');
      }
      this.forceUpdate();
    }

    // firstname validation
    let validateFirstName = () => {
      let firstName = this.refs.inputFirstname.value;
      if (!firstName) {
        this.errorFirstName = true;
        this.errorValidation = true;
      } else {
        this.errorFirstName = false;
      }
      this.forceUpdate();
    }

    // middlename validation
    let validateMiddleName = () => {
      let middleName = this.refs.inputMiddlename.value;
      if (middleName) {
        this.refs.inputMiddlename.style.border = 'solid 1px #00b251';
        this.refs.inputMiddlename.style.borderRight = 'solid 3px #00b251';
      }
      this.forceUpdate();
    }

    // lastname validation
    let validateLastName = () => {
      let lastName = this.refs.inputLastname.value;
      if (!lastName) {
        this.errorLastName = true;
        this.errorValidation = true;
      } else {
        this.errorLastName = false;
      }
      this.forceUpdate();
    }

    // birthdate validation
    let validateBirth = () => {
      let birthYear = this.refs.inputBirthYear.value;
      let birthMonth = this.refs.inputBirthMonth.value;
      let birthDay = this.refs.inputBirthDay.value;
      if (!birthYear || !birthMonth || !birthDay) {
        this.errorBirth = true;
        this.errorValidation = true;
      } else {
        this.errorBirth = false;
      }
      this.forceUpdate();
    }

    // address validation
    let validateAddress = () => {
      let address = this.refs.inputAddress.value;
      if (!address) {
        this.errorAddress = true;
        this.errorValidation = true;
      } else {
        this.errorAddress = false;
      }
      this.forceUpdate();
    }

    // city validation
    let validatePostcode = () => {
      let postcode = this.refs.inputPostcode.value;
      if (!postcode || isNaN(postcode) || postcode.length !== 4) {
        this.errorPostcode = true;
        this.errorValidation = true;
        this.refs.inputPostcode.setCustomValidity('invalid');
      } else {
        this.errorPostcode = false;
        this.refs.inputPostcode.setCustomValidity('');
      }
      this.forceUpdate();
    }

    // city validation
    let validateCity = () => {
      let city = this.refs.inputCity.value;
      if (!city) {
        this.errorCity = true;
        this.errorValidation = true;
      } else {
        this.errorCity = false;
      }
      this.forceUpdate();
    }

  }
}

export { SignUp };

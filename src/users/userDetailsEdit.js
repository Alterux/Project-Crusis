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

class UserDetailsEdit extends React.Component<Props, State> {
  refs: {
    backButton: HTMLInputElement,
    saveUserButton: HTMLInputElement,
    deactivateUserButton: HTMLInputElement,
    inputPhone: HTMLInputElement,
    inputUsername: HTMLInputElement,
    inputPassword: HTMLInputElement,
    inputPasswordMatch: HTMLInputElement,
    inputFirstName: HTMLInputElement,
    inputMiddleName: HTMLInputElement,
    inputLastName: HTMLInputElement,
    inputBirthDay: HTMLInputElement,
    inputBirthMonth: HTMLInputElement,
    inputBirthYear: HTMLInputElement,
    inputAddress: HTMLInputElement,
    inputPostcode: HTMLInputElement,
    inputCity: HTMLInputElement,
    inputUserType: HTMLInputElement & ?number
  };

  user = {};
  signedInUser = {};

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
      <div className='contentWrapper'>
        <div className='textBoxWrapper'>

          <div className='big-entry inputForm'>
            <div className='inputFormName'>
              <h3>{lang.name}</h3>
              <input className='form' type='text' ref='inputFirstName' placeholder={lang.firstName} required />
              <input className='form' type='text' ref='inputMiddleName' placeholder={lang.middleName} />
              <input className='form' type='text' ref='inputLastName' placeholder={lang.lastName} required />
            </div>

            <div className='inputFormBirth'>
              <h3>{lang.birthdate}</h3>
              {inputDays('inputBirthDay', 'form birth')}
              {inputMonths('inputBirthMonth', 'form birth month')}
              {inputYears('inputBirthYear', 'form birth year')}
            </div>

            <div className='inputFormPhone'>
              <h3>{lang.phone}</h3>
              <input className='form' type='text' ref='inputPhone' placeholder={lang.phone} required />
            </div>

            <div className='inputFormAddress'>
              <h3>{lang.address}</h3>
              <input className='form' type='text' ref='inputAddress' placeholder={lang.address} required />
              <input className='form postcode' type='text' ref='inputPostcode' placeholder={lang.postcode} required />
              <input className='form city' type='text' ref='inputCity' placeholder={lang.city} required />
            </div>

            {inputFormUserType()}

            <div className='inputFormButton'>
              <button className='form' id='signInButton' ref='saveUserButton'>{lang.saveChanges}</button>
            </div>
          </div>

          <div className='big-entry inputForm'>
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

        // back button
        this.refs.backButton.onclick = () => {
          history.push('/user/' + user[0].id);
        }

        let age = new Date(user[0].birthDate);

        this.refs.inputFirstName.value = this.user.firstName;
        this.refs.inputMiddleName.value = this.user.middleName;
        this.refs.inputLastName.value = this.user.lastName;
        this.refs.inputBirthDay.value = age.getDate().toString();
        this.refs.inputBirthMonth.value = (age.getMonth() + 1).toString();
        this.refs.inputBirthYear.value = age.getFullYear().toString();
        this.refs.inputPhone.value = this.user.phone.toString();
        this.refs.inputAddress.value = this.user.address;
        this.refs.inputPostcode.value = this.user.postcode.toString();
        this.refs.inputCity.value = this.user.city;
        if (this.refs.inputUserType) this.refs.inputUserType.value = this.user.userType.toString();

        // save button
        this.refs.saveUserButton.onclick = () => {

          let firstName = this.refs.inputFirstName.value;
          let middleName = this.refs.inputMiddleName.value;
          let lastName = this.refs.inputLastName.value;
          let birthDate = this.refs.inputBirthYear.value + '-' + this.refs.inputBirthMonth.value + '-' + this.refs.inputBirthDay.value;
          let phone = parseInt(this.refs.inputPhone.value);
          let address = this.refs.inputAddress.value;
          let postcode = parseInt(this.refs.inputPostcode.value);
          let city = this.refs.inputCity.value;
          let userType = parseInt(this.refs.inputUserType.value);
          let id = this.user.id;

          userService.editUser(firstName, middleName, lastName, birthDate, phone, address, postcode, city, userType, id);
          console.log('User account updated.');

          history.push('/user/' + user[0].id);
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

export { UserDetailsEdit };

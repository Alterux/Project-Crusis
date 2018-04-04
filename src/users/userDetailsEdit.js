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

class UserDetailsEdit extends React.Component<{ match: { params: { id: number } } }> {
  refs: {
    saveUserButton: HTMLInputElement,
    inputFirstName: HTMLInputElement,
    inputMiddleName: HTMLInputElement,
    inputLastName: HTMLInputElement,
    inputBirthDay: any,
    inputBirthMonth: any,
    inputBirthYear: any,
    inputCity: HTMLInputElement,
    // inputUserType: HTMLSelectElement,
    inputUserType: any,
  }

  user = {}
  signedInUser = {};

  render() {
    let user = this.user;
    let signedInUser = this.signedInUser;
    let userTypeMsg;

    return (
      <div className="inputForm">

        <div className="inputFormName">
          <h3>{lang.name}</h3>
          <input className="form" type='text' ref='inputFirstName' placeholder={lang.firstName} required />
          <input className="form" type='text' ref='inputMiddleName' placeholder={lang.middleName} />
          <input className="form" type='text' ref='inputLastName' placeholder={lang.lastName} required />
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

        <div className="inputFormUserType">
          <h3>{lang.userType}</h3>
          {inputUserType()}
        </div>

        <div className="inputFormButton">
          <button className="form" id="signInButton" ref='saveUserButton'>{lang.saveChanges}</button>
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

        let age = new Date(user[0].birthDate);

        this.refs.inputFirstName.value = this.user.firstName;
        this.refs.inputMiddleName.value = this.user.middleName;
        this.refs.inputLastName.value = this.user.lastName;
        this.refs.inputBirthDay.value = age.getDate();
        this.refs.inputBirthMonth.value = age.getMonth() + 1;
        this.refs.inputBirthYear.value = age.getFullYear();
        this.refs.inputCity.value = this.user.city;
        this.refs.inputUserType.value = this.user.userType;

        // Edit button
        this.refs.saveUserButton.onclick = () => {

          let firstName = this.refs.inputFirstName.value;
          let middleName = this.refs.inputMiddleName.value;
          let lastName = this.refs.inputLastName.value;
          let birthDate = this.refs.inputBirthYear.value + '-' + this.refs.inputBirthMonth.value + '-' + this.refs.inputBirthDay.value;
          let city = this.refs.inputCity.value;
          let userType = parseInt(this.refs.inputUserType.value);
          let id = this.user.id;

          userService.editUser(firstName, middleName, lastName, birthDate, city, userType, id);
          console.log("User account updated.");

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

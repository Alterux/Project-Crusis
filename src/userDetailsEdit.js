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

class UserDetailsEdit extends React.Component<{ match: { params: { id: number } } }> {
  refs: {
    saveUserButton: HTMLInputElement,
    inputFirstName: HTMLInputElement,
    inputMiddleName: HTMLInputElement,
    inputLastName: HTMLInputElement,
    // inputAge: HTMLInputElement,
    inputAge: any,
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
      <div class="container">

        {/* First name */}
        <div class="row">
          <div class="col-25">
            <label for="fname">{lang.firstName}</label>
          </div>
          <div class="col-75">
            <input type="text" className="formEdit" id="fname" ref="inputFirstName"></input>
          </div>
        </div>

        {/* Middle name */}
        <div class="row">
          <div class="col-25">
            <label for="mname">{lang.middleName}</label>
          </div>
          <div class="col-75">
            <input type="text" className="formEdit" id="mname" ref="inputMiddleName" placeholder={lang.optional}></input>
          </div>
        </div>

        {/* Last name */}
        <div class="row">
          <div class="col-25">
            <label for="lname">{lang.lastName}</label>
          </div>
          <div class="col-75">
            <input type="text" className="formEdit" id="lname" ref="inputLastName"></input>
          </div>
        </div>

        {/* Age */}
        <div class="row">
          <div class="col-25">
            <label for="age">{lang.age}</label>
          </div>
          <div class="col-75">
            <input type="text" className="formEdit" id="age" ref="inputAge"></input>
          </div>
        </div>

        {/* City */}
        <div class="row">
          <div class="col-25">
            <label for="city">{lang.city}</label>
          </div>
          <div class="col-75">
            <input type="text" className="formEdit" id="city" ref="inputCity"></input>
          </div>
        </div>

        {/* Account Type */}
        <div class="row">
          <div class="col-25">
            <label for="userType">{lang.userType}</label>
          </div>
          <div class="col-75">
            <select className="formEdit" id="userType" ref="inputUserType">
              <option value="1">{lang.user}</option>
              <option value="2">{lang.leader}</option>
              <option value="3">{lang.admin}</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div class="row" className="saveUserButton">
          <input type="submit" ref="saveUserButton" value={lang.save}></input>
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

        this.refs.inputFirstName.value = this.user.firstName;
        this.refs.inputMiddleName.value = this.user.middleName;
        this.refs.inputLastName.value = this.user.lastName;
        this.refs.inputAge.value = this.user.age;
        this.refs.inputCity.value = this.user.city;
        this.refs.inputUserType.value = this.user.userType;

        // Edit button
        this.refs.saveUserButton.onclick = () => {
          let firstName = this.refs.inputFirstName.value;
          let middleName = this.refs.inputMiddleName.value;
          let lastName = this.refs.inputLastName.value;
          let age = parseInt(this.refs.inputAge.value);
          let city = this.refs.inputCity.value;
          let userType = parseInt(this.refs.inputUserType.value);
          let id = this.user.id;

          userService.editUser(firstName, middleName, lastName, age, city, userType, id);
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

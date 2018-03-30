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

class UserDetails extends React.Component<{ match: { params: { id: number } } }> {
  refs: {
    editUserButton: HTMLInputElement,
    inputFirstName: HTMLInputElement,
  }

  signedInUser = {};
  user = {};

  render() {
    let signedInUser = this.signedInUser;
    let user = this.user;

    let userTypeMsg;
    let editUserButton;

    // Prints usertype.
    switch (user.userType) {
      case 0:
        userTypeMsg = lang.userType + ": " + lang.new
        break;
      case 1:
        userTypeMsg = lang.userType + ": " + lang.user
        break;
      case 2:
        userTypeMsg = lang.userType + ": " + lang.leader
        break;
      case 3:
        userTypeMsg = lang.userType + ": " + lang.admin
        break;
      default:
        userTypeMsg = ""
    }

    // Shows only edit button for admin or on your own page.
    if (signedInUser.userType === 3 || signedInUser.id === user.id) {
      editUserButton = <div><button ref="editUserButton">{lang.edit}</button></div>
    }

      return (
        <div>
          {editUserButton}
          <img className="accountImg" src="resources/default.png" alt="Account Image" width="50px" height="50px"></img>
          <br />{user.firstName} {user.middleName} {user.lastName}<br />
          <br />{lang.age}: {user.age}
          <br />{lang.city}: {user.city}<br />
          <br />{userTypeMsg}
        </div>
      );
  }

  componentDidMount() {
    // User
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      this.signedInUser = signedInUser;
      this.forceUpdate();

      userService.getUser(this.props.match.params.id).then((user) => {
        this.user = user[0];
        this.forceUpdate();

        // Edit button
        if (signedInUser.userType === 3 || signedInUser.id === user[0].id) {
          this.refs.editUserButton.onclick = () => {
            history.push('/user/' + user[0].id + '/edit/');
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

export { UserDetails };

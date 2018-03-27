// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { lang, en, no } from './lang';
import { connection } from './connect';
import { User, userService } from './userService';
import { Event, eventService } from './eventService';
import { ErrorMessage, errorMessage } from './errorMessage';

class UserDetails extends React.Component<{ match: { params: { id: number } } }> {
  user = {};
  events = [];

  render() {
    let user = this.user;
    let userTypeMsg;
    let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}>
        <Link to={'/user/' + event.fromUserId}>{event.fromUser}</Link> &rarr; <Link to={'/user/' + event.toUserId}>{event.toUser}</Link>
        : {event.text}</li>);
    }

    switch (user.userType) {
      case -1:
        userTypeMsg = lang.userTypeNew
        break;
      case 0:
        userTypeMsg = lang.userTypeUser
        break;
      case 1:
        userTypeMsg = lang.userTypeLeader
        break;
      case 2:
        userTypeMsg = lang.userTypeAdmin
        break;
      default:
        userTypeMsg = ""
    }

    return (
      <div>
        <img className="accountImg" src="resources/default.png" alt="Account Image" width="50px" height="50px"></img>
        <br />{user.firstName} {user.lastName}<br />
        <br />{lang.age}: {user.age}
        <br />{lang.city}: {user.city}<br />
        <br />{userTypeMsg}
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    // User
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      userService.getUser(this.props.match.params.id).then((user) => {
        this.user = user[0];
        // console.log(user[0].firstName)
        this.forceUpdate();
      }).catch((error: Error) => {
        if(errorMessage) errorMessage.set(lang.errorMembers);
      });
    }

    // events
    eventService.getEvents().then(() => {
      this.forceUpdate();
    }).catch((error: Error) => {
      // if(errorMessage) errorMessage.set('Could not get events');
    });
  }

  // Called when the this.props-object change while the component is mounted
  // For instance, when navigating from path /user/1 to /user/2
  componentWillReceiveProps() {
    setTimeout(() => { this.componentDidMount(); }, 0); // Enqueue this.componentDidMount() after props has changed
  }
}

export { UserDetails };

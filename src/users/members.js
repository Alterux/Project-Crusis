// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { connection } from '../services/connect';
import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

class Members extends React.Component<{}> {
  signedInUser = {};
  members = [];
  newMembers = [];

  render() {
    let signedInUser = this.signedInUser;
    let listMembers = [];
    let listNewMembers = [];
    for(let member of this.members) {
      listMembers.push(<li key={member.id}><Link to={'/user/' + member.id}>{member.firstName} {member.middleName} {member.lastName}</Link></li>);
    }
    for(let member of this.newMembers) {
      listNewMembers.push(<li key={member.id}><Link to={'/user/' + member.id}>{member.firstName} {member.middleName} {member.lastName}</Link></li>);
    };

    switch (signedInUser.userType) {

      case 3:
        return (
          <div>
            {lang.members}
            <ul>
              {listMembers}
            </ul>
            {lang.newMembers}
            <ul>
              {listNewMembers}
            </ul>
          </div>
        );

      default:
        return (
          <div>
            {lang.members}
            <ul>
              {listMembers}
            </ul>
          </div>
        );
    }
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      this.signedInUser = signedInUser;

      // Get members
      userService.getMembers(signedInUser.id).then((members) => {
        this.members = members;
        this.forceUpdate();
      }).catch((error: Error) => {
        if(errorMessage) errorMessage.set(lang.errorMembers);
      });

      // Get new members
      userService.getNewMembers(signedInUser.id).then((newMembers) => {
        this.newMembers = newMembers;
        this.forceUpdate();
      }).catch((error: Error) => {
        if(errorMessage) errorMessage.set(lang.errorMembers);
      });

    }
  }
}

export { Members };

// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { lang, en, no } from './lang';
import { ErrorMessage, errorMessage } from './errorMessage';

import { User, Event, userService } from './services';

class Members extends React.Component<{}> {
  members = [];

  render() {
    let listItems = [];
    for(let member of this.members) {
      listItems.push(<li key={member.id}><Link to={'/user/' + member.id}>{member.firstName}</Link></li>);
    }

    return (
      <div>
        {lang.members}
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      userService.getMembers(signedInUser.id).then((members) => {
        this.members = members;
        this.forceUpdate();
      }).catch((error: Error) => {
        if(errorMessage) errorMessage.set(lang.errorMembers);
      });
    }
  }
}

export { Members };

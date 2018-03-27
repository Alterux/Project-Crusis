// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { lang, en, no } from './lang';
import { ErrorMessage, errorMessage } from './errorMessage';

import { connection } from './connect';
import { User, userService } from './userService';
import { Event, eventService } from './eventService';

class Events extends React.Component<{}> {
  events = [];

  render() {
    let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}><Link to={'/user/' + event.id}>{event.firstName}</Link></li>);
    }

    return (
      <div>
        events:
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      eventService.getEvents().then(() => {
        this.forceUpdate();
      }).catch((error: Error) => {
        if(errorMessage) errorMessage.set('Could not get events');
      });
    }
  }
}

export { Events };

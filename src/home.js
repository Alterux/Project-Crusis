// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { lang, en, no } from './lang';
import { ErrorMessage, errorMessage } from './errorMessage';

import { connection } from './connect';
import { User, userService } from './userService';
import { Event, eventService } from './eventService';

class Home extends React.Component<{}> {
  events = [];

  render() {
    let signedInUser = userService.getSignedInUser();
    let welcomeMsg: string = lang.welcomeMsg;
    if (signedInUser) {
      welcomeMsg = lang.loggedInMsg;
    }

    let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}>
        <Link to={'/user/' + event.fromUserId}>{event.fromUser}</Link> &rarr; <Link to={'/user/' + event.toUserId}>{event.toUser}</Link>
        : {event.text}</li>);
    }

    return (
        <div id='welcomeMsg'>{welcomeMsg}
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {

      // events
      eventService.getEvents().then(() => {
        this.forceUpdate();
      }).catch((error: Error) => {
        // if(errorMessage) errorMessage.set('Could not get events');
      });
    } else {
      history.push('/signin');
    }
  }
}

export { Home };

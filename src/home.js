// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { connection } from './services/connect';
import { User, userService } from './services/userService';
import { Event, eventService } from './services/eventService';

import { lang, en, no } from './util/lang';
import { jsCalendar } from './util/jsCalendar';
import { ErrorMessage, errorMessage } from './util/errorMessage';

class Home extends React.Component<{}> {
  events = [];

  render() {
    let signedInUser = userService.getSignedInUser();

    let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}>
        <Link to={'/user/' + event.fromUserId}>{event.fromUser}</Link> &rarr; <Link to={'/user/' + event.toUserId}>{event.toUser}</Link>
        : {event.text}</li>);
    }

    return (
      <div>
        <div id='welcomeMsg'>{lang.loggedInMsg}
        <div className="auto-jsCalendar material-theme red"
            data-month-format="month YYYY">
        </div>
          <ul>
            {listItems}
          </ul>
        </div>
        <div id="news">{lang.newsheading}</div>
      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      jsCalendar.autoFind();

    } else {
      history.push('/signin');
    }
  }
}

export { Home };

// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { lang, en, no } from './lang';
import { User, Event, userService } from './services';
import { ErrorMessage, errorMessage } from './errorMessage';

class UserDetails extends React.Component<{ match: { params: { id: number } } }> {
  events = [];

  render() {
    let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}>
        <Link to={'/user/' + event.fromUserId}>{event.fromUser}</Link> &rarr; <Link to={'/user/' + event.toUserId}>{event.toUser}</Link>
        : {event.text}</li>);
    }

    return (
      <div>
        <img className="accountImg" src="resources/default.png" alt="Account Image" width="50px" height="50px"></img>
        User id: {this.props.match.params.id}
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    // events
    userService.getEvents().then(() => {
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

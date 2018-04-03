// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { lang, en, no } from './lang';
import { ErrorMessage, errorMessage } from './errorMessage';

import { User, Event, userService } from './services';
import { Entry, eventService } from './eventServices';



class Events extends React.Component<{}> {

  events = [];

  render() {
    let data = eventService.getEvents();
    console.log(data);

    let table = [];
    for (let inputs of data) {
      table.push(<tr key={inputs.id}><td>{inputs.name}</td><td>{inputs.location}</td><td>{inputs.city}</td><td>{inputs.date}</td><td>{inputs.time}</td></tr>);
    }
    let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}><Link to={'/user/' + event.id}>{event.firstName}</Link></li>);
    }

    return (
      <div>
        <div>
          <h1>{ lang.eventHeader }</h1>
        </div>
        <div className="eventmain">
          <table className="eventlist">
            <thead>
              <tr>
                <th>{ lang.tableName }</th>
                <th>{ lang.tableLocation }</th>
                <th>{ lang.tableCity }</th>
                <th>{ lang.tableDate }</th>
                <th>{ lang.tableTime }</th>
              </tr>
            </thead>
            <tbody>
              { table }
            </tbody>
          </table>
        </div>

      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      userService.getEvents().then(() => {
        this.forceUpdate();
      }).catch((error: Error) => {
        //if(errorMessage) errorMessage.set('Could not get events');
      });
    }
  }
}

export { Events };

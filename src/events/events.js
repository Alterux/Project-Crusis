// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

class Events extends React.Component<{}> {

  events = [];
  data = []

  render() {
    let table = [];
    for (let inputs of this.events) {
      console.log(inputs.Date);
      let day = inputs.Date.getDate();
      let month = inputs.Date.getMonth() + 1;
      let year = inputs.Date.getFullYear();
      table.push(<tr key={inputs.Id}><td>{inputs.Name}</td><td>{inputs.Location}</td><td>{inputs.City}</td><td>{day} - {month} - {year}</td><td></td></tr>);
    }
    /*let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}><Link to={'/user/' + event.id}>{event.firstName}</Link></li>);
    }*/

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
      eventService.getEvents()
        .then((response) => {
          //console.log(response[0]);
          for (let item of response) {

            this.events.push(item);
          }
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) errorMessage.set(lang.errorMembers);
        });

      /*userService.getEvents().then(() => {
        this.forceUpdate();
      }).catch((error: Error) => {
        //if(errorMessage) errorMessage.set('Could not get events');
      });*/
    }
  }
}

export { Events };

// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { lang, en, no } from '../util/lang';
import { switchMonth } from '../util/modules';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

class Events extends React.Component<{}> {

  events = [];
  data = []

  render() {
    let table = [];
    for (let inputs of this.events) {
      let day = inputs.startDate.getDate();
      let month = inputs.startDate.getMonth() + 1;
      let year = inputs.startDate.getFullYear();

      // calculate event duration
      let getDuration = () => {
        let endDate = new Date(inputs.endDate);
        let startDate = new Date(inputs.startDate);
        let days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)); // duration in days
        let hours = Math.floor((endDate - startDate) / (1000 * 60 * 60) % 24); // duration in hours
        let minutes = Math.floor((endDate - startDate) / (1000 * 60) % 60); // duration in minutes

        if (days) {
          return (days + "d " + hours + "h " + minutes + "min");
        }
        return (hours + "h " + minutes + "min");
      }

      table.push(
        <tr key={inputs.id}>
          <td><Link to={'/event/' + inputs.id}>{inputs.name ? inputs.name : lang.noName}</Link></td>
          <td>{inputs.location}</td>
          <td>{inputs.city}</td>
          <td>{day}.{switchMonth(month)}.{year}</td>
          <td>{getDuration()}</td>
        </tr>
      );
    }

    return (
      <div>
        <div>
          <h1>{ lang.eventHeader }</h1>
<<<<<<< HEAD
          <Link to="/event/create" className="button" > {lang.createEvent}</Link> 
=======
          <Link to="/event/create" className="button" > {lang.createEvent}</Link>
>>>>>>> 7cf29918a433e47c0bd7c94c24235b1a44c18f00
        </div>
        <div className="eventmain">
          <table className="eventlist">
            <thead>
              <tr>
                <th>{ lang.tableName }</th>
                <th>{ lang.tableLocation }</th>
                <th>{ lang.tableCity }</th>
                <th>{ lang.tableDate }</th>
                <th>{ lang.tableDuration }</th>
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </table>
        </div>

      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      eventService.getEvents().then((response) => {

        for (let item of response) {
          this.events.push(item);
        }

          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
    }
  }
}

export { Events };

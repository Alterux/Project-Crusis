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
      let day = inputs.startDate.getDate();
      let month = inputs.startDate.getMonth() + 1;
      let year = inputs.startDate.getFullYear();

      // prints name of month
      let monthName = () => {
        switch (month) {
          case 1: return lang.jan.slice(0, 3);
          case 2: return lang.feb.slice(0, 3);
          case 3: return lang.mar.slice(0, 3);
          case 4: return lang.apr.slice(0, 3);
          case 5: return lang.may.slice(0, 3);
          case 6: return lang.jun.slice(0, 3);
          case 7: return lang.jul.slice(0, 3);
          case 8: return lang.aug.slice(0, 3);
          case 9: return lang.sep.slice(0, 3);
          case 10: return lang.oct.slice(0, 3);
          case 11: return lang.nov.slice(0, 3);
          case 12: return lang.dec.slice(0, 3);
        }
      }

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

      table.push(<tr key={inputs.id}><td>{inputs.name}</td><td>{inputs.location}</td><td>{inputs.city}</td><td>{day}.{monthName()}.{year}</td><td>{getDuration()}</td></tr>);
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
                <th>{ lang.tableDuration }</th>
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

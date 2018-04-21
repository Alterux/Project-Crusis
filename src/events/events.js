// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { lang, en, no } from '../util/lang';
import { switchMonth } from '../util/modules';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

type Props = {};
type State = {};

class Events extends React.Component<Props, State> {
  refs: {
    search: HTMLInputElement,
    createEventButton: HTMLButtonElement,
  };

  signedInUser = {};
  events = [];
  data = [];

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
          <td>{inputs.address}</td>
          <td>{inputs.city}</td>
          <td>{day}.{switchMonth(month)}.{year}</td>
          <td>{getDuration()}</td>
        </tr>
      );
    }

    let createEvent = () => {
      return (
        <div className='entry'>
          <h1>{lang.eventHeader}</h1>
          <button ref='createEventButton'>{lang.createEvent}</button>
        </div>
      );
    }

    return (
      <div className='contentWrapper'>
        <div className='textBoxWrapper'>
          {this.signedInUser.userType > 1 ? createEvent() : null}
          <div className='entry'>
            <input ref='search' placeholder={lang.search}></input>
          </div>
          <div className="last entry eventmain">
            <table className="eventlist">
              <thead>
                <tr>
                  <th>{lang.tableName}</th>
                  <th>{lang.tableLocation}</th>
                  <th>{lang.tableCity}</th>
                  <th>{lang.tableDate}</th>
                  <th>{lang.tableDuration}</th>
                </tr>
              </thead>
              <tbody>
                {table}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      this.signedInUser = signedInUser;

      let search;
      this.refs.search.oninput = () => {
        this.events = [];
        search = this.refs.search.value;
        if (search) {
          searchEvents();
        } else {
          getEvents();
        }
      }

      let searchEvents = () => {
        eventService.searchEvents(search).then((events) => {
          for (let event of events) {
            this.events.push(event);
          }
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }

      let getEvents = () => {
        eventService.getEvents().then((events) => {
          for (let event of events) {
            this.events.push(event);
          }
          this.forceUpdate();
          // create event button
          if (this.refs.createEventButton) {
            this.refs.createEventButton.onclick = () => {
              history.push('/event/create/');
            }
          }
        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }
      getEvents();
    }
  }
}

export { Events };

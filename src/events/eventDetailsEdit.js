// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

class EventDetailsEdit extends React.Component<{ match: { params: { id: number } } }> {
  refs: {
    saveEventButton: HTMLInputElement,
    inputName: HTMLInputElement,
    inputLocation: HTMLInputElement,
    inputCity: HTMLInputElement,
  }

  signedInUser = {};
  event = {};
  participants = [];
  isParticipant: boolean = false;

  render() {
    let event = this.event;
    let listParticipants = [];

    let saveEventButton = <div className="saveEventButton"><button ref="saveEventButton">{lang.save}</button></div>

    for (let participant of this.participants) {
      listParticipants.push(<li key={participant.id}><Link to={'/user/' + participant.id}>{participant.firstName} {participant.middleName} {participant.lastName}</Link></li>)
    }

    return (
      <div className='textBoxWrapper'>
        <div className='userDetailsBox'>
          <div className='textBox'>
            {saveEventButton}
            <div className='entry'>
              <h3>{lang.name}</h3>
              <input ref='inputName'></input>
            </div>
            <div className='entry'>
              <h3>{lang.location}</h3>
              <input ref='inputLocation'></input>
            </div>
            <div className='last entry'>
              <h3>{lang.city}</h3>
              <input ref='inputCity'></input>
            </div>
            <div>
              {/* {event.startDate} */}
            </div>
            <div>
              {/* {event.endDate} */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      this.signedInUser = signedInUser;

      // get event
      eventService.getEvent(this.props.match.params.id).then((event) => {
        this.event = event[0];

        this.refs.inputName.value = this.event.name;
        this.refs.inputLocation.value = this.event.location;
        this.refs.inputCity.value = this.event.city;

        this.forceUpdate();

      }).catch((error: Error) => {
        if(errorMessage) console.log(error);
      });

      // get participants
      let getParticipants = () => {
        eventService.getParticipants(this.props.match.params.id).then((participants) => {
          this.participants = participants;

          for (let participant of participants) {
            if (participant.id === signedInUser.id) {
              this.isParticipant = true;
            }
          }
          this.forceUpdate();

          // save event button
          if (this.refs.saveEventButton) {
            this.refs.saveEventButton.onclick = () => {
              history.push('/event/' + this.props.match.params.id);
            }
          }

        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }
      getParticipants();
    }
  }
}

export { EventDetailsEdit };

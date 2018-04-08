// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

class EventDetails extends React.Component<{ match: { params: { id: number } } }> {
  refs: {
    applyEventButton: HTMLInputElement,
    unapplyEventButton: HTMLInputElement,
  }

  signedInUser = {};
  event = {};
  participants = [];
  isParticipant: boolean = false;

  render() {
    let event = this.event;
    let listParticipants = [];

    let eventButton;

    // user has reported interest
    if (this.isParticipant) {
      eventButton = <div className="unapplyEventButton"><button ref="unapplyEventButton">{lang.reportNotInterested}</button></div>
    // user has not reported interest
    } else {
      eventButton = <div className="applyEventButton"><button ref="applyEventButton">{lang.reportInterested}</button></div>
    }

    for (let participant of this.participants) {
      listParticipants.push(<li key={participant.id}><Link to={'/user/' + participant.id}>{participant.firstName} {participant.middleName} {participant.lastName}</Link></li>)
    }

    return (
      <div className='textBoxWrapper'>
        <div className='userDetailsBox'>
          <div className='textBox'>
            {eventButton}
            <div className='entry'>
              <h3>{lang.name}</h3>
              {event.name}
            </div>
            <div className='entry'>
              <h3>{lang.location}</h3>
              {event.location}
            </div>
            <div className='last entry'>
              <h3>{lang.city}</h3>
              {event.city}
            </div>
            <div>
              {/* {event.startDate} */}
            </div>
            <div>
              {/* {event.endDate} */}
            </div>
          </div>
        </div>
        <div className='competenceBox'>
          <div className='textBox'>
            <h3>{lang.participants}</h3>
            {listParticipants}
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

          // report interest button
          if (this.refs.applyEventButton) {
            this.refs.applyEventButton.onclick = () => {
              this.isParticipant = true;
              eventService.applyEvent(signedInUser.id, this.props.match.params.id);
              getParticipants();
            }
          }

          // remove interest button
          if (this.refs.unapplyEventButton) {
            this.refs.unapplyEventButton.onclick = () => {
              this.isParticipant = false;
              eventService.unapplyEvent(signedInUser.id);
              getParticipants();
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

export { EventDetails };

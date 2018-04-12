// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { switchMonth } from '../util/modules';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

class EventDetails extends React.Component<{ match: { params: { id: number } } }> {
  refs: {
    editEventButton: HTMLInputElement,
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

    let startDay;
    let startMonth;
    let startMonthName;
    let startYear;
    let startHour;
    let startMinute;
    if (event.startDate) {
      let date  = new Date(event.startDate);
      startDay = date.getDate();
      startMonth = date.getMonth() + 1;
      startMonthName = switchMonth(startMonth);
      startYear = date.getFullYear();
      startHour = date.getHours();
      startHour = ("0" + startHour).slice(-2);
      startMinute = date.getMinutes();
      startMinute = ("0" + startMinute).slice(-2);
    }

    let endDay;
    let endMonth;
    let endMonthName;
    let endYear;
    let endHour;
    let endMinute;
    if (event.endDate) {
      let date  = new Date(event.endDate);
      endDay = date.getDate();
      endMonth = date.getMonth() + 1;
      endMonthName = switchMonth(endMonth);
      endYear = date.getFullYear();
      endHour = date.getHours();
      endHour = ("0" + endHour).slice(-2);
      endMinute = date.getMinutes();
      endMinute = ("0" + endMinute).slice(-2);
    }

    let editEventButton;

    if (this.signedInUser.userType > 1) {
      editEventButton = <div className="editEventButton"><button ref="editEventButton">{lang.edit}</button></div>
    }

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
            {editEventButton}
            {eventButton}
            <div className='entry'>
              <h3>{lang.name}</h3>
              {event.name}
            </div>
            <div className='entry'>
              <h3>{lang.location}</h3>
              {event.location}
            </div>
            <div className='entry'>
              <h3>{lang.city}</h3>
              {event.city}
            </div>
            <div className='entry'>
              <h3>{lang.startDate}</h3>
              {startDay}.{startMonthName}.{startYear}, {startHour}:{startMinute}
            </div>
            <div className='entry'>
              <h3>{lang.endDate}</h3>
              {endDay}.{endMonthName}.{endYear}, {endHour}:{endMinute}
            </div>
            <div className='last entry'>
              <h3>{lang.details}</h3>
              {event.details}
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

          // edit event button
          if (this.refs.editEventButton) {
            this.refs.editEventButton.onclick = () => {
              history.push('/event/' + this.props.match.params.id + '/edit/');
            }
          }

          // report interest button
          if (this.refs.applyEventButton) {
            this.refs.applyEventButton.disabled = false;
            this.refs.applyEventButton.onclick = () => {
              this.refs.applyEventButton.disabled = true;
              this.isParticipant = true;
              eventService.applyEvent(signedInUser.id, this.props.match.params.id);
              getParticipants();
            }
          }

          // remove interest button
          if (this.refs.unapplyEventButton) {
            this.refs.unapplyEventButton.disabled = false;
            this.refs.unapplyEventButton.onclick = () => {
              this.refs.unapplyEventButton.disabled = true;
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

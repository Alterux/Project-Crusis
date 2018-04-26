// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';
import { EventRole, roleService } from '../services/roleService';

import { lang, en, no } from '../util/lang';
import { switchMonth } from '../util/modules';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

type Props = {
  match: {
    params: {
      id: number
    }
  }
};

type State = {};

class EventDetails extends React.Component<Props, State> {
  refs: {
    editEventButton: HTMLInputElement,
    applyEventButton: HTMLInputElement,
    unapplyEventButton: HTMLInputElement,
    deleteEventButton: HTMLInputElement,
  };

  signedInUser = {};
  event = {};
  roles = [];
  interested = [];
  isuser: boolean = false;

  render() {
    let event = this.event;
    let listRoles = [];
    let listInterested = [];
    let eventButton;

    // attendance date
    let attendanceDay;
    let attendanceMonth;
    let attendanceMonthName;
    let attendanceYear;
    let attendanceHour;
    let attendanceMinute;
    if (event.attendanceDate) {
      let date = new Date(event.attendanceDate);
      attendanceDay = date.getDate();
      attendanceMonth = date.getMonth() + 1;
      attendanceMonthName = switchMonth(attendanceMonth);
      attendanceYear = date.getFullYear();
      attendanceHour = date.getHours();
      attendanceHour = ('0' + attendanceHour).slice(-2);
      attendanceMinute = date.getMinutes();
      attendanceMinute = ('0' + attendanceMinute).slice(-2);
    }

    // start date
    let startDay;
    let startMonth;
    let startMonthName;
    let startYear;
    let startHour;
    let startMinute;
    if (event.startDate) {
      let date = new Date(event.startDate);
      startDay = date.getDate();
      startMonth = date.getMonth() + 1;
      startMonthName = switchMonth(startMonth);
      startYear = date.getFullYear();
      startHour = date.getHours();
      startHour = ('0' + startHour).slice(-2);
      startMinute = date.getMinutes();
      startMinute = ('0' + startMinute).slice(-2);
    }

    // end date
    let endDay;
    let endMonth;
    let endMonthName;
    let endYear;
    let endHour;
    let endMinute;
    if (event.endDate) {
      let date = new Date(event.endDate);
      endDay = date.getDate();
      endMonth = date.getMonth() + 1;
      endMonthName = switchMonth(endMonth);
      endYear = date.getFullYear();
      endHour = date.getHours();
      endHour = ('0' + endHour).slice(-2);
      endMinute = date.getMinutes();
      endMinute = ('0' + endMinute).slice(-2);
    }

    let editEventButton;
    let deleteEventButton;

    // admins and leader can change events
    if (this.signedInUser.userType > 1) {
      editEventButton = <div className='editEventButton'><button ref='editEventButton'>{lang.edit}</button></div>
    }

    // only admins can delete events
    if (this.signedInUser.userType === 3) {
      deleteEventButton = <div className='deleteEventButton'><button className='deleteButton' ref='deleteEventButton'>{lang.delete}</button></div>
    }

    // user has reported interest
    if (this.isuser) {
      eventButton = <div className='unapplyEventButton'><button ref='unapplyEventButton'>{lang.reportNotInterested}</button></div>
    // user has not reported interest
    } else {
      eventButton = <div className='applyEventButton'><button ref='applyEventButton'>{lang.reportInterested}</button></div>
    }

    // list roles with quantity for event
    for (let role of this.roles) {
      listRoles.push(<li key={role.id}>{lang[role.name]}: {role.quantity}</li>)
    }

    // list interested users
    for (let user of this.interested) {
      listInterested.push(<li key={user.id}><Link to={'/user/' + user.id}>{user.firstName} {user.middleName} {user.lastName}</Link></li>)
    }

    return (
      <div className='contentWrapper'>
        <div className='textBoxWrapper'>
          <div className='userDetailsBox'>
            <div className='textBox'>
              {editEventButton}
              <div className='entry'>
                <h3>{lang.name}</h3>
                {event.name}
              </div>
              <div className='entry'>
                <h3>{lang.address}</h3>
                <div>{event.address},</div>
                <div>{event.postcode} {event.city}</div>
              </div>
              <div className='entry'>
                <h3>{lang.details}</h3>
                {event.details}
              </div>
              <div className='entry'>
                <h3>{lang.equipment}</h3>
                {event.equipment}
              </div>
              <div className='entry'>
                <h3>{lang.attendanceDate}</h3>
                {attendanceDay}.{attendanceMonthName}.{attendanceYear}, {attendanceHour}:{attendanceMinute}
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
                <h3>{lang.roles}</h3>
                {listRoles}
              </div>
              {deleteEventButton}
            </div>
          </div>
          <div className='competenceBox'>
            <div className='textBox'>
              {eventButton}
              <h3>{lang.interested}</h3>
              {listInterested}
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

        // get roles for this event
        roleService.getEventRoles(this.props.match.params.id).then((roles) => {
          this.roles = roles;
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });

      }).catch((error: Error) => {
        if(errorMessage) console.log(error);
      });

      // get interested
      let getInterested = () => {
        eventService.getInterested(this.props.match.params.id).then((interested) => {
          this.interested = interested;

          for (let user of interested) {
            if (user.id === signedInUser.id) {
              this.isuser = true;
            }
          }
          this.forceUpdate();

          // edit event button
          if (this.refs.editEventButton) {
            this.refs.editEventButton.onclick = () => {
              history.push('/event/' + this.props.match.params.id + '/edit/');
            }
          }

          // delete event button
          if (this.refs.deleteEventButton) {
            this.refs.deleteEventButton.onclick = () => {
              let result = confirm(lang.confirmEventDelete);
              if (result) {
                eventService.deleteEvent(this.props.match.params.id);
                  history.push('/events');
                this.forceUpdate();
              }
            }
          }

          // report interest button
          if (this.refs.applyEventButton) {
            this.refs.applyEventButton.disabled = false;
            this.refs.applyEventButton.onclick = () => {
              this.refs.applyEventButton.disabled = true;
              this.isuser = true;
              eventService.applyEvent(signedInUser.id, this.props.match.params.id);
              getInterested();
            }
          }

          // remove interest button
          if (this.refs.unapplyEventButton) {
            this.refs.unapplyEventButton.disabled = false;
            this.refs.unapplyEventButton.onclick = () => {
              this.refs.unapplyEventButton.disabled = true;
              this.isuser = false;
              eventService.unapplyEvent(signedInUser.id, this.props.match.params.id);
              getInterested();
            }
          }

        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }
      getInterested();
    }
  }
}

export { EventDetails };

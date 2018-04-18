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
import { inputDays, inputMonths, inputYears, inputHours, inputMinutes } from '../util/selectOptions';

type Props = {
  match: {
    params: {
      id: number
    }
  }
};

type State = {};

class EventDetailsEdit extends React.Component<Props, State> {
  refs: {
    saveEventButton: HTMLInputElement,
    inputName: HTMLInputElement,
    inputLocation: HTMLInputElement,
    inputCity: HTMLInputElement,
    inputDetails: HTMLInputElement,
    inputStartDay: any,
    inputStartMonth: any,
    inputStartYear: any,
    inputStartHour: any,
    inputStartMinute: any,
    inputEndDay: any,
    inputEndMonth: any,
    inputEndYear: any,
    inputEndHour: any,
    inputEndMinute: any,
  };

  signedInUser = {};
  event = {};
  interested = [];
  isuser: boolean = false;

  render() {
    let event = this.event;
    let listinterested = [];

    let saveEventButton = <div className="saveEventButton"><button ref="saveEventButton">{lang.save}</button></div>

    for (let user of this.interested) {
      listinterested.push(<li key={user.id}><Link to={'/user/' + user.id}>{user.firstName} {user.middleName} {user.lastName}</Link></li>)
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
            <div className='entry'>
              <h3>{lang.city}</h3>
              <input ref='inputCity'></input>
            </div>
            <div className='entry'>
              <h3>{lang.startDate}</h3>
              {inputDays('inputStartDay', 'days')}
              {inputMonths('inputStartMonth', 'months')}
              {inputYears('inputStartYear', 'years')}
              {inputHours('inputStartHour', 'hours')}
              {inputMinutes('inputStartMinute', 'minutes')}
            </div>
            <div className='entry'>
              <h3>{lang.endDate}</h3>
              {inputDays('inputEndDay', 'days')}
              {inputMonths('inputEndMonth', 'months')}
              {inputYears('inputEndYear', 'years')}
              {inputHours('inputEndHour', 'hours')}
              {inputMinutes('inputEndMinute', 'minutes')}
            </div>
            <div className='last entry'>
              <h3>{lang.details}</h3>
              <textarea rows="4" cols="36" ref='inputDetails'></textarea>
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

        // input fields
        this.refs.inputName.value = this.event.name;
        this.refs.inputLocation.value = this.event.location;
        this.refs.inputCity.value = this.event.city;
        this.refs.inputDetails.value = this.event.details;

        // start date
        this.refs.inputStartDay.value = this.event.startDate.getDate();
        this.refs.inputStartMonth.value = this.event.startDate.getMonth() + 1;
        this.refs.inputStartYear.value = this.event.startDate.getFullYear();
        this.refs.inputStartHour.value = this.event.startDate.getHours();
        this.refs.inputStartMinute.value = this.event.startDate.getMinutes();

        // end date
        this.refs.inputEndDay.value = this.event.endDate.getDate();
        this.refs.inputEndMonth.value = this.event.endDate.getMonth() + 1;
        this.refs.inputEndYear.value = this.event.endDate.getFullYear();
        this.refs.inputEndHour.value = this.event.endDate.getHours();
        this.refs.inputEndMinute.value = this.event.endDate.getMinutes();

        // save event button
        if (this.refs.saveEventButton) {
          this.refs.saveEventButton.onclick = () => {

            // input values
            let name = this.refs.inputName.value;
            let location = this.refs.inputLocation.value;
            let city = this.refs.inputCity.value;
            let details = this.refs.inputDetails.value;

            // start date
            let startDay = this.refs.inputStartDay.value;
            let startMonth = this.refs.inputStartMonth.value;
            let startYear = this.refs.inputStartYear.value;
            let startHour = this.refs.inputStartHour.value;
            let startMinute = this.refs.inputStartMinute.value;

            // end date
            let endDay = this.refs.inputEndDay.value;
            let endMonth = this.refs.inputEndMonth.value;
            let endYear = this.refs.inputEndYear.value;
            let endHour = this.refs.inputEndHour.value;
            let endMinute = this.refs.inputEndMinute.value;

            let startDate = startYear + '-' + startMonth + '-' + startDay + '-' + startHour + '-' + startMinute;
            let endDate = endYear + '-' + endMonth + '-' + endDay + '-' + endHour + '-' + endMinute;

            eventService.editEvent(this.props.match.params.id, name, location, city, startDate, endDate, details).catch((error: Error) => { if(errorMessage) console.log(error)});
            history.push('/event/' + this.props.match.params.id);
          }
        }

        this.forceUpdate();

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



        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }
      getInterested();
    }
  }
}

export { EventDetailsEdit };

// @flow
import * as React from 'react';

import {connection} from '../services/connect';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { switchMonth } from '../util/modules';
import { ErrorMessage, errorMessage } from '../util/errorMessage';
import { inputDays, inputMonths, inputYears, inputHours, inputMinutes } from '../util/selectOptions';

class EventCreation extends React.Component<{ match: { params: { id: number } } }> {
  refs: {
    createEventButton: HTMLInputElement,
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
  }

  signedInUser = {};
  event = [];
  participants = [];
  isParticipant: boolean;

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

        // save event button
        if (this.refs.createEventButton) {
          this.refs.createEventButton.onclick = () => {

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



        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }
      getParticipants();
    }
  }
}

export { EventCreation };

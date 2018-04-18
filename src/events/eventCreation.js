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

type Props = {};
type State = {};

class EventCreation extends React.Component<Props, State>{
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
  };

  signedInUser = {};
  event = [];
  participants = [];
  isParticipant: boolean;

   render() {
      let saveEventButton = <div className="saveEventButton"><button ref="createEventButton">{lang.save}</button></div>;

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
       //this.signedInUser = signedInUser;

      // save event button
      if (this.refs.createEventButton) {
        this.refs.createEventButton.onclick = () => {

          let eventHolder = new Event();

          // input values
          eventHolder.name = this.refs.inputName.value;
          eventHolder.location = this.refs.inputLocation.value;
          eventHolder.city = this.refs.inputCity.value;
          eventHolder.details = this.refs.inputDetails.value;

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

          eventHolder.startDate = new Date(startYear, startMonth, startDay, startHour, startMinute);
          eventHolder.endDate = new Date(endYear, endMonth, endDay, endHour, endMinute);

          eventService.createEvent(eventHolder).catch((error: Error) => { if(errorMessage) console.log(error)})
          .then(() => {/*bedre redirect?*/ });
          //TODO push correct create event to history
          //history.push('/event/' + this.props.match.params.id);
        }
      }
    }
  }
}

export { EventCreation };

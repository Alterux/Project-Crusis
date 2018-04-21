// @flow
import * as React from 'react';

import {connection} from '../services/connect';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import { User, userService } from '../services/userService';
import { Role, roleService } from '../services/roleService';
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

type State = {
  roleInputs: number,
};

class EventDetailsEdit extends React.Component<Props, State>{
  state = {
    eventCreated: false,
    roleInputs: 2,
  };

  refs: {
    backButton: HTMLInputElement,
    saveEventButton: HTMLInputElement,
    addRoleButton: HTMLInputElement,
    removeRoleButton: HTMLInputElement,
    inputName: HTMLInputElement,
    inputAddress: HTMLInputElement,
    inputPostcode: HTMLInputElement,
    inputCity: HTMLInputElement,
    inputDetails: HTMLInputElement,
    inputEquipment: HTMLInputElement,

    inputAttendanceDate: HTMLInputElement,
    inputAttendanceTime: HTMLInputElement,
    inputStartDate: HTMLInputElement,
    inputStartTime: HTMLInputElement,
    inputEndDate: HTMLInputElement,
    inputEndTime: HTMLInputElement,

    inputRoles: string,
  };

  signedInUser = {};
  event = {};
  participants = [];
  isParticipant: boolean;
  roles = [];
  eventRoles = [];
  selectedRoles = [];

  render() {
   let inputRoles = [];
   let inputQuantities = [];
   let listRoles = [];
   let selectRoles = [];

   for (let role of this.roles) {
     listRoles.push(<option ref={role.id.toString()} value={role.id}>{role.name}</option>);
   }

   for (let role of this.selectedRoles) {
     listRoles.splice(role, 1, (<option ref={role.toString()} value={role + 1} disabled>{this.roles[role].name}</option>));
   }

   let addRoleInput = () => {
     for (var i = 2; i < this.state.roleInputs; i++) {
       inputRoles.push(
         <div>
           <div className='float-left'>
             <select className='form inputRoles' ref={'inputRole'+i} required>{listRoles}</select>
           </div>
           <div className='float-right'>
             <input className="form inputQuantity" type='number' ref={'inputQuantity'+i} min='1' defaultValue='1' placeholder={lang.quantity} required />
           </div>
         </div>
       );
     }
   }

   let createEvent = () => {
     return (
       <div className="inputForm">
         <form>

         <div className="entry inputFormName">
           <h3>{lang.name}</h3>
           <input className="form" type='text' ref='inputName' placeholder={lang.name} required />
         </div>

         <div className="entry inputFormDetails">
           <h3>{lang.details}</h3>
           <textarea className="form" type='text' rows="4" cols="36" ref='inputDetails' placeholder={lang.details} required></textarea>
           <h3>{lang.equipment}</h3>
           <textarea className="form" type='text' rows="4" cols="36" ref='inputEquipment' placeholder={lang.equipment} required></textarea>
         </div>

         <div className="entry inputFormAddress">
           <h3>{lang.address}</h3>
           <input className="form" type='text' ref='inputAddress' placeholder={lang.address} required />
           <input className="form postcode" type='text' ref='inputPostcode' placeholder={lang.postcode} required />
           <input className="form city" type='text' ref='inputCity' placeholder={lang.city} required />
         </div>

         <div className="entry inputFormBirth">
           <div className='float-left'>
             <h3>{lang.attendanceDate}</h3>
             <input className="form birth date" type='date' ref='inputAttendanceDate' placeholder={lang.city} required />
           </div>
           <div className='float-right'>
             <h3>{lang.theTime}</h3>
             <input className="form birth time" type='time' ref='inputAttendanceTime' placeholder={lang.city} required />
           </div>
         </div>

         <div className="entry inputFormBirth">
           <div className='float-left'>
             <h3>{lang.startDate}</h3>
             <input className="form birth date" type='date' ref='inputStartDate' placeholder={lang.city} required />
           </div>
           <div className='float-right'>
             <h3>{lang.theTime}</h3>
             <input className="form birth time" type='time' ref='inputStartTime' placeholder={lang.city} required />
           </div>
         </div>

         <div className="entry inputFormBirth">
           <div className='float-left'>
             <h3>{lang.endDate}</h3>
             <input className="form birth date" type='date' ref='inputEndDate' placeholder={lang.city} required />
           </div>
           <div className='float-right'>
             <h3>{lang.theTime}</h3>
             <input className="form birth time" type='time' ref='inputEndTime' placeholder={lang.city} required />
           </div>
         </div>

         <div className="entry inputFormRoles">
           {addRoleInput()}
           <div className='entry'>
             <h3>{lang.roles}</h3>
             <h3 className='float-right right-correction'>{lang.quantity}</h3>
           </div>
           <div>
             <div>
               <div className='float-left'>
                 <select className='form inputRoles' ref='inputRole0' value='1' disabled>{listRoles}</select>
               </div>
               <div className='float-right'>
                 <input className="form inputQuantity" type='number' ref='inputQuantity0' min='1' defaultValue='1' placeholder={lang.quantity} required />
               </div>
             </div>
             <div>
               <div className='float-left'>
                 <select className='form inputRoles' ref='inputRole1' value='2' disabled>{listRoles}</select>
               </div>
               <div className='float-right'>
                 <input className="form inputQuantity" type='number' ref='inputQuantity1' min='1' defaultValue='1' placeholder={lang.quantity} required />
               </div>
             </div>
             {inputRoles}
           </div>
           <button className="form birth addInputButton inputButton backButton" ref='addRoleButton'>+</button>
           {this.state.roleInputs > 2
             ? (<button className="form birth removeInputButton inputButton deleteButton" ref='removeRoleButton'>-</button>)
             : <button className="form birth removeInputButton" ref='removeRoleButton' disabled>-</button>}
         </div>

         <div className="inputFormButton">
           <button className="form" id="signInButton" ref='saveEventButton'>{lang.saveChanges}</button>
         </div>
         </form>

       </div>
     );
   }

   return (
      <div className='contentWrapper'>
        <div className='textBoxWrapper'>
          {createEvent()}
        </div>
        <div className='big-entry inputForm'>
          <div className='inputFormButton'>
            <button className='lonely form inputButton backButton' ref='backButton'>{lang.back}</button>
          </div>
        </div>
      </div>
    );
  }

   componentDidMount() {
     let removeRoleInput = () => {
       this.refs.removeRoleButton.onclick = () => {
         for (var i = 0; i < this.state.roleInputs; i++) {
           let id = this.refs['inputRole'+i].value;
           this.selectedRoles.splice(id - 1, 1);
         }
         this.setState({roleInputs: this.state.roleInputs-1});
       }
     }
     removeRoleInput();

     let addRoleInput = () => {
       for (var i = 2; i < this.state.roleInputs; i++) {
         removeRoleInput();
       }
     }
     let signedInUser = userService.getSignedInUser();
     if(signedInUser) {

     roleService.getRoles().then((roles) => {
       this.roles = roles;
       this.forceUpdate();
     });

     addRoleInput();

     // back button
     this.refs.backButton.onclick = () => {
       history.push('/event/' + this.props.match.params.id);
     }

     // add role button
     this.refs.addRoleButton.onclick = () => {
       for (var i = 0; i < this.state.roleInputs; i++) {
         let id = this.refs['inputRole'+i].value;
         this.selectedRoles.push(id - 1);
       }
       this.setState({roleInputs: this.state.roleInputs+1});
       addRoleInput();
     }

     // get the event info
     eventService.getEvent(this.props.match.params.id).then((thisEvent) => {
       let event = thisEvent[0];

       // set values
       this.refs.inputName.value = event.name;
       this.refs.inputDetails.value = event.details;
       this.refs.inputEquipment.value = event.equipment;
       this.refs.inputAddress.value = event.address;
       this.refs.inputPostcode.value = event.postcode.toString();
       this.refs.inputCity.value = event.city;

       // attendance
       this.refs.inputAttendanceDate.value = event.attendanceDate.toISOString().substring(0, 10);
       this.refs.inputAttendanceTime.value = event.attendanceDate.toISOString().substring(11, 16);

       // start
       this.refs.inputStartDate.value = event.startDate.toISOString().substring(0, 10);
       this.refs.inputStartTime.value = event.startDate.toISOString().substring(11, 16);

       // end
       this.refs.inputEndDate.value = event.endDate.toISOString().substring(0, 10);
       this.refs.inputEndTime.value = event.endDate.toISOString().substring(11, 16);

     }).catch((error: Error) => {
       if(errorMessage) console.log(error);
     });

     // get the roles for the event
     roleService.getEventRoles(this.props.match.params.id).then((roles) => {
       for (let role of roles) {
         this.eventRoles.push(role.id);
       }
       this.setState({roleInputs: roles.length});
       // console.log(roles)
       // set role id and quantity for each inputrole
       for (var i = 2; i < this.state.roleInputs; i++) {
         this.refs['inputRole'+i].value = roles[i].id;
         this.refs['inputQuantity'+i].value = roles[i].quantity;
       }

     }).catch((error: Error) => {
       if(errorMessage) console.log(error);
     });

      // save event button
      if (this.refs.saveEventButton) {
        this.refs.saveEventButton.onclick = () => {

          // input values
          let name = this.refs.inputName.value;
          let details = this.refs.inputDetails.value;
          let equipment = this.refs.inputEquipment.value;
          let address = this.refs.inputAddress.value;
          let postcode = parseInt(this.refs.inputPostcode.value);
          let city = this.refs.inputCity.value;

          // attendance
          let attendanceDate = this.refs.inputAttendanceDate.value;
          let attendanceTime = this.refs.inputAttendanceTime.value;
          let attendance = attendanceDate + '-' + attendanceTime;

          // start
          let startDate = this.refs.inputStartDate.value;
          let startTime = this.refs.inputStartTime.value;
          let start = startDate + '-' + startTime;

          // end
          let endDate = this.refs.inputEndDate.value;
          let endTime = this.refs.inputEndTime.value;
          let end = endDate + '-' + endTime;

          // edit the event
          eventService.editEvent(name, details, equipment, address, postcode, city, attendance, start, end, this.props.match.params.id).then(() => {
            history.push('/event/' + this.props.match.params.id);

            // add new roles to event
            for (var i = 0; i < this.state.roleInputs; i++) {
              if (!this.eventRoles.includes(parseInt(this.refs['inputRole'+i].value))) {
                let roleId = this.refs['inputRole'+i].value;
                let quantity = this.refs['inputQuantity'+i].value;
                roleService.createEventRole(this.props.match.params.id, roleId, quantity).then(() => {
                }).catch((error: Error) => {if(errorMessage) console.log(error)});
              }
            }

            // remove roles from event
            let roleId = 0;
            for (let role of this.eventRoles) {
              if (!this.refs['inputRole'+roleId]) {
                roleService.removeEventRole(this.props.match.params.id, roleId).then(() => {
                }).catch((error: Error) => {if(errorMessage) console.log(error)});
              }
              roleId++;
            }
          }).catch((error: Error) => {if(errorMessage) console.log(error)});
        }
      }
    }
  }
}

export { EventDetailsEdit };

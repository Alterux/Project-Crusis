// @flow
import * as React from 'react';

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

type Props = {};

type State = {
  eventCreated: boolean,
  roleInputs: number,
};

class EventCreation extends React.Component<Props, State>{
  state = {
    eventCreated: false,
    roleInputs: 2,
  };

  refs: {
    backButton: HTMLInputElement,
    toEventButton: HTMLInputElement,
    createEventButton: HTMLInputElement,
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
  selectedRoles = [];

  render() {
   let inputRoles = [];
   let inputQuantities = [];
   let listRoles = [];
   let selectRoles = [];

   for (let role of this.roles) {
     listRoles.push(<option key={role.id.toString()} ref={role.id.toString()} value={role.id}>{lang[role.name]}</option>);
   }

   for (let role of this.selectedRoles) {
     listRoles.splice(role, 1, (<option key={role.toString()} ref={role.toString()} value={role + 1} disabled>{lang[this.roles[role].name]}</option>));
   }

   let addRoleInput = () => {
     for (var i = 2; i < this.state.roleInputs; i++) {
       inputRoles.push(
         <div >
           <div key={'role'+i} className='float-left'>
             <select className='form inputRoles' ref={'inputRole'+i} required>{listRoles}</select>
           </div>
           <div key={'quantity'+i} className='float-right'>
             <input className="form inputQuantity" type='number' ref={'inputQuantity'+i} min='1' defaultValue='1' placeholder={lang.quantity} required />
           </div>
         </div>
       );
     }
   }

   let eventCreated = () => {
     return (
       <div>
         <div className="big-entry inputForm">
           {lang.eventCreatedMsg}
         </div>
         <div className='big-entry inputForm'>
           <div className='inputFormButton'>
             <button className='lonely form inputButton' ref='toEventButton'>{lang.toEvent}</button>
           </div>
         </div>
       </div>
     );
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
           <button className="form" id="signInButton" ref='createEventButton'>{lang.createEvent}</button>
         </div>
         </form>

       </div>
     );
   }

   return (
     <div className='full contentWrapper'>
       <div id="title">
         <img id="logo" src="resources/logo.svg"></img>
         <div className="titleText"><h1>{lang.title}</h1></div>
       </div>
        <div className='textBoxWrapper'>
          {this.state.eventCreated ? eventCreated() : createEvent()}
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
     let addRoleInput = () => {
       for (var i = 2; i < this.state.roleInputs; i++) {
         this.refs.removeRoleButton.onclick = () => {
           for (var i = 0; i < this.state.roleInputs; i++) {
             let id = this.refs['inputRole'+i].value;
             this.selectedRoles.splice(id - 1, 1);
           }
           this.setState({roleInputs: this.state.roleInputs-1});
         }
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
       history.push('/events');
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

      // save event button
      if (this.refs.createEventButton) {
        this.refs.createEventButton.onclick = () => {

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

          eventService.createEvent(name, details, equipment, address, postcode, city, attendance, start, end).then(() => {
            eventService.getCreatedEvent().then((event) => {
              let eventId = event[0].id;
              for (var i = 0; i < this.state.roleInputs; i++) {
                let roleId = this.refs['inputRole'+i].value;
                let quantity = this.refs['inputQuantity'+i].value;
                roleService.createEventRole(eventId, roleId, quantity).then(() => {
                }).catch((error: Error) => {
                  if(errorMessage) console.log(error);
                });
              }
              this.setState({eventCreated: true});

              // to event button
              this.refs.toEventButton.onclick = () => {
                history.push('/event/'+eventId);
              }

            }).catch((error: Error) => {if(errorMessage) console.log(error)});
          }).catch((error: Error) => {if(errorMessage) console.log(error)});
        }
      }
    }
  }
}

export { EventCreation };

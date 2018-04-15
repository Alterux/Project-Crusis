// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { connection } from '../services/connect';
import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

class UserDetails extends React.Component<{ match: { params: { id: number } } }> {
  refs: {
    contactUserButton: HTMLInputElement,
    acceptUserButton: HTMLInputElement,
    rejectUserButton: HTMLInputElement,
    editUserButton: HTMLInputElement,
    editCompetenceButton: HTMLInputElement,
    saveCompetenceButton: HTMLInputElement,
    addCompetenceButton: HTMLInputElement,
    removeCompetenceButton: HTMLInputElement,
    inputFirstName: HTMLInputElement,

    competence0: HTMLInputElement,
    competence1: HTMLInputElement,
    competence2: HTMLInputElement,
    competence3: HTMLInputElement,
    competence4: HTMLInputElement,
    competence5: HTMLInputElement,
    competence6: HTMLInputElement,
    competence7: HTMLInputElement,
    competence8: HTMLInputElement,
    competence9: HTMLInputElement,
    competence10: HTMLInputElement,
    competence11: HTMLInputElement,
    competence12: HTMLInputElement,
    competence13: HTMLInputElement,
    competence14: HTMLInputElement,
    competence15: HTMLInputElement,
    competence16: HTMLInputElement,
    competence17: HTMLInputElement,
  }

  signedInUser = {};
  user = {};
  age: number;
  editCompetence: boolean;

  render() {
    let signedInUser = this.signedInUser;
    let user = this.user;
    let age = this.age;

    // prints competence separated by comma
    let listSkills = [];
    let skills;
    if (user.competence) {
      skills = user.competence.split(',');
    }

    let editCompetence = this.editCompetence;

    let userTypeMsg;
    let userButton;
    let editCompetenceButton;
    let saveCompetenceButton;
    let addCompetenceButton;
    let removeCompetenceButton;

    // Switch for userType.
    switch (user.userType) {
      case 0:
        userTypeMsg = lang.userType + ": " + lang.new
        break;
      case 1:
        userTypeMsg = lang.userType + ": " + lang.user
        break;
      case 2:
        userTypeMsg = lang.userType + ": " + lang.leader
        break;
      case 3:
        userTypeMsg = lang.userType + ": " + lang.admin
        break;
      default:
        userTypeMsg = ""
    }

    // signed in user is looking at own profile
    if (signedInUser.id === user.id) {
      userButton = <div className="editUserButton"><button ref="editUserButton">{lang.edit}</button></div>
      // user is admin
      if (signedInUser.userType === 3) {
        editCompetenceButton = <div className="editCompetenceButton"><button ref="editCompetenceButton">{lang.edit}</button></div>
        saveCompetenceButton = <div className="saveCompetenceButton"><button ref="saveCompetenceButton">{lang.save}</button></div>
      }

    // signed in user is of type admin
    } else if (signedInUser.userType === 3) {
      // user profile is new
      if (user.userType === 0) {
        userButton = <div className="editUserButton"><button ref="acceptUserButton">{lang.accept}</button>
                     <button ref="rejectUserButton">{lang.reject}</button></div>
      // user profile is not new
      } else {
        userButton = <div className="editUserButton"><button ref="editUserButton">{lang.edit}</button>
                     <button ref="contactUserButton">{lang.contact}</button></div>
        editCompetenceButton = <div className="editCompetenceButton"><button ref="editCompetenceButton">{lang.edit}</button></div>
        saveCompetenceButton = <div className="saveCompetenceButton"><button ref="saveCompetenceButton">{lang.save}</button></div>
      }
    // user is not looking at own profile and is not of type admin
    } else {
      userButton = <div className="editUserButton"><button ref="contactUserButton">{lang.contact}</button></div>
    }

    let userDetailsShow = () => {
      return (
        <div className="textBox">
          {userButton}
          <img className="accountImg" src="resources/default.png" alt="Account Image" width="50px" height="50px"></img><br />
          <br />{user.firstName} {user.middleName} {user.lastName}<br />
          <br />{lang.age}: {age}<br />
          <br />{lang.city}: {user.city}<br />
          <br />{userTypeMsg}
        </div>
      );
    }

    let competenceShow = () => {
      if (user.competence) {
        for (let skill of skills) {
          let skillName = lang['competence' + skill];
          listSkills.push(<li key={skill}>{skillName}</li>);
        }
      }

      return (
        <div className="textBox">
          {editCompetenceButton}
          <div className='last entry'>
            <ul className='competence'>
              {listSkills}
            </ul>
          </div>
        </div>
      );
    }

    let checkCompetence = () => {
      return (
        <form>
          <div className='first title'><h3>Førerkort</h3></div>
          <div><input type='checkbox' ref='competence0' />Ingen kompetanse registrert</div>
          <div><input type='checkbox' ref='competence1' />Førerkort 160 utrykningskjøring</div>
          <div><input type='checkbox' ref='competence2' />Førerkort BE tilhenger</div>
          <div><input type='checkbox' ref='competence3' />Førerkort S snøscooter</div>
          <div><input type='checkbox' ref='competence4' />Båtførerprøven</div>
          <div><input type='checkbox' ref='competence5' />Kvalifisert ATV kurs</div>
          <div><input type='checkbox' ref='competence6' />Kvalifisert snøscooterkurs</div>

          <div className='title'><h3>Førstehjelp</h3></div>
          <div><input type='checkbox' ref='competence7' />Videregående førstehjelpskurs</div>
          <div><input type='checkbox' ref='competence8' />Hjelpekorpsprøve (gyldighet 3 år)</div>
          <div><input type='checkbox' ref='competence9' />Ambulansesertifisering (gyldig 1 år)</div>

          <div className='title'><h3>Sjøredning</h3></div>
          <div><input type='checkbox' ref='competence10' />Maritimt VHF-sertifikat</div>
          <div><input type='checkbox' ref='competence11' />Kvalifisert sjøredningskurs</div>
          <div><input type='checkbox' ref='competence12' />Videregående sjøredningskurs</div>

          <div className='title'><h3>Søk og redning</h3></div>
          <div><input type='checkbox' ref='competence13' />Kvalifisert kurs søk og redning</div>
          <div><input type='checkbox' ref='competence14' />Kvalifisert kurs søk og redning sommer</div>
          <div><input type='checkbox' ref='competence15' />Kvalifisert kurs søk og redning vinter</div>

          <div className='title'><h3>Ledelse</h3></div>
          <div><input type='checkbox' ref='competence16' />Vaktlederkurs</div>
          <div><input type='checkbox' ref='competence17' />Distriktsensorkurs (gyldighet 3 år)</div>
        </form>
      );
    }

    let competenceEdit = () => {

      return (
        <div className="textBox">
          {saveCompetenceButton}
          <div className='last entry'>
            {checkCompetence()}
          </div>
        </div>
      );
    }

      return (
        <div className="textBoxWrapper">
          <div className="userDetailsBox">
            <div className="textBoxHead">
              <h3 className="textBoxTitle">{lang.userInfo}</h3>
            </div>
            {userDetailsShow()}
          </div>
          <div className="competenceBox">
            <div className="textBoxHead">
              <h3 className="textBoxTitle">{lang.competence}</h3>
            </div>
            {editCompetence ? competenceEdit() : competenceShow()}
          </div>
        </div>
      );
  }

  componentDidMount() {
    // User
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      this.signedInUser = signedInUser;

      userService.getUser(this.props.match.params.id).then((user) => {
        this.user = user[0];

        // calculate user age
        let today = new Date();
        let birthDate = new Date(user[0].birthDate);
        let age = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 365.25)); // calcualted age
        this.age = age;
        this.forceUpdate();

        // Accept and reject buttons
        if (this.refs.acceptUserButton && this.refs.rejectUserButton) {

          // Accept button
          this.refs.acceptUserButton.onclick = () => {
            userService.editUserType(1, user[0].id);
            history.push('/members');
          }

          // Reject button
          this.refs.rejectUserButton.onclick = () => {
            let result = confirm(lang.confirmUserDelete);
            if (result) {
              userService.deleteUser(user[0].id)
              history.push('/members');
            }
          }
        }

        // Edit user button
        if (this.refs.editUserButton) {
          this.refs.editUserButton.onclick = () => {
            history.push('/user/' + user[0].id + '/edit/');
          }
        }

        // Edit competence button
        let editCompetenceButton = () => {
          this.refs.editCompetenceButton.onclick = () => {

            this.editCompetence = true;
            this.forceUpdate();
            saveCompetenceButton();

            let skills = [];
            if (this.user.competence) {
            skills = this.user.competence.split(',');
            }

            for (let skill of skills) {
              this.refs['competence' + skill].checked = true;
            }
          }
        }

        // Save competence button
        let saveCompetenceButton = () => {
          this.refs.saveCompetenceButton.onclick = () => {

            let competence = '';
            for (let i = 0; i < 18; i++) {
              if (this.refs['competence' + i].checked) {
                competence += i + ',';
              }
            }
            // remove last comma
            competence = competence.slice(0, -1);
            userService.editCompetence(competence, user[0].id);
            this.user.competence = competence;

            this.editCompetence = false;
            this.forceUpdate();
            editCompetenceButton();
          }
        }

        // Edit competence button has loaded
        if (this.refs.editCompetenceButton) {
          editCompetenceButton();
        }

        // Contact button
        if (this.refs.contactUserButton) {
          this.refs.contactUserButton.onclick = () => {
            console.log("Contact Button Pressed");
          }
        }
      }).catch((error: Error) => {
        if(errorMessage) console.log(error);
      });
    }
  }

  // Called when the this.props-object change while the component is mounted
  // For instance, when navigating from path /user/1 to /user/2
  componentWillReceiveProps() {
    setTimeout(() => { this.componentDidMount(); }, 0); // Enqueue this.componentDidMount() after props has changed
  }
}

export { UserDetails };

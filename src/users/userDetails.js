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

type Props = {
  match: {
    params: {
      id: number
    }
  }
};

type State = {
  loaded: boolean,
};

class UserDetails extends React.Component<Props, State> {
  state = {
    loaded: false
  };

  refs: {
    contactUserButton: HTMLInputElement,
    acceptUserButton: HTMLInputElement,
    rejectUserButton: HTMLInputElement,
    editUserButton: HTMLInputElement,
    editLoginButton: HTMLInputElement,
    editCompetenceButton: HTMLInputElement,
    saveCompetenceButton: HTMLInputElement,
    addCompetenceButton: HTMLInputElement,
    removeCompetenceButton: HTMLInputElement,
    inputFirstName: HTMLInputElement,

    noCompetence: HTMLInputElement,
    DL160: HTMLInputElement,
    DLBE: HTMLInputElement,
    DLS: HTMLInputElement,
    DLB: HTMLInputElement,
    DLAC: HTMLInputElement,
    DLSC: HTMLInputElement,
    FAAD: HTMLInputElement,
    FARES: HTMLInputElement,
    FAAM: HTMLInputElement,
    MAVHF: HTMLInputElement,
    MARES: HTMLInputElement,
    MARESAD: HTMLInputElement,
    SAR: HTMLInputElement,
    SARS: HTMLInputElement,
    SARW: HTMLInputElement,
    LEAD: HTMLInputElement,
    DIST: HTMLInputElement,
  }

  signedInUser = {};
  user = {};
  competences = [];
  userCompetence = [];
  age: number;
  editCompetence: boolean;

  render() {
    let signedInUser = this.signedInUser;
    let user = this.user;
    let age = this.age;

    // prints competence separated by comma
    let listSkills = [];

    let editCompetence = this.editCompetence;

    let userTypeName;
    // Switch for selected user userType.
    switch (user.userType) {
      case 0:
        userTypeName = lang.new;
        break;
      case 1:
        userTypeName = lang.user;
        break;
      case 2:
        userTypeName = lang.leader;
        break;
      case 3:
        userTypeName = lang.admin;
        break;
      default:
        userTypeName = ""
    }

    // user details
    let userAddress;
    let userPoints;
    // user buttons
    let editUserButton;
    let editLoginButton;
    let acceptUserButton;
    let rejectUserButton;
    // competence buttons
    let editCompetenceButton;
    let saveCompetenceButton;

    // load sensitive components after sql-queries
    if (this.state.loaded) {
      // user details
      userAddress = <div className='entry'><span className='bold'>{lang.address}: </span>{user.address}, {user.postcode} {user.city}</div>;
      userPoints = <div className='entry'><span className='bold'>{lang.points}: </span>{user.points}</div>;
      // user buttons
      editUserButton = <div className="editUserButton"><button ref="editUserButton">{lang.edit}</button></div>;
      editLoginButton = <div className="editLoginButton"><button ref="editLoginButton">{lang.editLogin}</button></div>;
      acceptUserButton = <div className="acceptUserButton"><button ref="acceptUserButton" className="acceptUserButton">{lang.accept}</button></div>;
      rejectUserButton = <div className="rejectUserButton"><button ref="rejectUserButton" className="rejectUserButton">{lang.reject}</button></div>
      // competence buttons
      editCompetenceButton = <div className="editCompetenceButton"><button ref="editCompetenceButton">{lang.edit}</button></div>;
      saveCompetenceButton = <div className="saveCompetenceButton"><button ref="saveCompetenceButton">{lang.save}</button></div>;
    }

    let isAdmin = (): boolean => {
      if (signedInUser.userType === 3) {
        return true;
      } return false;
    }

    let isLeader = (): boolean => {
      if (signedInUser.userType === 2) {
        return true;
      } return false;
    }

    let isSelf = (): boolean => {
      if (signedInUser.id === user.id) {
        return true;
      } return false;
    }

    let isNewUser = (): boolean => {
      if (user.userType === 0) {
        return true;
      } return false;
    }

    let userDetailsShow = () => {
      return (
        <div className="textBox">
          {!isNewUser() && isAdmin() || isSelf() ? editUserButton : null}
          {!isNewUser() && isAdmin() || isSelf() ? editLoginButton : null}
          {isNewUser() && isAdmin() ? acceptUserButton : null}
          {isNewUser() && isAdmin() ? rejectUserButton : null}
          <div className='entry'><img className="accountImg" src="resources/default.png" alt="Account Image" width="50px" height="50px"></img></div>
          <div className='bold entry'>{user.firstName} {user.middleName} {user.lastName}</div>
          <div className='entry'><span className='bold'>{lang.age}: </span>{age}</div>
          <div className='entry'><span className='bold'>{lang.phone}: </span>{user.phone}</div>
          <div className='entry'><span className='bold'>{lang.email}: </span>{user.email}</div>
          {isAdmin() || isLeader() || isSelf() ? userAddress : null}
          {isAdmin() || isLeader() || isSelf() ? userPoints : null}
          <div className='last entry'><span className='bold'>{lang.userType}: </span>{userTypeName}</div>
        </div>
      );
    }

    let competenceShow = () => {
      if (this.userCompetence.length > 0) {
        for (let competence of this.userCompetence) {
          let cname = competence.name;
          listSkills.push(<li key={cname}>{lang[cname]}</li>);
        }
      } else {
        listSkills.push(<li key='noCompetence'>{lang.noCompetence}</li>);
      }

      return (
        <div className="textBox">
          {isAdmin() || isLeader() ? editCompetenceButton : null}
          <div className='last entry'>
            <ul className='competence'>
              {listSkills}
            </ul>
          </div>
        </div>
      );
    }

    let checkCompetence = () => {
      let listCompetences = [];
      let userCompetence = [];
      for (let competence of this.competences) {
        let cname = competence.name;
        listCompetences.push(<div key={cname}><input type='checkbox' ref={cname} />{lang[cname]}</div>);
      }

      return (
        <form>
          {listCompetences}
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
      <div className='contentWrapper'>
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

        userService.getCompetences().then((competences) => {
          this.competences = competences;
        });

        let getUserCompetence = () => {
          userService.getUserCompetence(this.user.id).then((competence) => {
            this.userCompetence = competence;
            this.forceUpdate();
          });
        }
        getUserCompetence();

        this.setState({loaded: true});

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

        // Edit login button
        if (this.refs.editLoginButton) {
          this.refs.editLoginButton.onclick = () => {
            history.push('/user/' + user[0].id + '/editLogin/');
          }
        }

        // Edit competence button
        let editCompetenceButton = () => {
          this.refs.editCompetenceButton.onclick = () => {

            this.editCompetence = true;
            this.forceUpdate();
            saveCompetenceButton();

            for (let competence of this.userCompetence) {
              this.refs[competence.name].checked = true;
            }
          }
        }

        // Save competence button
        let saveCompetenceButton = () => {
          this.refs.saveCompetenceButton.onclick = () => {

            // get user competence
            let userCompetence = [];
            for (let competence of this.userCompetence) {
              userCompetence.push(competence.id);
            }

            // get all competences
            for (let competence of this.competences) {
              // add new checked competences
              if (this.refs[competence.name].checked) {
                if (!userCompetence.includes(competence.id)) {
                  userService.addUserCompetence(this.user.id, competence.id);
                  console.log('Added '+competence.name);
                }
                // remove new unchecked competences
              } else {
                if (userCompetence.includes(competence.id)) {
                  userService.removeUserCompetence(this.user.id, competence.id);
                  console.log('Removed '+competence.name);
                }
              }
            }
            getUserCompetence();
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

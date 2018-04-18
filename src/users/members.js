// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { connection } from '../services/connect';
import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

type Props = {};
type State = {};

class Members extends React.Component<Props, State> {
  refs: {
    search: HTMLInputElement
  };

  signedInUser = {};
  members = [];
  newMembers = [];

  render() {
    let signedInUser = this.signedInUser;
    let listMembers = [];
    let listNewMembers = [];
    for(let member of this.members) {
      listMembers.push(<li key={member.id}><Link to={'/user/' + member.id}>{member.firstName} {member.middleName} {member.lastName}</Link></li>);
    }
    for(let member of this.newMembers) {
      listNewMembers.push(<li key={member.id}><Link to={'/user/' + member.id}>{member.firstName} {member.middleName} {member.lastName}</Link></li>);
    };

    switch (signedInUser.userType) {

      case 3:
        return (
          <div>
            <div className='entry'>
              <input ref='search' placeholder={lang.search}></input>
            </div>
            <div className='last entry'>
              {lang.members}
              <ul>
                {listMembers}
              </ul>
              {lang.newMembers}
              <ul>
                {listNewMembers}
              </ul>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <div className='entry'>
              <input ref='search' placeholder='Search'></input>
            </div>
            <div className='last entry'>
              {lang.members}
              <ul>
                {listMembers}
              </ul>
            </div>
          </div>
        );
    }
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      this.signedInUser = signedInUser;

      let search;
      this.refs.search.oninput = () => {
        search = this.refs.search.value;
        if (search) {
          searchMembers();
        } else {
          getMembers();
          getNewMembers();
        }
      }

      let searchMembers = () => {
        userService.searchMembers(search).then((members) => {
          this.members = members;
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) console.log(error); //errorMessage.set(lang.errorMembers);
        });
      }

      // Get members
      let getMembers = () => {
        userService.getMembers(signedInUser.id).then((members) => {
          this.members = members;
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) errorMessage.set(lang.errorMembers);
        });
      }

      // Get new members
      let getNewMembers = () => {
        userService.getNewMembers(signedInUser.id).then((newMembers) => {
          this.newMembers = newMembers;
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) errorMessage.set(lang.errorMembers);
        });
      }
      getMembers();
      getNewMembers();
    }
  }
}

export { Members };

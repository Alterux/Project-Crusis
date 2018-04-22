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
    search: HTMLInputElement,
    searchNew: HTMLInputElement,
    searchDeactivated: HTMLInputElement,
  };

  signedInUser = {};
  members = [];
  newMembers = [];
  deactivatedMembers = [];

  render() {
    let signedInUser = this.signedInUser;
    let listMembers = [];
    let listNewMembers = [];
    let listDeactivatedMembers = [];

    // list active members
    for(let member of this.members) {
      listMembers.push(<li key={member.id}><Link to={'/user/' + member.id}>{member.firstName} {member.middleName} {member.lastName}</Link></li>);
    }

    // list new members
    for(let member of this.newMembers) {
      listNewMembers.push(<li key={member.id}><Link to={'/user/' + member.id}>{member.firstName} {member.middleName} {member.lastName}</Link></li>);
    };

    // list deactivated members
    for(let member of this.deactivatedMembers) {
      listDeactivatedMembers.push(<li key={member.id}><Link to={'/user/' + member.id}>{member.firstName} {member.middleName} {member.lastName}</Link></li>);
    };

    let isAdmin = (): boolean => {
      if (signedInUser.userType === 3) {
        // return true if user is admin, else false
        return true;
      } return false;
    }

    let activeMembers = () => {
      return (
        <div>
          <h2>{lang.members}</h2>
          <div className='entry'>
            <input className='search memberSearch' ref='search' placeholder={lang.search}></input>
          </div>
          <div className='entry activeMembers'>
            {listMembers}
          </div>
        </div>
      );
    }

    let newMembers = () => {
      return (
        <div>
          <h2>{lang.newMembers}</h2>
          <div className='entry'>
            <input className='search memberSearch' ref='searchNew' placeholder={lang.search}></input>
          </div>
          <div className='entry newMembers'>
            {listNewMembers}
          </div>
        </div>
      );
    }

    let deactivatedMembers = () => {
      return (
        <div>
          <h2>{lang.deactivatedMembers}</h2>
          <div className='entry'>
            <input className='search memberSearch' ref='searchDeactivated' placeholder={lang.search}></input>
          </div>
          <div className='entry deactivatedMembers'>
            {listDeactivatedMembers}
          </div>
        </div>
      );
    }

    return (
      <div className='contentWrapper'>
        <div className='textBoxWrapper memberWrapper'>
          {activeMembers()}
          {isAdmin() ? newMembers() : null}
          {isAdmin() ? deactivatedMembers() : null}
        </div>
      </div>
    );
  }

  componentWillMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      this.signedInUser = signedInUser;
    }
  }

  componentDidMount() {
    if(this.signedInUser) {
      let signedInUser = this.signedInUser;

      // search for normal users
      let search;
      if (this.refs.search) {
        this.refs.search.oninput = () => {
          search = this.refs.search.value;
          if (search) {
            searchMembers();
          } else {
            getMembers();
          }
        }
      }

      // search for new users
      let searchNew;
      if (this.refs.searchNew) {
        this.refs.searchNew.oninput = () => {
          searchNew = this.refs.searchNew.value;
          if (searchNew) {
            searchNewMembers();
          } else {
            getNewMembers();
          }
        }
      }

      // search for deactivated users
      let searchDeactivated;
      if (this.refs.searchDeactivated) {
        this.refs.searchDeactivated.oninput = () => {
          searchDeactivated = this.refs.searchDeactivated.value;
          if (searchDeactivated) {
            searchDeactivatedMembers();
          } else {
            getDeactivatedMembers();
          }
        }
      }

      // serach through members
      let searchMembers = () => {
        userService.searchMembers(search).then((members) => {
          this.members = members;
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }

      // serach through new members
      let searchNewMembers = () => {
        userService.searchNewMembers(searchNew).then((newMembers) => {
          this.newMembers = newMembers;
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }

      // serach through deactivated members
      let searchDeactivatedMembers = () => {
        userService.searchDeactivatedMembers(searchDeactivated).then((deactivatedMembers) => {
          this.deactivatedMembers = deactivatedMembers;
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
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

      // Get new members
      let getDeactivatedMembers = () => {
        userService.getDeactivatedMembers(signedInUser.id).then((deactivatedMembers) => {
          this.deactivatedMembers = deactivatedMembers;
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) errorMessage.set(lang.errorMembers);
        });

      }
      getMembers();
      getNewMembers();
      getDeactivatedMembers();
    }
  }
}

export { Members };

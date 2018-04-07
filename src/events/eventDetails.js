// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';

import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

class EventDetails extends React.Component<{ match: { params: { id: number } } }> {

  event = {};
  participants = [];

  render() {
    let event = this.event;
    let listParticipants = [];

    for (let participant of this.participants) {
      listParticipants.push(<li key={participant.id}><Link to={'/user/' + participant.id}>{participant.firstName} {participant.middleName} {participant.lastName}</Link></li>)
    }
    return (
      <div className='textBoxWrapper'>
        <div className='userDetailsBox'>
          <div className='textBox'>
            <div className='entry'>
              <h3>{lang.name}</h3>
              {event.name}
            </div>
            <div className='entry'>
              <h3>{lang.location}</h3>
              {event.location}
            </div>
            <div className='last entry'>
              <h3>{lang.city}</h3>
              {event.city}
            </div>
            <div>
              {/* {event.startDate} */}
            </div>
            <div>
              {/* {event.endDate} */}
            </div>
          </div>
        </div>
        <div className='competenceBox'>
          <div className='textBox'>
            <h3>{lang.participants}</h3>
            {listParticipants}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      eventService.getEvent(this.props.match.params.id).then((event) => {
        this.event = event[0];
        this.forceUpdate();

      }).catch((error: Error) => {
        if(errorMessage) console.log(error);
      });

      eventService.getParticipants(this.props.match.params.id).then((participants) => {
        this.participants = participants;
        this.forceUpdate();

      }).catch((error: Error) => {
        if(errorMessage) console.log(error);
      });
    }
  }
}

export { EventDetails };

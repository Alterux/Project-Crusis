// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { connection } from './services/connect';
import { User, userService } from './services/userService';
import { Event, eventService } from './services/eventService';

import { lang, en, no } from './util/lang';
import { jsCalendar } from './util/jsCalendar';
import { ErrorMessage, errorMessage } from './util/errorMessage';

class Home extends React.Component<{}> {
  events = [];

  render() {
    let signedInUser = userService.getSignedInUser();

    let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}>
        <Link to={'/user/' + event.fromUserId}>{event.fromUser}</Link> &rarr; <Link to={'/user/' + event.toUserId}>{event.toUser}</Link>
        : {event.text}</li>);
    }

    return (
      <div>
        <div id='welcomeMsg'>{lang.loggedInMsg}
            <div className="auto-jsCalendar material-theme red"
                data-month-format="month YYYY"
                data-fdotw="2">
            </div>
            </div>
            <ul>
              {listItems}
            </ul>
          <div>
            <button ref='popupboxbutton'>Test</button>
            <div id='popup' ref='popup' className='popupstyle'>
                <div className='popupcontent'>
                  <div className='popupheader'>
                    <span className='close'>&times;</span>
                    <h2>Her skal navnet til arrangementet stå</h2>
                  </div>
                  <div className='popupbody'>
                    <p>Trillebårkurs - Lerkendal stadio - Kl. 14:00</p>
                </div>
              </div>
          </div>
          <div className="news">{lang.newsheading}</div>
        </div>
    </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    let span = document.getElementsByClassName('close')[0];
    let target= ".auto-jsCalendar material-theme red";

    if(signedInUser) {
      jsCalendar.autoFind();

    } else {
      history.push('/signin');
    }

    if (this.refs.popupboxbutton) {
      this.refs.popupboxbutton.onclick = () => {
        this.refs.popup.style.display = 'block';
      }
    }
    span.onclick = () => {
        this.refs.popup.style.display = 'none';
    }

    window.onclick = (event) => {
      if (event.target == this.refs.popup) {
        this.refs.popup.style.display = 'none';
      }
    }
    console.log(target);
  }
}

export { Home };

import 'fullcalendar';
import $ from 'jquery';

// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { connection } from './services/connect';
import { User, userService } from './services/userService';
import { Event, eventService } from './services/eventService';

import { lang, en, no } from './util/lang';
import { ErrorMessage, errorMessage } from './util/errorMessage';
//import { en-gb } from 'fullcalendar/lang-all.js'

class Home extends React.Component<{}> {
  events = [];

  render() {
    $(function() {

      $('#calendar').fullCalendar({

        //Customization of the calendar
          weekNumberCalculation: "ISO",
          monthNames: [lang.jan, lang.feb, lang.mar, lang.apr, lang.may, lang.jun, lang.jul, lang.aug, lang.sep, lang.oct, lang.nov, lang.dec],
          monthNamesShort: [lang.jan.slice(0, 3), lang.feb.slice(0, 3), lang.mar.slice(0, 3), lang.apr.slice(0, 3), lang.may.slice(0, 3), lang.jun.slice(0, 3), lang.jul.slice(0, 3), lang.aug.slice(0, 3), lang.sep.slice(0, 3), lang.oct.slice(0, 3), lang.nov.slice(0, 3), lang.dec.slice(0, 3)],
          dayNames: [lang.mon, lang.tue, lang.wed, lang.thu, lang.fri, lang.sat, lang.sun],
          dayNamesShort: [lang.sun.slice(0, 3), lang.mon.slice(0, 3), lang.tue.slice(0, 3), lang.wed.slice(0, 3), lang.thu.slice(0, 3), lang.fri.slice(0, 3), lang.sat.slice(0, 3)],
          buttonText: {today:lang.tod},
          aspectRatio: 1.5,

          // Click-function
        dayClick: function(date, jsEvent, view) {
          alert('Clicked on: ' + date.format());
        }

      })


    });

    let signedInUser = userService.getSignedInUser();

    let listItems = [];
    for(let event of this.events) {
      listItems.push(<li key={event.id}>
        <Link to={'/user/' + event.fromUserId}>{event.fromUser}</Link> &rarr; <Link to={'/user/' + event.toUserId}>{event.toUser}</Link>
        : {event.text}</li>);
    }

    return (
      <div>
        <div className='home-headlines'>{lang.welcomeMsg}<br></br><br></br>{lang.loggedInMsg}
        </div>
        <div id='calendarwindow'>
          <div id="calendar"></div>
        </div>
        <div className="news">
          <div className="newsheading">{lang.newsheading}<br></br>
          </div>
          <div className="newsText">{lang.newsText}
          </div>
            <img src="http://www.stiftelsen-uni.no/r/img/P2191.jpg" id="news-image"></img>
        </div>
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
      </div>
    </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    let span = document.getElementsByClassName('close')[0];
    // let target= ".auto-jsCalendar material-theme red";

    if(signedInUser) {
      // jsCalendar.autoFind();

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
    // console.log(target);
  }
}

export { Home };

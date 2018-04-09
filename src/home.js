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
            popup.style.display = "block";
            let theDate = date.format();
            console.log(theDate);
          }


      })


    });

    let signedInUser = userService.getSignedInUser();

    let listEvents = [];
    for(let event of this.events) {
      listEvents.push
      (<li key={event.id}>
        {event.name} - {event.location} - {event.city}<div><Link to={'/event/' + event.id}>{lang.upcomingEventReadmore}</Link></div></li>);
    }
    return (
      <div>
        <div className='home-headlines'>
          {lang.welcomeMsg}<br />
          <br />{lang.loggedInMsg}
        </div>
        <div id='calendarwindow'>
          <div id="calendar"></div>
        </div>
        <div className='rightContainer'>
          <div className="news">
            <div className="newsheading">
              {lang.newsheading}<br />
            </div>
            <div className="newsText">
              {lang.newsText}
            </div>
            <img src="http://www.stiftelsen-uni.no/r/img/P2191.jpg" id="news-image"></img>
          </div>
          <div className="upcomingEvents">
            <div className="upcomingEvents-headline">
              {lang.upcomingEventsHeadline}
            </div>
            <div className="upcomingEvents-events">
              <ul>
                {listEvents}
              </ul>
            </div>
          </div>
          <div>
        </div>
          <div className="popupbuttonposition">
              { /* <button ref='popupboxbutton'>Popup-Test</button> */}
          </div>
          <div id='popup' ref='popup' className='popupstyle'>
              <div className='popupcontent'>
                <div className='popupheader'>
                  <span className='close'>&times;</span>
                  <div>Her skal navnet til arrangementet stå</div>
                </div>
                <div className='popupbody'>
                  <div>{lang.popupContentText}</div>
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
      eventService.getEvents().then((response) => {
          for (let item of response) {
            this.events.push(item);
          }
          this.forceUpdate();
        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });

    } else {
      history.push('/signin');
    }

//POPUPBOX FROM CALENDAR
    if (this.refs.popupboxbutton ) {
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

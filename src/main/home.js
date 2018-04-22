// @flow
import 'fullcalendar';
import $ from 'jquery';

import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { connection } from '../services/connect';
import { User, userService } from '../services/userService';
import { Event, eventService } from '../services/eventService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

type Props = {};

type State = {
  loaded: boolean,
};

class Home extends React.Component<Props, State> {
  state = {
    loaded: false,
  };

  events = [];
  listEvents = [];
  popupHeaderText: string;
  popupBodyText: string;
  popupBodyContent: HTMLDivElement;

  render() {
    let events = this.events;
    let listEvents = this.listEvents;

    if (this.state.loaded) {
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
          events: events,

          // Click-function
          eventClick: function(event, coords) {
            // popup title // $FlowFixMe
            popupHeaderContent.innerHTML = event.title;

            // popup content // $FlowFixMe
            popupBodyContent.innerHTML = event.details;
            popupBodyContent.innerHTML += "<br /><br /><a href='"+'#/event/'+ event.id + "'}>" + lang.upcomingEventReadmore + "</a>";

            // popup style // $FlowFixMe
            popup.style.left = coords.clientX - 20 + 'px';
            popup.style.top = coords.clientY - 20 + 'px';
            popup.style.display = "block";
            return false;
          }
        });
      });
    }

    let signedInUser = userService.getSignedInUser();

    return (
      <div className='full home contentWrapper'>
        <div className='textBoxWrapper'>
          <div className='home-headlines'>
            <h3>{lang.loggedInMsg}</h3>
          </div>
          <div id='calendarwindow'>
            {this.state.loaded ? <div id="calendar"></div> : null}
            <div className='popupstyle' id='popup' ref='popup'>
              <div className='popupcontent'>
                <div className='popupheader'>
                  <span className='close'>&times;</span>
                  <div id='popupHeaderContent'></div>
                </div>
                <div className='popupbody'>
                  <div id='popupBodyContent'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='rightContainer'>
            <div className="news">
              <div className="newsheading">
                <h3>{lang.newsheading}</h3>
              </div>
              <div className="newsText">
                {lang.newsText}
              </div>
              <img src="http://www.stiftelsen-uni.no/r/img/P2191.jpg" id="news-image"></img>
            </div>
            <div className="upcomingEvents">
              <div className="upcomingEvents-headline entry">
                <h3>{lang.upcomingEventsHeadline}</h3>
              </div>
              <div className="upcomingEvents-events">
                <ul>
                  {listEvents}
                </ul>
              </div>
            </div>
            <div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser();
    let span = document.getElementsByClassName('close')[0];

    if(signedInUser) {

      eventService.getEvents().then((events) => {
        for (let event of events) {
          this.listEvents.push(
            <li key={event.id}>
              {event.name} - {event.address} - {event.city}
              <div className='entry'>
                <Link to={'/event/' + event.id}>
                  {lang.upcomingEventReadmore}
                </Link>
              </div>
            </li>
          );
        }

      }).catch((error: Error) => {
        if(errorMessage) console.log(error);
      });

      // get events user participates in and add to calendar
      eventService.getUserInterests(signedInUser.id).then((events) => {

        for (let event of events) {
          let id = event.id;
          let title = event.name;
          let details = event.details;

          // dates
          let startDate = event.startDate;
          let endDate = event.endDate;

          let startYear = startDate.getFullYear();
          let startMonth = startDate.getMonth() + 1;
          if (startMonth < 10) startMonth = '0' + startMonth;
          let startDay = startDate.getDate();
          if (startDay < 10) startDay = '0' + startDay;
          let start = startYear + '-' + startMonth + '-' + startDay;

          let endYear = endDate.getFullYear();
          let endMonth = endDate.getMonth() + 1;
          if (endMonth < 10) endMonth = '0' + endMonth;
          let endDay = endDate.getDate() + 1;
          if (endDay < 10) endDay = '0' + endDay;
          let end = endYear + '-' + endMonth + '-' + endDay;

          this.events.push({id: id, title: title, start: start, end: end, details: details});
        }

        this.forceUpdate();
        this.setState({loaded: true});

        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });

    } else {
      history.push('/signin');
    }

    //POPUPBOX FROM CALENDAR
    if (this.refs.popupboxbutton) {
      this.refs.popupboxbutton.onclick = () => {
        this.refs.popup.style.display = 'block';
      }
    }

    span.onclick = () => {
        this.refs.popup.style.display = 'none';
    }

    // window.onclick = (event) => {
    //   if (this.refs.popup.style.display === 'block') {
    //     // this.refs.popup.style.display = 'none';
    //   }
    // }
  }
}

export { Home };

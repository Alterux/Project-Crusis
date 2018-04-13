// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import {mailService} from '../services/mailService';
const history = createHashHistory();

import { lang, en, no } from '../util/lang';

class ForgotPass extends React.Component<{}> {

  refs: {
    inputForgotPassEmail: HTMLInputElement,
    forgotPassButton: HTMLButtonElement,
  }
  errorEmail: boolean = false;

  render() {
    let errorEmail = this.errorEmail;

    return (
      <div>
        <div id="title">
          <img id="logo" src="resources/logo.svg"></img>
          <div className="titleText"><h1>{lang.title}</h1></div>
        </div>
        <div className="inputForm">

          <div className="forgotnPassHeadline"><h3>{lang.forgotPassHeadline}</h3></div><br></br>
            <input className="form" placeholder="123@example.com" ref="inputForgotPassEmail" required></input>
            {errorEmail ? <div className='errorInput'><i />{lang.errorEmail}</div> : null}
          <div className="forgotPassButton">
            <button className="form" id="forgotPassButton" ref="forgotPassButton">{lang.forgotPassButtonText}</button>
          </div>
        </div>
      </div>
    );
  };

  componentDidMount() {

      this.refs.forgotPassButton.onclick = () => {

        //Get value
        let forgotPassEmail = this.refs.inputForgotPassEmail.value;

        //Validate
        validateEmail();

<<<<<<< HEAD
        if (!forgotPassEmail || !forgotPassEmail.match(MAILFORMAT)) {
=======
        if (!forgotPassEmail || this.errorEmail) {
>>>>>>> 7cf29918a433e47c0bd7c94c24235b1a44c18f00
          console.log('Password reset failed');
          this.errorEmail=true
        } else {
          mailService.resetPassword(forgotPassEmail);
        };
      };


    //Email format
    const MAILFORMAT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    //Email validation
    let validateEmail = () => {
      let forgotPassEmail = this.refs.inputForgotPassEmail.value;
      if (!forgotPassEmail || !forgotPassEmail.match(MAILFORMAT)) {
        this.errorEmail = true;
        this.refs.inputForgotPassEmail.setCustomValidity('invalid');
      } else {
        this.errorEmail = false;
        this.refs.inputForgotPassEmail.setCustomValidity('');
      };
      this.forceUpdate();
    };
  };
};

export { ForgotPass };

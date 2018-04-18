// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { mailService } from '../services/mailService';
import { User, userService } from '../services/userService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

type Props = {};

type State = {
  emailSent: boolean,
};

class ForgotPass extends React.Component<Props, State> {
  state = {
    emailSent: false,
  };

  refs: {
    inputForgotPassEmail: HTMLInputElement,
    forgotPassButton: HTMLButtonElement,
  };

  setState: any;
  errorEmail: boolean = false;
  errorEmailExist: boolean = false;

  render() {
    let errorEmail = this.errorEmail;
    let errorEmailExist = this.errorEmailExist;

    let forgotPass = () => {
      if (this.state.emailSent) {
        return (
            <div className="inputForm">
              {lang.resetPassMsg}
            </div>
        );
      } else {
        return (
          <div className="inputForm">

            <div className="forgotPassHeadline"><h3>{lang.forgotPassHeadline}</h3></div><br></br>
              <input className="form" placeholder="123@example.com" ref="inputForgotPassEmail" required></input>
              {errorEmail ? <div className='errorInput'><i />{lang.errorEmail}</div> : null}
              {errorEmailExist ? <div className='errorInput'><i />{lang.errorEmailExist}</div> : null}
            <div className="forgotPassButton">
              <button className="form" id="forgotPassButton" ref="forgotPassButton">{lang.forgotPassButtonText}</button>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        <div id="title">
          <img id="logo" src="resources/logo.svg"></img>
          <div className="titleText"><h1>{lang.title}</h1></div>
        </div>
        {forgotPass()}
      </div>
    );
  };

  componentDidMount() {

    this.refs.forgotPassButton.onclick = () => {
      validateEmail();
    }

    //Email format
    const MAILFORMAT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    //Email validation
    let validateEmail = () => {
      let forgotPassEmail = this.refs.inputForgotPassEmail.value;

      if (!forgotPassEmail || !forgotPassEmail.match(MAILFORMAT)) {
          this.errorEmail = true;
          this.refs.inputForgotPassEmail.setCustomValidity('invalid');
          console.log('Password reset failed');
          this.forceUpdate();
      } else {
        this.errorEmailExist = true;
        this.errorEmail = false;
        userService.checkEmail(forgotPassEmail).then((email) => {
          if (!email[0]) {
            this.errorEmailExist = true;
            this.refs.inputForgotPassEmail.setCustomValidity('invalid');
            console.log('Password reset failed');
            this.forceUpdate();
          } else {
            this.errorEmailExist = false;
            this.refs.inputForgotPassEmail.setCustomValidity('');
            mailService.resetPassword(forgotPassEmail);
            this.forceUpdate();
            this.setState({emailSent: true});
          }

        }).catch((error: Error) => {
          if(errorMessage) console.log(error);
        });
      }
    }
  }
}

export { ForgotPass };

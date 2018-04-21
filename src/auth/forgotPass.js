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
    backButton: HTMLButtonElement,
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
            <div className="big-entry inputForm">
              {lang.resetPassMsg}
            </div>
        );
      } else {
        return (
          <div className="big-entry inputForm">

            <div className="forgotPassHeadline"><h3>{lang.forgotPassHeadline}</h3></div><br></br>
              <input className="form" placeholder={lang.email} ref="inputForgotPassEmail" required></input>
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
      <div className="signInPage">
        <div id="title">
          <img id="logo" src="resources/logo.svg"></img>
          <div className="titleText"><h1>{lang.title}</h1></div>
        </div>
        {forgotPass()}
        <div className='big-entry inputForm'>
          <div className='inputFormButton'>
            <button className='lonely form inputButton backButton' ref='backButton'>{lang.back}</button>
          </div>
        </div>
      </div>
    );
  };

  componentDidMount() {

    // listen for enter on email input
    this.refs.inputForgotPassEmail.onkeydown = (e) => {
      if (e.keyCode === 13) {
        validateEmail();
      }
    }

    // forgot pass button
    this.refs.forgotPassButton.onclick = () => {
      validateEmail();
    }

    // back button
    this.refs.backButton.onclick = () => {
      history.push('/signIn');
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

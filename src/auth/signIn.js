// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { menu } from '../main/menu';

import { User, userService } from '../services/userService';

import { lang, en, no } from '../util/lang';
import { ErrorMessage, errorMessage } from '../util/errorMessage';

type Props = {};

type State = {
  inputsFilled: boolean,
  errorLogin: boolean,
};

class SignIn extends React.Component<Props, State> {
  state = {
    inputsFilled: false,
    errorLogin: false,
  };

  refs: {
    signInUsername: HTMLInputElement,
    signInPassword: HTMLInputElement,
    signInButton: HTMLButtonElement,
    signUpButton: HTMLButtonElement,
    forgotPassButton: HTMLButtonElement,
  };

  hashCode(str: string) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  noError() {
    if (this.state.inputsFilled) {
      return (
        <div className='noError'><h3>{lang.noError}</h3></div>
      );
    } else {
      return (
        <div className='notFilled'><h3>{lang.notFilled}</h3></div>
      );
    }
  }

  errorLogin() {
    return (
      <div className='last errorInput'>{lang.errorLogin}</div>
    );
  }

  render() {
    return (
      <div className="signInPage">
        <div id="title">
          <img id="logo" src="resources/logo.svg"></img>
          <div className="titleText"><h1>{lang.title}</h1></div>
        </div>
        <div className="big-entry inputForm">
          <div className='status'>Status</div>
          {this.state.errorLogin ? this.errorLogin() : this.noError()}
        </div>
        <div className="big-entry inputForm">
          <input className="form formAuth" id="formUser" type='text' ref='signInUsername' placeholder={lang.email} />
          <input className="form formAuth" id="formPass" type='password' ref='signInPassword' placeholder={lang.password} />
          <button className="form" id="signInButton" ref='signInButton'>{lang.signIn}</button>
        </div>
        <div className='inputForm'>
          <div className='entry inputFormButton'>
            <button className='lonely form inputButton backButton' ref='signUpButton'>{lang.signUp}</button>
          </div>
          <div className='inputFormButton'>
            <button className='lonely form inputButton deleteButton' ref='forgotPassButton'>{lang.forgotPass}</button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if(menu) menu.forceUpdate();

    // on input change => set to validate on input
    if (this.refs.signInUsername) {
      window.onchange = () => {
        let userName = this.refs.signInUsername.value;
        let password = this.refs.signInPassword.value;

        if (!userName || !password) {
          this.setState({inputsFilled: false});
        } else {
          this.setState({inputsFilled: true});
        }
      }
    }

    // listen for enter on username input
    this.refs.signInUsername.onkeydown = (e) => {
      if (e.keyCode === 13) {
        submit();
      }
    }

    // listen for enter on password input
    this.refs.signInPassword.onkeydown = (e) => {
      if (e.keyCode === 13) {
        submit();
      }
    }

    this.refs.signInButton.onclick = () => {
      submit();
    }

    this.refs.signUpButton.onclick = () => {
      history.push('/signUp');
    }

    this.refs.forgotPassButton.onclick = () => {
      history.push('/forgotPass');
    }

    let submit = () => {
      let hashedPass = this.hashCode(this.refs.signInPassword.value + this.refs.signInUsername.value);
      userService.signIn(this.refs.signInUsername.value, hashedPass).then(() => {
        history.push('/');
      }).catch((error: Error) => {
        // Converts error to string og removes "Error: " from the beginning.
        // Output is only the errormessage from lang.js.
        if(errorMessage) {
          console.log(error);
          this.setState({errorLogin: true})
        }
      });
    }
  }
}

export { SignIn };

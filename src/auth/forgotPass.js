// @flow
import * as React from 'react';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

import { lang, en, no } from '../util/lang';

class ForgotPass extends React.Component<{}> {

  render() {
    return (
      <div>
        <div id="title">
          <img id="logo" src="resources/logo.svg"></img>
          <div className="titleText"><h1>{lang.title}</h1></div>
        </div>
        <div className="inputForm">
          {lang.forgotPassMsg}
        </div>
      </div>
    );
  };

  componentDidMount() {

  };
};

export { ForgotPass };

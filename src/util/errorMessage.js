// @flow
import * as React from 'react';

type Props = {};
type State = {};

class ErrorMessage extends React.Component<Props, State> {
  refs: {
    closeButton: HTMLButtonElement
  };

  message: string = '';

  render() {
    // Only show when this.message is not empty
    let displayValue: string;
    if(this.message=='') displayValue = 'none';
    else displayValue = 'inline';

    return (
      <div className="errorMessage" style={{display: displayValue}}>
        <b><font color='red'>{this.message} </font></b>
        <button ref='closeButton'>x</button>
      </div>
    );
  }

  componentDidMount() {
    errorMessage = this;
    this.refs.closeButton.onclick = () => {
      this.message = '';
      this.forceUpdate();
    };
  }

  componentWillUnmount() {
    errorMessage = null;
  }

  set(post: string) {
    this.message = post;
    this.forceUpdate();
  }
}
let errorMessage: ?ErrorMessage;

export { ErrorMessage, errorMessage };

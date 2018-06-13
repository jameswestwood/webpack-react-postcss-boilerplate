/* @flow */
import React, { Component } from 'react';

import styles from './button.css';

type Props = {
  label: string,
  onButtonClick?: (any) => any,
  specifier?: string,
  type?: string,
  isInteractable?: boolean
};

type State = {
  active: boolean
}

class Button extends React.Component<Props, State> {

  reactButton:?HTMLButtonElement;

  state = {
    active : false
  }

  constructor(props:Props)
  {
    super(props);
  }

  handleClick = () =>
  {
    if(this.state.active === true
      && this.props.isInteractable === true)
    {
      this.props.onButtonClick();
    }
  }

  componentDidMount()
  {
    this.setState({
      active: true
    });
  }

  componentWillUnmount()
  {
    this.setState({
      active: false
    });
  }

  render(){
    return (
      <button className={"button "
                          + (this.props.specifier !== null ? ' ' + this.props.specifier : '')
                          + (this.props.type !== null ? ' button--' + this.props.type : ' button--default')}
              disabled={!this.props.isInteractable}
              ref={(button) => { this.reactButton = button; }}
              onClick={(this.handleClick !== null ? this.handleClick : null)}>
              {this.props.label}
      </button>
    );
  }
}

Button.defaultProps = {
  specifier: null,
  type: null,
  handleClick: null,
  isInteractable: true
};

export default Button;

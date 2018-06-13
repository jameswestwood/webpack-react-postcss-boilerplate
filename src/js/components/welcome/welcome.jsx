/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import Button from '../button/button.jsx';

import styles from '../../../css/content.css';

class Welcome extends React.Component<Props, State>
{
  render(){
    return (
      <div className="content">
        <h2>Welcome</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <Button label="primary" type="cta" />
        <Button label="secondary" />
      </div>
    );
  }
}

export default Welcome;

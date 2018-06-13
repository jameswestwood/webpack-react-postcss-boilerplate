/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

class About extends React.Component<Props, State>
{
  render(){
    return (
      <div className="content">
        <h2>About</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    );
  }
}

export default About;

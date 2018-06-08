/* @flow */
import * as React from 'react';
import {render} from 'react-dom';

import styles from './ui.css';

class UI extends React.Component<Props, State>
{
  render(){
    return (
      <main className="ui"></main>
    );
  }
}

export default UI;

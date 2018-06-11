/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import styles from './header.css';

class Header extends React.Component<Props, State>
{
  render(){
    return (
      <header className="header">
        <h1 className="header__title">Header</h1>
      </header>
    );
  }
}

export default Header;

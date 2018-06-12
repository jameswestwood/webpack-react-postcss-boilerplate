/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import Nav from '../nav/nav.jsx';

import styles from './header.css';

class Header extends React.Component<Props, State>
{
  render(){
    return (
      <header className={"header" + (this.props.specifier !== undefined ? ' ' + this.props.specifier + '__header' : '')}>
        <h1 className="header__title">Header</h1>
        <Nav paths={this.props.paths}
             specifier={(this.props.specifier !== undefined ? this.props.specifier : '')} />
      </header>
    );
  }
}

export default Header;

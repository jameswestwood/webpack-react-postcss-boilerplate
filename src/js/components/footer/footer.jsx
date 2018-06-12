/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import styles from './footer.css';

class Footer extends React.Component<Props, State>
{
  render(){
    return (
      <footer className={"footer" + (this.props.specifier !== undefined ? ' ' + this.props.specifier : '')}>
        Footer
        <a href="https://github.com/jameswestwood/webpack-react-postcss-boilerplate">github.com</a>
      </footer>
    );
  }
}

export default Footer;

/* @flow */
import * as React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import anime from 'animejs';

import styles from './nav.css';

type Props = {
  paths:{}
}

class Nav extends React.Component<Props>
{
  render(){
    return (
      <nav className="nav">
        {(() => {

          let anchors:Array<React.Component> = [];

          for (let key:number in this.props.paths)
          {
            if (this.props.paths.hasOwnProperty(key))
            {
              anchors.push(<Link className="nav__link" to={this.props.paths[key]} key={("nav-" + key)}>{key}</Link>);
            }
          }

          return anchors;
        })()}
      </nav>
    );
  }
}

export default Nav;

/* @flow */
import * as React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import anime from 'animejs';

import styles from './nav.css';

type Props = {
  paths:{},
  specifier?:string,
  match:withRouter.Match | void,
  location:withRouter.Location | void,
  history:withRouter.History | void
}

class Nav extends React.Component<Props>
{
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render(){
    const { match, location, history } = this.props

    return (
      <nav className={"nav" + (this.props.specifier !== undefined ? ' ' + this.props.specifier + '__nav' : '')}>
        {(() => {

          let anchors:Array<React.Element<any>> = [];

          for (let key:string in this.props.paths)
          {
            if (this.props.paths.hasOwnProperty(key))
            {
              let navEl:React.Element<any>;

              // if the current route
              navEl = <NavLink className={"nav__link" + (location != null && location.pathname === this.props.paths[key].path ? ' nav__link--active' : '')}
                            to={this.props.paths[key].path}
                            style={{ pointerEvents: location != null && location.pathname === this.props.paths[key].path ? 'none' : null }}
                            key={("nav-" + key)}>{key}</NavLink>;

              anchors.push(navEl);
            }
          }

          return anchors;
        })()}
      </nav>
    );
  }
}

export default withRouter(Nav);

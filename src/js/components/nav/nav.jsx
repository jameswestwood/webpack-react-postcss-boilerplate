/* @flow */
import * as React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import anime from 'animejs';

import styles from './nav.css';

type Props = {
  paths:{},
  specifier?:string
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
              let navEl:React.Element;

              // if the current route
              if(location.pathname === this.props.paths[key].path)
              {
                navEl = <div className="nav__link nav__link--active" key="nav-active">{key}</div>
              }
              else
              {
                navEl = <Link className="nav__link" to={this.props.paths[key].path} key={("nav-" + key)}>{key}</Link>;
              }

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

/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import anime from 'animejs';

import Utilities from '../classes/utilities.js';

import Header from './header/header.jsx';
import Nav from './nav/nav.jsx';
import Welcome from './welcome/welcome.jsx';
import About from './about/about.jsx';
import Footer from './footer/footer.jsx';

import styles from './ui.css';

type State = {
  flat:boolean
}

class UI extends React.Component<State>
{
  state:State = {
    flat: true
  };

  paths = {
    "welcome": {
      path: "/",
      component: <Welcome />
    },
    "about" : {
      path: "/about",
      component: <About />
    }
  };

  componentDidMount()
  {
    // initial layout
    this.manageLayout(Utilities.getWidth());

    // update layout on resize if required
    window.addEventListener('resize', (event) => {

      this.manageLayout(Utilities.getWidth());
    });
  }

  manageLayout(currentSize:number)
  {
    if(this.state.flat === false
      && currentSize <= this.props.breakpoint){

      this.setState({
        flat: true
      });
    }
    else if(this.state.flat === true
            && currentSize > this.props.breakpoint){

      this.setState({
        flat: false
      });
    };
  }

  handleEnter = (el) => {
    anime({
      targets: el,
      opacity: [
        {value:0, duration:0},
        {value:1, duration:200, delay:200}
      ],
      easing: 'easeOutQuad'
    });
  }

  handleExit = (el) => {
    anime({
      targets: el,
      opacity: [
        {value:0, duration:200}
      ],
      easing: 'easeInQuad'
    });
  }

  render(){
    return (
      <React.Fragment>
        <Header />
        <main>
          <Nav paths={this.paths} />
          <div className="ui__container">
            {(() => {

              switch(this.state.flat)
              {
              case false :

              return <Route render={({ location }) => (
                      <TransitionGroup>
                        <CSSTransition key={location.key}
                                        classNames="ui__section-"
                                        onEnter={(el) => {this.handleEnter(el);}}
                                        onExit={(el) => {this.handleExit(el);}}
                                        timeout={250}>
                          <Switch location={location}>
                            {(() => {
                              const keys:Array<Object> = Object.keys(this.paths);
                              let routes:Array<Route> = [];

                              for(let i:number = 0; i < keys.length; i++)
                              {
                                routes.push(<Route exact={true} path={this.paths[keys[i]].path} render={() => this.paths[keys[i]].component} key={'route-' + (keys[i])} />);
                              }

                              return routes;

                            })()}
                          </Switch>
                        </CSSTransition>
                      </TransitionGroup>
                    )}/>;

              case true :

                const keys:Array<Object> = Object.keys(this.paths);
                let sections:Array<Route> = [];

                for(let i:number = 0; i < keys.length; i++)
                {
                  let section:React.Component = this.paths[keys[i]].component;

                  sections.push(<div id={keys[i]} key={"section-" + (keys[i])}>{section}</div>);
                }

                return sections;

              };

            })()}
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default UI;

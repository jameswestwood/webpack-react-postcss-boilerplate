/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import anime from 'animejs';

import Header from './header/header.jsx';
import Nav from './nav/nav.jsx';
import Welcome from './welcome/welcome.jsx';
import About from './about/about.jsx';
import Footer from './footer/footer.jsx';

import styles from './ui.css';

class UI extends React.Component
{
  paths = {
    "welcome" : "/",
    "about" : "/about",
  };

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
            <Route render={({ location }) => (
              <TransitionGroup>
                <CSSTransition key={location.key} classNames="ui__section-" onEnter={(el) => {this.handleEnter(el);}} onExit={(el) => {this.handleExit(el);}} timeout={1000}>
                  <Switch location={location}>
                    <Route exact path={this.paths.welcome} render={() => <Welcome />} />
                    <Route exact path={this.paths.about} render={() => <About />} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}/>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default UI;

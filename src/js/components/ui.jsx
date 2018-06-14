/* @flow */

import * as React from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import anime from 'animejs';

import Utilities from '../classes/utilities.js';

import Header from './header/header.jsx';
import Welcome from './welcome/welcome.jsx';
import About from './about/about.jsx';
import Footer from './footer/footer.jsx';

import styles from './ui.css';

type Props = {
  breakpoint:number
}

type State = {
  flat:boolean
}

class UI extends React.Component<Props, State>
{
  state:State = {
    flat: true
  };

  paths: {
    [string]: {
      path: string,
      component: React.Element<any>
    }
  } = {
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
    window.addEventListener('resize', (event:EventListener) => {

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

  handleEnter = (el:HTMLElement) => {
    anime({
      targets: el,
      opacity: [
        {value:0, duration:0},
        {value:1, duration:500, delay:200}
      ],
      easing: 'easeOutQuad'
    });
  }

  handleExit = (el:HTMLElement) => {
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
      <div className={"ui" + (!this.state.flat ? ' ui--layered' : '')}>
        <Header specifier="ui" paths={this.paths} />
        <main className="ui__content">
          <div className="ui__container">
            {(() => {

              switch(this.state.flat)
              {
              case false :

              return <Route render={({ location }) => (
                      <TransitionGroup>
                        <CSSTransition key={location.pathname}
                                        classNames="ui__section-"
                                        onEnter={(el:HTMLElement) => {this.handleEnter(el);}}
                                        onExit={(el:HTMLElement) => {this.handleExit(el);}}
                                        timeout={500}>
                          <Switch location={location}>
                            {(() => {
                              const keys:Array<string> = Object.keys(this.paths);
                              let routes:Array<React.Element<any>> = [];

                              for(let i:number = 0; i < keys.length; i++)
                              {
                                routes.push(<Route exact={true}
                                                   path={this.paths[keys[i]].path}
                                                   render={() => <section className="ui__section">{this.paths[keys[i]].component}</section>}
                                                   key={'route-' + (keys[i])} />);
                              }

                              return routes;

                            })()}
                          </Switch>
                        </CSSTransition>
                      </TransitionGroup>
                    )}/>;

              case true :

                const keys:Array<string> = Object.keys(this.paths);
                let sections:Array<React$Node> = [];

                for(let i:number = 0; i < keys.length; i++)
                {
                  let section:React$Node = this.paths[keys[i]].component;

                  sections.push(<section id={keys[i]}
                                     className="ui__section"
                                     key={"section-" + (keys[i])}>{section}</section>);
                }

                return sections;
              };
            })()}
          </div>
        </main>
        <Footer specifier="ui__footer" />
      </div>
    );
  }
}

export default UI;

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
  currentSection:HTMLElement;
  transitionDuration:number = 300;

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
    this.manageLayout(Utilities.getWidth(document));

    // update layout on resize if required
    window.addEventListener('resize', (event:EventListener) => {

      this.manageLayout(Utilities.getWidth(document));
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

  transitionSections = async (nextSection:HTMLElement) => {

    // initially hide new section while old transitions out
    anime({
      targets: nextSection,
      opacity: 0,
      scale:1.1,
      duration:0,
    });

    if(this.currentSection != null)
    {
      //  take next section out of page flow temporarily while current section is transitioned out
      nextSection.style.position = "absolute";

      // transition out current section
      this.exitComplete = anime({
                            targets: this.currentSection,
                            opacity: 0,
                            scale: 0.9,
                            easing: 'easeInQuad',
                            duration: this.transitionDuration
                          });

      await this.exitComplete.finished;

      this.currentSection.style.position = "absolute";
      nextSection.style.position = "static";
    }

    // transition in next section
    anime({
      targets: nextSection,
      opacity: 1,
      scale: 1,
      duration: this.transitionDuration,
      easing: 'easeOutQuad'
    });

    this.currentSection = nextSection;
  }

  render(){
    return (
      <div className={"ui" + (!this.state.flat ? ' ui--layered' : '')}>
        <Header specifier="ui" paths={this.paths} />
        <main className="ui__content">
        {(() => {
          switch(this.state.flat)
          {
          case false : // render single page app for higher resolutions

          return <Route render={({ location }) => (
                  <TransitionGroup>
                    <CSSTransition key={location.pathname}
                                    classNames="ui__section-"
                                    onEnter={(el:HTMLElement) => {this.transitionSections(el);}}
                                    timeout={this.transitionDuration}>
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

            case true :  // render flattened app for lower resolutions

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
        </main>
        <Footer specifier="ui__footer" />
      </div>
    );
  }
}

export default UI;

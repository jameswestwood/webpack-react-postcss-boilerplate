/* @flow */

import * as React from 'react';
import {render} from 'react-dom';

import {Transition, TransitionGroup} from 'react-transition-group';

import styles from './ui.css';


class UI extends React.Component<Props, State>
{
  render(){
    return (
      <TransitionGroup>
      {(() => {

          switch(false)
          {
            case "play":
            case "pause":
            case "stageStart":

            return <Transition key="controls-transition" in={this.props.store.gameState === "play" || this.props.store.gameState === "stageStart" || this.props.store.gameState === "pause"} onEnter={() => { this.controlsComponent.handleEnter(); }} onExit={() => { this.controlsComponent.handleExit(); }} unmountOnExit timeout={500}>
                    <aside className={"app__panel app__panel--primary"}>
                        <Controls key="controls-element" store={this.props.store} ref={instance => { this.controlsComponent = instance; }} />
                    </aside>
                  </Transition>;

            default :

            return  null;
          }
        })()}
        </TransitionGroup>
    );
  }
}

export default UI;

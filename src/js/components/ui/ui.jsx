/* @flow */

import * as React from 'react';
import {render} from 'react-dom';
import {observer} from 'mobx-react';
import PubSub from "pubsub-js";
import {Transition, TransitionGroup} from 'react-transition-group';
import anime from 'animejs';

import {getDimensions} from "../../variables";

import Button from '../button/button.jsx';
import MuteButton from '../muteButton/muteButton.jsx';
import Company from '../company/company.jsx';
import Title from '../title/title.jsx';
import Ingame from '../ingame/ingame.jsx';
import Controls from '../controls/controls.jsx';
import Upgrades from '../upgrades/upgrades.jsx';
import HighScores from '../highscores/highscores.jsx';

import Alert from '../alert/alert.jsx';
import Pause from '../pause/pause.jsx';
import GameOver from '../gameOver/gameOver.jsx';
import StageInit from '../stageInit/stageInit.jsx';
import WaveIntro from '../waveIntro/waveIntro.jsx';
import StageComplete from '../stageComplete/stageComplete.jsx';
import WorldComplete from '../worldComplete/worldComplete.jsx';
import StageSelect from '../stageSelect/stageSelect.jsx';

import styles from './ui.css';

type Props = {
  store:Store
}

type State = {
  view:string
}

@observer class UI extends React.Component<Props, State>
{
    components = [];
    views = {};

    state = {
      view: ''
    }

    constructor(Props, State)
    {
      super(Props, State);
    }

    startGame()
    {
        PubSub.publish('game.start');
    };

    replayGame()
    {
        PubSub.publish('game.replay');
    };

    componentDidUpdate(prevProps:Props, prevState:State)
    {
      if(this.state.view !== this.props.store.gameState)
      {
        this.setState({
          view: this.props.store.gameState
        });
      }
    }

    render(){
        return (
          <div>
            <span className={"ad" + (this.props.store.gameState === "title" ? " ad--show" : "")}>
              <a href="https://github.com/jameswestwood/hyperBreak" className="ad__content">
                {/*
                <svg class="ad__icon" xmlns="http://www.w3.org/2000/svg" viewBox="8.226 10.91 49.755 44.078">
                  <path class="ad__icon-path" d="M14.419 10.91l-6.194 7.742v2.168c0 6.193 10.116 6.193 10.116 0 0 6.193 9.703 6.193 9.703 0 0 6.193 10.116 6.193 10.116 0 0 6.193 9.704 6.193 9.704 0 0 6.193 10.115 6.193 10.115 0v-2.168l-6.193-7.742H14.419zm3.82 13.626c-.31.413-.62.722-.929 1.032-1.135.929-2.581 1.342-4.026 1.342-.413 0-.826 0-1.135-.103v28.181h41.807V26.807c-.413.103-.723.103-1.136.103-1.445 0-2.89-.413-4.026-1.342-.309-.31-.619-.62-.928-1.032-.311.413-.518.722-.93 1.032-1.136.929-2.58 1.342-3.923 1.342-1.444 0-2.89-.413-3.923-1.342-.309-.31-.619-.62-.929-1.032-.31.413-.619.722-.929 1.032-1.341 1.032-2.787 1.445-4.232 1.445s-2.89-.413-4.026-1.342c-.31-.31-.619-.619-.929-1.032-.31.413-.516.723-.929 1.032-1.136.929-2.581 1.342-3.923 1.342-1.445 0-2.89-.413-3.922-1.342-.31-.31-.619-.619-.929-1.032l-.103-.103zm5.574 4.232c2.374 0 3.406.62 4.645 3.097h9.187c.517-2.477 1.549-3.097 4.646-3.097 2.373 0 6.399 2.271 7.019 5.471l3.097 12.078c.619 3.097-1.135 5.367-4.232 5.367-2.168 0-4.955-1.445-6.812-5.367H24.845c-1.858 4.025-4.645 5.367-6.813 5.367-3.097 0-4.852-2.271-4.232-5.367l3.097-12.078c.619-3.2 4.645-5.471 7.019-5.471h-.103zM33 33l-7.329 7.742h3.097v3.922h8.568v-3.818h3.096L33 33z"/>
                </svg>
                */}

                <svg className="ad__icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title>GitHub icon</title>
                  <path className="ad__icon-path" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                {/*
                <svg class="ad__icon" version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1024 1024">
                  <path class="ad__icon-path" d="M511.104 0c-268.843 0-489.301 207.36-510.165 470.912l274.432 113.408c23.253-15.829 51.328-25.173 81.579-25.173 2.688 0 5.333 0.171 8.021 0.256l122.069-176.725v-2.517c0-106.453 86.528-193.024 193.024-193.024 106.411 0 193.024 86.656 193.024 193.152s-86.613 193.067-193.024 193.067h-4.48l-173.909 124.203c0 2.219 0.171 4.48 0.171 6.784 0 80-64.64 144.896-144.64 144.896-69.76 0-128.683-50.048-142.123-116.352l-196.48-81.365c60.843 214.912 258.133 372.48 492.501 372.48 282.752 0 511.957-229.248 511.957-512s-229.248-512-511.957-512zM321.707 776.96l-62.848-26.027c11.179 23.168 30.464 42.624 56.064 53.333 55.339 22.997 119.168-3.243 142.165-58.667 11.221-26.88 11.264-56.277 0.213-83.157s-32-47.829-58.752-59.008c-26.624-11.093-55.040-10.624-80.128-1.28l64.981 26.88c40.789 17.067 60.117 64 43.051 104.747-16.939 40.832-63.872 60.16-104.704 43.179h-0.043zM808.747 380.032c0-70.912-57.728-128.64-128.64-128.64-71.040 0-128.64 57.728-128.64 128.64 0 71.040 57.6 128.64 128.64 128.64 70.955 0 128.64-57.6 128.64-128.64zM583.765 379.819c0-53.419 43.221-96.683 96.64-96.683 53.291 0 96.683 43.264 96.683 96.683 0 53.376-43.392 96.64-96.683 96.64-53.461 0-96.64-43.264-96.64-96.64z"></path>
                </svg>
                */}
              </a>
            </span>

            <Transition key="dimension-alert-transition" in={this.props.store.dimensionsOK === false
                                                              && this.props.store.gameState !== null
                                                              && this.props.store.gameState !== "controlsAlert"
                                                              && this.props.store.gameState !== "company"} onEnter={() => { this.dimensionsAlert.handleEnter(); }} onExit={() => { this.dimensionsAlert.handleExit(); }} unmountOnExit timeout={500}>
              <Alert title="Oops."
                    content={"Hyper Break requires a screen resolution of at least " + (getDimensions().minWidth) + " x " + (getDimensions().minHeight) + ". Please resize your browser."}
                    uid="alert-dimensions"
                    icon="resize-icon.png"
                    ref={instance => { this.dimensionsAlert = instance; }}
                    modal={true}
                    key="alert-dimensions" />
            </Transition>

            <Transition key="browser-alert-transition" in={this.props.store.browserOK === false
                                                            && this.props.store.gameState === "title"
                                                            && this.props.store["alert-browserAlert-dismissed"] !== true} onEnter={() => { this.browserAlert.handleEnter(); }} onExit={() => { this.browserAlert.handleExit(); }} unmountOnExit timeout={500}>
              <Alert specifier="ui--browser-alert"
                    title="Warning."
                    content={"It looks like you are using " + (this.props.store.currentBrowser) + ". We recommend using the latest version of Google Chrome."}
                    uid="browserAlert"
                    closeLabel="Got it"
                    icon="browser-icon.png"
                    ref={instance => { this.browserAlert = instance; }}
                    key="alert-browser" />
            </Transition>

            <main className="app">
              <div className="app__container" id="mainContainer">
              <div className="app__main" id="canvasContainer">
                <TransitionGroup>
                {(() => {

                    switch(this.props.store.gameState)
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

                  <TransitionGroup>
                  {(() => {

                      switch(this.props.store.gameState)
                      {
                        case "controlsAlert":

                        return  <Transition key="control-alert-transition" in={this.props.store.gameState === "controlsAlert"} onEnter={() => { this.controlsAlert.handleEnter(); }} onExit={() => { this.controlsAlert.handleExit(); }} timeout={250}>
                                    <Alert specifier="ui--browser-alert"
                                          title="Controls."
                                          content={"Hyper Break requires a keyboard and mouse to play."}
                                          uid="alert-controls"
                                          icon="warning-icon.png"
                                          ref={instance => { this.controlsAlert = instance; }}
                                          key="alert-browser" />
                                  </Transition>

                        case "highScores":

                        return <Transition key="highScores-transition" in={this.props.store.gameState === "highScores"} onEnter={() => { this.highScores.handleEnter(); }} onExit={() => { this.highScores.handleExit(); }} unmountOnExit timeout={1500}>
                                  <HighScores key="highScores-element" records={this.props.store.records} ref={instance => { this.highScores = instance; }} />
                                </Transition>;

                        case "company" :

                        return <Transition key="company-transition" in={this.props.store.gameState === "company"} onEnter={() => { this.companyComponent.handleEnter(); }} onExit={() => { this.companyComponent.handleExit(); }} unmountOnExit timeout={1500}>
                                  <Company key="company-element" ref={instance => { this.companyComponent = instance; }} />
                                </Transition>;

                        break;

                        case "title" :

                        return <Transition key="title-transition" in={this.props.store.gameState === "title"} onEnter={() => { this.titleComponent.handleEnter(); }} onExit={() => { this.titleComponent.handleExit(); }} unmountOnExit timeout={1000}>
                                  <Title key="title-element" ref={instance => { this.titleComponent = instance; }} />
                                </Transition>;

                        break;

                        case "stageInit" :

                        return  <Transition key="stageInit-transition" in={this.props.store.gameState === "stageInit"} onEnter={() => { this.stageInitComponent.handleEnter(); }} onExit={() => { this.stageInitComponent.handleExit(); }} unmountOnExit timeout={1000}>
                                  <StageInit
                                    key="stageInit-element"
                                    stage={this.props.store.stage}
                                    asteroidCount={this.props.store.world.stages[this.props.store.stage][this.props.store.shard].asteroidCount}
                                    asteroids={this.props.store.world.stages[this.props.store.stage][this.props.store.shard].asteroids}
                                    difficulty={this.props.store.world.stages[this.props.store.stage][this.props.store.shard].difficulty}
                                    difficulties={this.props.store.world.stages[this.props.store.stage][this.props.store.shard].difficulties}
                                    ref={instance => { this.stageInitComponent = instance; }} />
                                </Transition>;

                        break;

                        case "stageStart" :

                        return  <Transition key="stageStart-transition" in={this.props.store.gameState === "stageStart"} onEnter={() => { this.stageStartComponent.handleEnter(); }} onExit={() => { this.stageStartComponent.handleExit(); }} unmountOnExit timeout={1000}>
                                  <WaveIntro key="stageStart-element" countdown={this.props.store.waveCountdown} ref={instance => { this.stageStartComponent = instance; }} />
                                </Transition>;

                        break;

                        case "play" :

                        return <Transition key="play-transition" in={this.props.store.gameState === "play"} onEnter={() => { this.playComponent.handleEnter(); }} onExit={() => { this.playComponent.handleExit(); }} unmountOnExit timeout={1000}>
                                  <Ingame store={this.props.store} latestUpgrade={this.props.store.latestUpgrade} key="play-element" ref={instance => { this.playComponent = instance; }} />
                                </Transition>;

                        break;

                        case "pause" :

                        return  <Transition key="pause-transition" in={this.props.store.gameState === "pause"} onEnter={() => { this.pauseComponent.handleEnter(); }} onExit={() => { this.pauseComponent.handleExit(); }} unmountOnExit timeout={1000}>
                                  <Pause key="pause-element" key="pause-element" ref={instance => { this.pauseComponent = instance; }} />
                                </Transition>;

                        break;

                        case "stageComplete" :

                        return  <Transition key="stageComplete-transition" in={this.props.store.gameState === "stageComplete"} onEnter={() => { this.stageCompleteComponent.handleEnter(); }} unmountOnExit timeout={0}>
                                  <StageComplete stage={this.props.store.stage}  key="stageComplete-element" ref={instance => { this.stageCompleteComponent = instance; }} />
                                </Transition>;

                        break;

                        case "worldComplete" :

                        return  <Transition key="worldComplete-transition" in={this.props.store.gameState === "worldComplete"} onEnter={() => { this.worldCompleteComponent.handleEnter(); }} unmountOnExit timeout={1000}>
                                  <WorldComplete key="worldComplete-element" ref={instance => { this.worldCompleteComponent = instance; }} />
                                </Transition>;

                        break;

                        case "stageSelect" :

                        return  <Transition key="stageSelect-transition" in={this.props.store.gameState === "stageSelect"} onEnter={() => { this.stageSelectComponent.handleEnter(); }} onExit={() => { this.stageSelectComponent.handleExit(); }} unmountOnExit timeout={1000}>
                                  <StageSelect stage={this.props.store.stage + 1} world={this.props.store.world}  key="stageSelect-element" ref={instance => { this.stageSelectComponent = instance; }} />
                                </Transition>;

                        break;

                        case "gameover" :

                        return  <Transition key="gameOver-transition" in={this.props.store.gameState === "gameover"} onEnter={() => { this.gameOverComponent.handleEnter(); }} unmountOnExit timeout={0}>
                                  <GameOver key="gameOver-element" ref={instance => { this.gameOverComponent = instance; }} />
                                </Transition>;

                        break;

                        default :

                        return  null;
                      }
                  })()}
                </TransitionGroup>

                <TransitionGroup>
                {(() => {

                    switch(this.props.store.gameState)
                    {
                      case "play" :
                      case "pause":
                      case "stageStart":

                      return <Transition key="upgrades-transition" in={this.props.store.gameState === "play"} onEnter={() => { this.upgradeComponent.handleEnter(); }} onExit={() => { this.upgradeComponent.handleExit(); }} unmountOnExit timeout={1000}>
                                <aside className={"app__panel app__panel--secondary "}>
                                  <Upgrades upgrades={this.props.store.upgrades} hotkey="LM" label={this.props.store.primary.name} key="upgrades-element" ref={instance => { this.upgradeComponent = instance; }} />
                                </aside>
                             </Transition>;

                      default :

                      return  null;
                    }
                })()}
              </TransitionGroup>
              </div>
            </div>
            {(() => {

              if(this.props.store.gameState !== null
                && this.props.store.gameState !== "company"
                && this.props.store.gameState !== "controlsAlert")
              {
                return <div>
                          <MuteButton mute={this.props.store.mute} specifier="app__muteButton" key="mute-button" />
                          <span className="app__version">Alpha v<strong>1.0</strong></span>
                       </div>
              }
            })()}
          </main>
        </div>
      );
    }
}

export default UI;

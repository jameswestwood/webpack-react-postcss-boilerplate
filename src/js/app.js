/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import styles from '../css/base.css';
import critical from '../css/critical.crit.css';

import UI from './components/ui.jsx';

window.onload = function () {

  let appContainer:?Element = document.getElementById('app');

  if(appContainer != null)
  {
    render(
        <HashRouter>
          <UI breakpoint={600} />
        </HashRouter>,
        appContainer
      );
    }
    else
    {
      throw new Error("No app container was defined.");
    }
};

/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';

import styles from '../css/base.css';
import critical from '../css/critical.crit.css';

import UI from './components/ui.jsx';

window.onload = function () {

  let appContainer:?Element = document.getElementById('app');

  if(appContainer != null)
  {
    render(
        <BrowserRouter>
          <UI />
        </BrowserRouter>,
        appContainer
      );
    }
    else
    {
      throw new Error("No app container was defined.");
    }
};

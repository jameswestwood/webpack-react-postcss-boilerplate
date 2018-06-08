/* @flow */

import React from 'react';
import {render} from 'react-dom';

import styles from '../css/base.css';
import critical from '../css/critical.crit.css';

window.onload = function () {

  let appContainer:?Element = document.getElementById('app');

  if(appContainer != null)
  {
      render(
          <UI />,
          appContainer
      );
    }
    else
    {
      throw new Error("No app container was defined.");
    }
};

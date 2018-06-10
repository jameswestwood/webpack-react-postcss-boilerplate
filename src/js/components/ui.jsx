/* @flow */
import * as React from 'react';
import { render } from 'react-dom';
import {Link, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Header from './header/header.jsx';
import Welcome from './welcome/welcome.jsx';
import About from './about/about.jsx';
import Footer from './footer/footer.jsx';

import styles from './ui.css';

const history = createBrowserHistory();

class UI extends React.Component<Props, State>
{
  render(){
    return (
      <React.Fragment>
        <Header />
        <main>
          <nav>
            <Link to="/">welcome</Link>
            <Link to="/about">about</Link>
          </nav>
          <div>
            <Route exact path="/" component={Welcome} />
            <Route path="/about" component={About} />
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default UI;

import React, { Component } from 'react';
import { Route } from 'react-router';

import { PasswordManager } from 'ui/root/manager';
import { OpenContainer } from 'ui/root/open';

import './app.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Route path='/' component={OpenContainer} />
        <Route path='/container/:provider/:id' component={PasswordManager} />
      </div>
    );
  }
}

export default App;

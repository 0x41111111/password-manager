import React, { Component } from 'react';
import { Sidebar, Menu, Segment } from 'semantic-ui-react';

import { PasswordEntryContainer } from 'ui/entry';
import { CategoryContainer } from 'ui/category';
import { ActionContainer } from 'ui/menu';
import { EntryModal } from 'ui/modal/entry';

import './app.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} visible vertical direction='left'>
            <CategoryContainer />
            <ActionContainer />
          </Sidebar>
          <Sidebar.Pusher>
            <PasswordEntryContainer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;

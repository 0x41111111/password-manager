import React, { Component } from 'react';
import { Sidebar, Menu, Segment, Icon } from 'semantic-ui-react';

import { PasswordEntryContainer } from 'ui/entry';
import { CategoryContainer } from 'ui/category';
import './app.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} visible vertical direction='left'>
            <CategoryContainer />
            <div id="actions">
              <Menu.Item name="action_settings">
                <Icon name="settings" />
                Settings
              </Menu.Item>
              <Menu.Item name="action_lock" className="action-critical">
                <Icon name="lock" color="red" />
                <span>Lock Container</span>
              </Menu.Item>
            </div>
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

import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export class ActionContainer extends Component {
  render() {
    return (
      <div id="actions">
        <Menu.Item name="action_new_entry">
          <Icon name="add" /> New Entry...
        </Menu.Item>
        <Menu.Item name="action_settings">
          <Icon name="settings" /> Settings
        </Menu.Item>
        <Menu.Item name="action_lock" className="action-critical">
          <Icon name="lock" color="red" />
          <span>Lock Container</span>
        </Menu.Item>
      </div>
    );
  }
};

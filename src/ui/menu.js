import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

import { EntryModal } from 'ui/modal/entry';

export class ActionContainer extends Component {
  state = { modal: undefined };

  constructor(props) {
    super(props);
    this.toggleEntryModal = this.toggleEntryModal.bind(this);
  };

  toggleEntryModal() {
    this.state.modal ? this.setState({ modal: undefined }) : this.setState({ modal: <EntryModal onClose={this.toggleEntryModal} /> });
  };

  render() {
    return (
      <div id="actions">
        <Menu.Item name="action_new_entry" onClick={this.toggleEntryModal}>
          <Icon name="add" /> New Entry...
        </Menu.Item>
        <Menu.Item name="action_settings">
          <Icon name="settings" /> Settings
        </Menu.Item>
        <Menu.Item name="action_lock" className="action-critical">
          <Icon name="lock" color="red" />
          <span>Lock Container</span>
        </Menu.Item>
        {this.state.modal}
      </div>
    );
  }
};

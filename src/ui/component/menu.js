import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';

import { EntryModal } from 'ui/modal/entry';
import { SettingsModal } from 'ui/modal/settings';

class ActionContainer extends Component {
  state = {
    entryModal: undefined,
    showSettingsModal: false
  };

  constructor(props) {
    super(props);

    this.toggleEntryModal = this.toggleEntryModal.bind(this);
    this.cleanupAndLock = this.cleanupAndLock.bind(this);
  };

  // The new entry modal is recreated after each use rather than made invisible so that all the data from the previous entry is gone.
  toggleEntryModal() {
    this.state.entryModal ? this.setState({ entryModal: undefined }) : this.setState({ entryModal: <EntryModal onClose={this.toggleEntryModal} /> });
  };

  cleanupAndLock() {
    console.warn("UNIMPLEMENTED: the state needs to be saved remotely and wiped out locally");
    this.props.history.push('/');
  };

  render() {
    return (
      <div id="actions">
        <Menu.Item name="action_new_entry" onClick={this.toggleEntryModal}>
          <Icon name="add" /> New Entry...
        </Menu.Item>
        <Menu.Item name="action_settings" onClick={() => this.setState({ showSettingsModal: true })}>
          <Icon name="settings" /> Settings
        </Menu.Item>
        <Menu.Item name="action_lock" className="action-critical" onClick={this.cleanupAndLock}>
          <Icon name="lock" color="red" />
          <span>Lock Container</span>
        </Menu.Item>
        {this.state.entryModal}
        <SettingsModal open={this.state.showSettingsModal} onClose={() => this.setState({ showSettingsModal: false })} />
      </div>
    );
  }
};

const wrapped = withRouter(ActionContainer);
export { wrapped as ActionContainer };
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Header, Modal, Tab } from 'semantic-ui-react';

import { PasswordGeneratorPopup } from 'ui/popup/password-generator';

class DevToolsPane extends Component {
  render() {
    return (
      <Tab.Pane>
        <Header size="medium">Test Components</Header>
        <p>Use this section to test components before they're wired up to their intended components</p>
        <br />
        <PasswordGeneratorPopup trigger={
          <Button icon='settings' label='Open Password Generator' />
        } onAccepted={(p) => console.log(p)} />
      </Tab.Pane>
    );
  };
};

class SettingsModal extends Component {
  tabPanes = [];

  constructor(props) {
    super(props);

    if (props.devMode) {
      this.tabPanes.push({ menuItem: "Developer Tools", render: () => <DevToolsPane /> })
    }
  }

  render() {
    return (
      <Modal open={true}>
        <Modal.Content>
          <Tab menu={{ pointing: true, secondary: true }} panes={this.tabPanes} />
        </Modal.Content>
      </Modal>
    );
  };

  static propTypes = {
    devMode: PropTypes.bool.isRequired
  };
};
const wrapped = connect(state => ({ devMode: state.ui.dev }))(SettingsModal);

export { wrapped as SettingsModal };

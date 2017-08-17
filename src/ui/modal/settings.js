import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Modal, Tab } from 'semantic-ui-react';

class DevToolsPane extends Component {
  render() {
    return (
      <Tab.Pane>
        <Header size="medium">Test Components</Header>
        <p>Use this section to test components before they're wired up to their intended components</p>
        <br />
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
      <Modal open={this.props.open} onClose={this.props.onClose} closeIcon='close'>
        <Modal.Content>
          <Tab menu={{ pointing: true, secondary: true }} panes={this.tabPanes} />
        </Modal.Content>
      </Modal>
    );
  };

  static propTypes = {
    devMode: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };
};
const wrapped = connect(state => ({ devMode: state.ui.dev }))(SettingsModal);

export { wrapped as SettingsModal };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Modal } from 'semantic-ui-react';

export class ConfirmDeleteModal extends Component {
  render() {
    return (
      <Modal basic size='small' open={this.props.shouldOpen}>
        <Header icon="delete" content="Are you sure?" />
        <Modal.Content>
          <span> Are you sure you wish to delete this entry? </span>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='green' onClick={this.props.onDismissed}>No</Button>
          <Button basic color='red' onClick={this.props.onDeleteConfirmed}>Yes</Button>
        </Modal.Actions>
      </Modal>
    );
  }

  static propTypes = {
    onDismissed: PropTypes.func.isRequired,
    onDeleteConfirmed: PropTypes.func.isRequired,
    shouldOpen: PropTypes.bool.isRequired
  };
};

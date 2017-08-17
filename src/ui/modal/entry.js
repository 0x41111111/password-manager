import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react';

import { upsertPasswordEntry, deletePasswordEntry } from 'state/actions/entry';
import { ConfirmDeleteModal } from 'ui/modal/delete-confirm';

// Allows a password entry to be created or updated.
// TODO/nice to have: change the label beside the login field to match the contents
// example: setting the label to "Email" if an email address is detected
class EntryModal extends Component {
  constructor(props) {
    super(props);

    let blankEntry = { name: "", login: "", password: "" };
    let filledEntry = props.entryContents ? props.entryContents : {};
    const entry = { ...blankEntry, ...filledEntry };

    this.state = {
      _title: props.entryID !== "" ? "New Entry" : `Editing: ${entry.name} (${entry.login})`,
      _clean: true,
      _unsavedPromptVisible: false,
      _deletePromptVisible: false,
      ...entry
    };

    // these need access to component state
    this.changeHandler = this.changeHandler.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onBeforeSave = this.onBeforeSave.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  };

  changeHandler(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    this.setState({ _clean: false, [fieldName]: fieldValue });
  };

  // called in the event of cancel/close being clicked, save/delete use their own callbacks
  handleClose(event) {
    if (this.state.clean) { // safe to close, no changes have been made
      this.props.onClose();
      return;
    }

    this.setState({ _unsavedPromptVisible: true });
  };

  onBeforeSave(event) {
    const id = this.props.entryID ? this.props.entryID : null;

    const entryToDispatch = { id, name: this.state.name, login: this.state.login, password: this.state.password };

    this.props.dispatch(upsertPasswordEntry(entryToDispatch));
    this.props.onClose();
  };

  confirmDelete() {
    this.props.dispatch(deletePasswordEntry(this.state.id))
  };

  render() {
    return (
      <div>
        <Modal basic size='small' open={this.state._unsavedPromptVisible}>
          <Header icon="trash" content="Unsaved Changes" />
          <Modal.Content>
            <span> You haven't saved your changes. Are you sure you wish to close this entry? </span>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='green' onClick={() => this.setState({ _unsavedPromptVisible: false })}>No</Button>
            <Button basic color='red' onClick={this.props.onClose}>Yes</Button>
          </Modal.Actions>
        </Modal>
        <ConfirmDeleteModal shouldOpen={this.state._deletePromptVisible}
          onDismissed={() => this.setState({ _deletePromptVisible: false })}
          onDeleteConfirmed={this.confirmDelete} />
        <Modal defaultOpen={true} closeOnDimmerClick={false} onClose={this.handleClose}>
          <Modal.Header>
            {this.state._title}
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input type="text" name="name" label="Entry Name"
                placeholder="Name" value={this.state.name}
                onChange={this.changeHandler} />
              <Form.Input type="text" name="login" label="Login"
                placeholder="example@example.com, example1, ..."
                value={this.state.login} onChange={this.changeHandler} />
              <Form.Input type="password" name="password" label="Password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                value={this.state.password} onChange={this.changeHandler} />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.onBeforeSave}>
              <Icon name="save" /> Save Changes
            </Button>
            <Button color="grey" onClick={this.handleClose}>
              <Icon name="close" /> Cancel
            </Button>
            <Button color="red" 
              onClick={() => this.setState({ _deletePromptVisible: true })} 
              disabled={!this.props.entryID}>
              <Icon name="trash" /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

  static propTypes = {
    /* An empty or undefined ID will result in an entry being created.
     * If an ID is passed but the ID doesn't exist, this will also result in a new entry being created.
     */
    entryID: PropTypes.string,

    // A password entry. If a new entry is to be created, this can be empty or undefined.
    entryContents: PropTypes.object,

    // Needs to be passed so that the modal can remove itself when it's no longer needed.
    onClose: PropTypes.func.isRequired
  };
};

const wrapped = connect()(EntryModal);
export { wrapped as EntryModal };

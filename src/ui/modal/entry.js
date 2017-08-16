import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';

// Allows a password entry to be created or updated.
// TODO/nice to have: change the label beside the login field to match the contents
// example: setting the label to "Email" if an email address is detected
export class EntryModal extends Component {
  constructor(props) {
    super(props);

    let blankEntry = { name: "", login: "", password: "" };
    let filledEntry = props.entryContents ? props.entryContents : {};
    const entry = {...blankEntry, ...filledEntry};

    this.state = {
      _title: props.entryID ? "New Entry" : `Editing: ${this.props.entryContents.name} (${this.props.entryContents.login})`,
      _clean: true,
      ...entry
    };

    this.changeHandler = this.changeHandler.bind(this);
  };

  changeHandler(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    this.setState({ _clean: false, [fieldName]: fieldValue });
  };

  render() {
    return (
      <Modal defaultOpen={true} closeOnDimmerClick={false}>
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
          <Button color="green">
            <Icon name="save" /> Save Changes
          </Button>
          <Button color="grey">
            <Icon name="close" /> Cancel
          </Button>
          <Button color="red" disabled={this.props.entryID}>
            <Icon name="trash" /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  static propTypes = {
    /* An empty or undefined ID will result in an entry being created.
     * If an ID is passed but the ID doesn't exist, this will also result in a new entry being created.
     */
    entryID: PropTypes.string,

    // A password entry. If a new entry is to be created, this can be empty or undefined.
    entryContents: PropTypes.object
  };
};

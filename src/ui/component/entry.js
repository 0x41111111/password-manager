import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Icon, Input, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { ConfirmDeleteModal } from 'ui/modal/delete-confirm';
import { EntryModal } from 'ui/modal/entry';
import { deletePasswordEntry } from 'state/actions/entry';

export class PasswordEntry extends Component {
  state = {
    hasRequestedDelete: false,
    hasRequestedEdit: false,
    hasRequestedReveal: false,
    revealText: "View/Copy Password"
  };

  constructor(props) {
    super(props);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.copyPassword = this.copyPassword.bind(this);

    // HACK: Safari returns `true` for queryCommandSupported with 'copy' as an argument.
    // thus, Safari is manually tested for.
    this.doesNotSupportCopying = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  };

  confirmDelete() {
    this.props.dispatchDelete(this.props.entry.id);
  };

  // TODO: is there a better way of doing this apart from raw HTML element creation?
  copyPassword() {
    const textArea = document.createElement("textarea");
    // make the text area invisible
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    // put the password in the text area
    textArea.value = this.props.entry.password;

    document.body.appendChild(textArea);
    textArea.select();

    try {
      console.log("copying");
      const result = document.execCommand('copy');

      if (!result) {
        console.error('copy failed');
        return;
      }

      console.log("copied");
    } catch (e) {
      console.error("copy failed: " + e);
      alert("TODO: user-visible error??");
    }

    this.setState({ revealText: "Copied!" }, () => {
      setTimeout(() => this.setState({ revealText: "View/Copy Password" }), 2500);
    })

    document.body.removeChild(textArea);
    this.setState({ hasRequestedReveal: false });
  };

  render() {
    const reveal = (
      <a className="left floated">
        {this.state.revealText} <Icon name="eye" />
      </a>
    );

    const noCopyingExplanation = (
      <div>
        <Divider />
        <p>Automatic copying is not supported on this platform or browser.</p>
      </div>
    );

    return (
      <Card>
        <Card.Content>
          <a className="right floated" onClick={() => this.setState({ hasRequestedDelete: true })}>
            <Icon name="close" />
          </a>
          <Card.Header>{this.props.entry.name}</Card.Header>
          <Card.Meta>{this.props.entry.login}</Card.Meta>
          <ConfirmDeleteModal shouldOpen={this.state.hasRequestedDelete}
            onDismissed={() => this.setState({ hasRequestedDelete: false })}
            onDeleteConfirmed={this.confirmDelete} />
        </Card.Content>
        <Card.Content extra>
          <Popup trigger={reveal} on='click'
            open={this.state.hasRequestedReveal}
            onOpen={() => { this.setState({ hasRequestedReveal: true }); this.copyPassword() }}
            onClose={() => this.setState({ hasRequestedReveal: false })}>
            <Input
              id={this.revealedEntryIDPrefix + this.props.entry.id}
              action={this.copyAction}
              disabled value={this.props.entry.password} size='mini' />
            {this.doesNotSupportCopying ? noCopyingExplanation : undefined}
          </Popup>
          <a className="right floated" onClick={() => this.setState({ hasRequestedEdit: true })}>
            Edit <Icon name="edit" />
          </a>
          {this.state.hasRequestedEdit ?
            <EntryModal entryID={this.props.entry.id}
              entryContents={this.props.entry}
              onClose={() => this.setState({ hasRequestedEdit: false })} />
            : undefined}
        </Card.Content>
      </Card>
    );
  };

  static propTypes = {
    entry: PropTypes.object,
    dispatchDelete: PropTypes.func.isRequired
  };
};

class EntryContainer extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired
  };

  render() {
    let entriesToRender = [];

    for (const e in this.props.entries) {
      if (this.props.entries.hasOwnProperty(e)) {
        const entry = this.props.entries[e];
        entriesToRender.push(
          <PasswordEntry key={entry.id} entry={entry} dispatchDelete={this.props.delete} />
        );
      }
    }

    return (
      <div id="item-container">
        <Card.Group>
          {entriesToRender}
        </Card.Group>
      </div>
    );
  };
};

const wrappedEntryContainer = connect(
  state => ({ entries: state.container.entries }),
  dispatch => ({ delete: id => dispatch(deletePasswordEntry(id)) })
)(EntryContainer);
export { wrappedEntryContainer as PasswordEntryContainer };

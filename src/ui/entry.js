import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { ConfirmDeleteModal } from 'ui/modal/delete-confirm';
import { EntryModal } from 'ui/modal/entry';
import { deletePasswordEntry } from 'state/actions/entry';

export class PasswordEntry extends Component {
  state = {
    hasRequestedDelete: false,
    hasRequestedEdit: false
  };

  constructor(props) {
    super(props);
    this.confirmDelete = this.confirmDelete.bind(this);
  };

  confirmDelete() {
    this.props.dispatchDelete(this.props.entry.id);
  };

  render() {
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
          <span className="left floated">
            Copy Password <Icon name="copy" />
          </span>
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

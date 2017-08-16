import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

export class PasswordEntry extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Icon name="close" className="right floated" />
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>{this.props.login}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <span className="left floated">
            Copy Password <Icon name="copy" />
          </span>
          <span className="right floated">
            Edit <Icon name="edit" />
          </span>
        </Card.Content>
      </Card>
    );
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired
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
        entriesToRender.push(<PasswordEntry key={entry.id} login={entry.login} name={entry.name} />)
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
  state => ({ entries: state.container.entries }
  ))(EntryContainer);
export { wrappedEntryContainer as PasswordEntryContainer };

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
  constructor(props) {
    super(props);
    let entriesToRender = [];

    for (var e in props.entries) {
      if (props.entries.hasOwnProperty(e)) {
        var entry = props.entries[e];
        entriesToRender.push(<PasswordEntry login={entry.login} name={entry.name} />)
      }
    }

    this.state = { entries: entriesToRender };
  }

  static propTypes = {
    entries: PropTypes.array.isRequired
  };

  render() {
    return (
      <div id="item-container">
        <Card.Group>
          {this.state.entries}
        </Card.Group>
      </div>
    );
  };
};

const wrappedEntryContainer = connect(
  state => ({ entries: state.container.entries }
  ))(EntryContainer);
export { wrappedEntryContainer as PasswordEntryContainer };

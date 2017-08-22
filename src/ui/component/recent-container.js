import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Table } from 'semantic-ui-react';

export class RecentContainerEntry extends Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell collapsing><Icon name='magic' />{this.props.name}</Table.Cell>
        <Table.Cell>{this.props.description}</Table.Cell>
        <Table.Cell collapsing textAlign='right'>
          <Button.Group>
            <Button positive icon='unlock' onClick={this.props.onUnlockRequested} />
            <Button disabled={this.props.deleteDisabled} negative icon='delete' onClick={this.props.onDeleteRequested} />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  };

  static propTypes = {
    onUnlockRequested: PropTypes.func,//.isRequired
    onDeleteRequested: PropTypes.func,//.isRequired
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deleteDisabled: PropTypes.bool
  };
}
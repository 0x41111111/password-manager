import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { RecentContainerEntry } from 'ui/component/recent-container';

class ContainerPicker extends Component {
  render() {
    return (
      <div>
        <Header as='h2'>Recent Containers</Header>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <RecentContainerEntry name="Demo Mode" description="A demonstration container to show off this app's features." />
          </Table.Body>
        </Table>
      </div>
    );
  };
};

// TODO: coloured Google logo/button as per guidelines
class AuthDialog extends Component {
  state = { inProgress: false };

  constructor(props) {
    super(props);

    this.beginGoogleAuth = this.beginGoogleAuth.bind(this);
  };

  beginGoogleAuth() {
    console.log("starting google auth");
    this.setState({ inProgress: true });

    console.log("sdk: requesting auth");
    window.gapi.auth2.getAuthInstance().signIn();
  }

  render() {
    return (
      <div>
        <Header as='h2' textAlign='center'>Connect your Account</Header>
        <p>You need to connect a Google Drive account for this app to work.</p>
        <Button icon='google' label='Sign in with Google' loading={this.state.inProgress} onClick={this.beginGoogleAuth} />
      </div>
    );
  };
};

class OpenContainer extends Component {
  render() {
    return (
      <div>
        <Segment>
          {this.props.authenticated ? <ContainerPicker /> : <AuthDialog />}
        </Segment>
      </div>
    );
  };

  static propTypes = {
    authenticated: PropTypes.bool
  };
};

const wrappedOpenContainer = connect(
  state => ({ authenticated: state.config.authenticated })
)(OpenContainer);
export { wrappedOpenContainer as OpenContainer };

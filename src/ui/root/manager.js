import React, { Component } from 'react';
import { Dimmer, Loader, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { PasswordEntryContainer } from 'ui/component/entry';
import { CategoryContainer } from 'ui/component/category';
import { ActionContainer } from 'ui/component/menu';
import { getRawContainer } from 'container/loader';
import load from 'state/actions/container';

/**
 * An actual password manager instance. Instantiated by the router in app.js, it obtains the container provider and ID.
 * Once the provider and container ID are determined, the container is loaded from the provider and a decryption prompt is shown.
 * If the container is decrypted successfully, the contents are loaded into Redux and the UI is rendered.
 */
class PasswordManager extends Component {
  state = { loading: true, decryptionRequestedYet: false };

  constructor(props) {
    super(props);

    const info = {
      provider: this.props.match.params.provider,
      id: this.props.match.params.id
    };

    console.log("provider: " + info.provider);
    this.beginAsyncSetup(info);
  };

  /**
   * Called when all the synchronous setup in the constructor finishes.
   * @param {object} info Provider information to be passed to getRawContainer.
   */
  async beginAsyncSetup(info) {
    const container = await getRawContainer(info);

    if (!container.encrypted) {
      this.props.dispatch(load(container.contents.entries, container.contents.categories));
    }

    this.setState({ loading: false, decryptionRequestedYet: container.encrypted });
  }

  // TODO: is there a better way of doing the dimmer without having a margin at the top of the page?
  render() {
    return (
      <div>
        {this.state.loading ?
          <Dimmer active>
            <Loader>Loading container...</Loader>
          </Dimmer>
          : undefined}
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} visible vertical direction='left'>
            <CategoryContainer />
            <ActionContainer />
          </Sidebar>
          <Sidebar.Pusher>
            <PasswordEntryContainer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  };
};

const wrapped = withRouter(connect(state => ({ state }), dispatch => ({ dispatch }))(PasswordManager));
export { wrapped as PasswordManager };

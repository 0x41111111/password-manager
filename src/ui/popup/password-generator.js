import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Input, Popup } from 'semantic-ui-react';

export class PasswordGeneratorPopup extends Component {
  state = { isVisible: false, length: 16 };
  characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()-=_+[]\\{}|;':\",./<>?";

  constructor(props) {
    super(props);

    this.regenerate = this.regenerate.bind(this);
    this.acceptPassword = this.acceptPassword.bind(this);
    this.handleRegenerateRequest = this.handleRegenerateRequest.bind(this);
  };

  regenerate() {
    // TODO: make sure that users can't supply 0 length passwords
    const rngValues = new Uint8Array(this.state.length - 1);
    let result = '';
    window.crypto.getRandomValues(rngValues);

    for (var i = 0; i < (this.state.length - 1); i++) {
      result += this.characterSet[rngValues[i] % this.characterSet.length]
    }

    this.setState({ password: result });
  };

  componentWillMount() {
    this.regenerate();
  }

  acceptPassword() {
    this.setState({ isVisible: false }, () => {
      this.props.onAccepted(this.state.password);
    });
  }

  handleRegenerateRequest(e) {
    this.regenerate();
  };

  // TODO: implement a handler for the Popup's onClose event
  render() {
    return (
      <Popup size='small' open={this.state.isVisible}
        onOpen={() => { this.regenerate(); this.setState({ isVisible: true }) }}
        onClose={() => this.setState({ isVisible: false })} trigger={this.props.trigger} on='click'>
        <Input disabled value={this.state.password} />
        <Divider />
        <Popup trigger={<Button onClick={this.handleRegenerateRequest} icon='refresh' floated='left' />} inverted content='Regenerate' />
        <Popup trigger={<Button positive icon='checkmark' floated='right' onClick={this.acceptPassword} />} inverted content='Use' />
      </Popup>
    );
  };

  static propTypes = {
    // Called if the user accepts a generated password and dismisses the popup.
    // Argument 0 will be the password.
    onAccepted: PropTypes.func.isRequired,

    // An element that will cause the generator to appear.
    // This will be passed to the Semantic UI `Popup` component's trigger prop.
    trigger: PropTypes.node
  };
};

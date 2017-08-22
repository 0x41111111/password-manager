import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Popup } from 'semantic-ui-react';

import { upsertCategory } from 'state/actions/category';

class NewCategoryPopup extends Component {
  state = { isVisible: false, name: "" };

  constructor(props) {
    super(props);

    this.createCategory = this.createCategory.bind(this);
    this.updateName = this.updateName.bind(this);
  };

  createCategory() {
    this.props.dispatch(upsertCategory({ name: this.state.name }));
    this.setState({ isVisible: false });
  };

  updateName(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  render() {
    return (
      <Popup size='small' open={this.state.isVisible}
        onOpen={() => this.setState({ isVisible: true, name: "" })}
        onClose={() => { this.setState({ isVisible: false }); }}
        trigger={this.props.trigger} on='click'>
        <Input value={this.state.name} onChange={this.updateName} placeholder='Category Name' action={{
          onClick: this.createCategory,
          icon: 'plus'
        }} />
      </Popup>
    );
  };

  static propTypes = {
    // An element that will cause this popup to appear.
    // This will be passed to the Semantic UI `Popup` component's trigger prop.
    trigger: PropTypes.node.isRequired,

    // Redux's dispatch function.
    dispatch: PropTypes.func.isRequired
  };
};

const wrapped = connect()(NewCategoryPopup);
export { wrapped as NewCategoryPopup };

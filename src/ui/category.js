import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Label } from 'semantic-ui-react';

// TODO: use category IDs as the internal menu item names for Semantic UI
export class Category extends Component {
  render() {
    return (
      <Menu.Item name={this.props.name}>
        <Label>{this.props.quantity}</Label> {this.props.name}
      </Menu.Item>
    );
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  };
};

class Container extends Component {
  constructor(props) {
    super(props);

    let categoriesToRender = [];
    for (var key in props.categories) {
      if (props.categories.hasOwnProperty(key)) {
        var category = props.categories[key];
        categoriesToRender.push(<Category name={category.name} quantity={0} />);
      }
    }

    this.state = {
      categories: categoriesToRender
    };
  };

  render() {
    return (
      <div id="password-categories">
        {this.state.categories}
      </div>
    );
  };

  static propTypes = {
    categories: PropTypes.array.isRequired
  };
};

const wrappedContainer = connect(
  state => ({ categories: state.container.categories })
)(Container);
export { wrappedContainer as CategoryContainer };

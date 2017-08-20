import React, { Component } from 'react';
import { Sidebar, Menu, Segment } from 'semantic-ui-react';

import { PasswordEntryContainer } from 'ui/component/entry';
import { CategoryContainer } from 'ui/component/category';
import { ActionContainer } from 'ui/component/menu';

export class PasswordManager extends Component {
  render() {
    return (
      <div>
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
import React from 'react';
import ReactDOM from 'react-dom';
import { PasswordEntry } from './entry';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PasswordEntry login='test' name='test' />, div);
});


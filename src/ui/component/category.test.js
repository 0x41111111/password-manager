import React from 'react';
import ReactDOM from 'react-dom';
import { Category } from './category';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Category name='test' quantity={0} />, div);
});


import React from 'react';
import ReactDOM from 'react-dom';
import DarkModeSwitch from './DarkModeSwitch';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DarkModeSwitch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
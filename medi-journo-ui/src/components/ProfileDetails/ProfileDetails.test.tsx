import React from 'react';
import ReactDOM from 'react-dom';
import ProfileDetails from './ProfileDetails';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfileDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import SupportPage from './SupportPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SupportPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import SavedMedidationSessions from './SavedMedidationSessions';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SavedMedidationSessions />, div);
  ReactDOM.unmountComponentAtNode(div);
});
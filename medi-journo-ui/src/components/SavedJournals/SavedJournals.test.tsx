import React from 'react';
import ReactDOM from 'react-dom';
import SavedJournals from './SavedJournals';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SavedJournals />, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import JournalList from './JournalList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JournalList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
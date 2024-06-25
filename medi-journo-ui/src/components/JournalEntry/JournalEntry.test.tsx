import React from 'react';
import ReactDOM from 'react-dom';
import JournalEntry from './JournalEntry';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JournalEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
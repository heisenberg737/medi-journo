import React from 'react';
import ReactDOM from 'react-dom';
import JournalCard from './JournalCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JournalCard card={undefined} key={undefined} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
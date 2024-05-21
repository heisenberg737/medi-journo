import React from 'react';
import ReactDOM from 'react-dom';
import MeditationSession from './MeditationSession';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MeditationSession />, div);
  ReactDOM.unmountComponentAtNode(div);
});
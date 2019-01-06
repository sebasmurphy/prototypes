import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import * as Utility from './clock_utiliy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clock />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should calculate the hypotenus given angle and x coordiante', () => {
  const randian = Math.PI;
  const angle1 = 0;
  const angle2 = radian;
});

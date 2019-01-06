import React, { Component } from 'react';
// import Header from './header';
import Clock from './clock';
import './app.css';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="app">
        <Clock />
      </div>
    );
  }
}

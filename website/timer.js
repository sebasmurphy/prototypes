import React, { Component, Fragment } from 'react';
import * as time from './time';
import './timer.css';

const moment = require('moment');

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.timer = time.reset(moment());
    this.state = {
      running: false,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.decrementTime = this.decrementTime.bind(this);
    this.interval = setInterval(this.decrementTime, 1000);
    this.handleChange = this.handleChange.bind(this);
    this.handleRun = this.handleRun.bind(this);
  }
  decrementTime() {
    const { running } = this.state;
    const { timer } = this;
    if (running) {
      this.timer = time.decrement(timer);
      const hours = timer.hours();
      const minutes = timer.minutes();
      const seconds = timer.seconds();
      this.setState({
        hours,
        minutes,
        seconds
      });
    }
  }
  handleChange(event) {
    const value = parseInt(event.target.value);
    const name = event.target.name;
    let set = false;
    if (name === 'hours') {
      if (value < 24 && value >= 0) {
        set = true;
      }
    } else if (name === 'minutes' || name === 'seconds') {
      if (value < 60 && value >= 0) {
        set = true;
      }
    }
    if (set) {
      const state = {};
      state[name] = value;
      this.setState(state);
      this.timer.set(state);
    }
  }
  handleRun(event) {
    let { running } = this.state;
    this.setState({
      running: !running
    });
  }
  render() {
    const { hours, minutes, seconds, running } = this.state;
    return (
      <div>
        <div>
          hours:{' '}
          <input
            type="number"
            name="hours"
            value={hours}
            disabled={running}
            onChange={this.handleChange}
          />
        </div>
        <div>
          minutes:{' '}
          <input
            type="number"
            name="minutes"
            value={minutes}
            disabled={running}
            onChange={this.handleChange}
          />
        </div>
        <div>
          seconds:{' '}
          <input
            type="number"
            name="seconds"
            value={seconds}
            disabled={running}
            onChange={this.handleChange}
          />
        </div>
        <div onClick={this.handleRun}>{running ? 'running' : 'paused'}</div>
      </div>
    );
  }
}

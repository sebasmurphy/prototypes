import React, { Component } from 'react';
import './clock.css';

const generateSVG = (center, length, slices) => {
  const { center_x, center_y } = center;
  const degree = (2 * Math.PI) / slices;
  let lines = [];
  const hyp = length;
  for (let i = 0; i < slices; i++) {
    const theta = i * degree;
    const opp = Math.sin(theta) * hyp + center_y;
    const adj = Math.cos(theta) * hyp + center_x;
    lines = [...lines, { idx: i, x: adj, y: opp, theta }];
  }
  return lines;
};

const getAttributes = (target, attributes) => {
  return attributes.reduce((obj, attr) => {
    const value = target.getAttribute(attr);
    obj[attr] = value;
    return obj;
  }, {});
};

const sliceIndices = (key, arr) => {
  key = parseInt(key);
  if (key === 0) {
    return [...arr.slice(arr.length - 2, arr.length), ...arr.slice(0, 3)];
  }
  if (key === 1) {
    return [...arr.slice(arr.length - 1, arr.length), ...arr.slice(0, 4)];
  }
  if (key === arr.length - 1) {
    return [...arr.slice(arr.length - 3, arr.length), ...arr.slice(0, 2)];
  }
  if (key === arr.length - 2) {
    return [...arr.slice(arr.length - 4, arr.length), ...arr.slice(0, 1)];
  }
  return arr.slice(key - 2, key + 3);
};

const setAttributes = (target, attributes) => {
  const keys = Object.keys(attributes);
  keys.forEach(key => {
    target.setAttribute(key, attributes[key]);
  });
};

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.length = 80;
    this.center = { center_x: 124, center_y: 124 };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.length = 80;
    this.state = {
      points: generateSVG(this.center, 80, 60)
    };
  }
  mouseEnter(event) {
    const { center_x, center_y } = this.center;
    const index = event.target.getAttribute('data-idx');
    let { points } = this.state;
    let lines = sliceIndices(index, points);
    points.forEach((point, idx) => {
      const x = Math.cos(point.theta) * this.length + center_x;
      const y = Math.sin(point.theta) * this.length + center_y;
      point['x'] = x;
      point['y'] = y;
    });
    lines.forEach((line, idx) => {
      let new_length;
      if (idx === 0 || idx === 4) {
        new_length = this.length + 3;
      }
      if (idx === 1 || idx === 3) {
        new_length = this.length + 6;
      }
      if (idx === 2) {
        new_length = this.length + 9;
      }
      const x = Math.cos(line.theta) * new_length + center_x;
      const y = Math.sin(line.theta) * new_length + center_y;
      line['x'] = x;
      line['y'] = y;
    });
    this.setState({
      points
    });
  }

  mouseLeave(event) {}

  render() {
    let { points } = this.state;
    const { center_x, center_y } = this.center;
    points = points.map((point, idx) => {
      return (
        <line
          x1={center_x}
          y1={center_y}
          x2={point.x}
          y2={point.y}
          data-idx={idx}
          key={idx}
          stroke="black"
          strokeWidth="2.5"
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        />
      );
    });
    return (
      <div className="clock">
        <svg viewBox="0 0 250 250">{points}</svg>
      </div>
    );
  }
}

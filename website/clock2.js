import React, { Component } from 'react';
import * as utils from './utils';
import './clock.css';

const getAttributes = (target, attributes) => {
  return attributes.reduce((obj, attr) => {
    const value = target.getAttribute(attr);
    obj[attr] = value;
    return obj;
  }, {});
};

//give an x and y position in a html elemet
//calculate the quadrant on the euclidean that the angle lies in.
const findQuadrant = (center, x, y) => {
  const { center_x, center_y } = center;
  if (x >= center_x && y < center_y) {
    // quadrant 1
    const new_x = x - center_x;
    const new_y = center_y - y;
    return [new_x, new_y];
  }
  if (x < center_x && y < center_y) {
    const new_x = -1 * (center_x - x);
    const new_y = center_y - y;
    return [new_x, new_y];
  }
  if (x < center_x && y >= center_y) {
    const new_x = -1 * (center_x - x);
    const new_y = -1 * (y - center_y);
    return [new_x, new_y];
    // quadrant 3
  }
  // quadrant 4
  // x >= center_x && y >= center_y
  const new_x = x - center_x;
  const new_y = -1 * (y - center_y);
  return [new_x, new_y];
};

const findClosest = (theta, arr) => {
  let diff = 1000;
  let index;
  arr.forEach((point, idx) => {
    const new_diff = Math.abs(theta - point.theta);
    if (new_diff < diff) {
      diff = new_diff;
      index = idx;
    }
  });
  return index;
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
    this.radius = 70;
    this.tickLength = 15;
    this.slices = 60;
    this.center = { center_x: 124, center_y: 124 };
    this.state = {
      rays: utils.genRays(
        this.center,
        this.radius,
        this.tickLength,
        this.slices
      )
    };
    // this.length = 80;
    // this.mouse_clicked = false;
    // this.center = { center_x: 124, center_y: 124 };
    // this.mouseEnter = this.mouseEnter.bind(this);
    // this.mouseLeave = this.mouseLeave.bind(this);
    // this.mouseDown = this.mouseDown.bind(this);
    // this.mouseMove = this.mouseMove.bind(this);
    // this.mouseUp = this.mouseUp.bind(this);
    // this.length = 80;
    // this.state = {
    //   points: generateSVG(this.center, 80, 60)
    // };
  }

  mouseMove(event) {
    if (this.mouse_clicked) {
      let { points } = this.state;
      const mouse_x = event.clientX;
      const mouse_y = event.clientY;
      const { center_x, center_y } = this.center;
      const [adj_x, adj_y] = findQuadrant(this.center, mouse_x, mouse_y);
      let theta = Math.atan2(adj_y, adj_x);
      theta = (theta + Math.PI * 2) % (Math.PI * 2);
      theta = 2 * Math.PI - theta;
      const index = findClosest(theta, points);
      points[index]['stroke'] = 'red';
      this.setState({
        points
      });
      // if (theta < 0) {
      //   theta = theta + 2 * Math.PI;
      // }
    }
  }

  mouseDown(event) {
    this.mouse_clicked = true;
  }

  mouseUp(event) {
    this.mouse_clicked = false;
  }

  mouseEnter(event) {
    const { center_x, center_y } = this.center;
    const index = event.target.getAttribute('data-idx');
    let { points } = this.state;
    let lines = sliceIndices(index, points);
    points.forEach((point, idx) => {
      const x = Math.cos(point.theta) * this.length + center_x;
      const y = Math.sin(point.theta) * this.length + center_y;
      point['x2'] = x;
      point['y2'] = y;
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
      line['x2'] = x;
      line['y2'] = y;
    });
    this.setState({
      points
    });
  }

  mouseLeave(event) {}

  render() {
    let { rays } = this.state;
    rays = rays.map((ray, idx) => {
      return (
        <line
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          strokeOpacity=".5"
          data-idx={idx}
          key={idx}
          stroke={ray.marked ? 'red' : 'black'}
          strokeWidth="2.5"
          // onMouseEnter={this.mouseEnter}
          // onMouseLeave={this.mouseLeave}
        />
      );
    });
    return (
      <div
        className="clock"
        // onMouseDown={this.mouseDown}
        // onMouseMove={this.mouseMove}
        // onMouseUp={this.mouseUp}
      >
        <svg viewBox="0 0 250 250">{rays}</svg>
      </div>
    );
  }
}

import React, { Component, Fragment } from 'react';
import * as utils from './utils';
import './clock.css';

import Timer from './timer';
//give an x and y position in a html elemet
//calculate the quadrant on the euclidean that the angle lies in.

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
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  mouseMove(event) {
    const position = { x: event.clientX, y: event.clientY };
    const { center } = this;
    const { theta } = utils.offsetMouse(position, center);
    let { rays } = this.state;
    rays = utils.markAngles(theta, rays);
    const idx = utils.lastIndex(theta, rays);
    const ray = rays[idx];
    const { x1, x2, y1, y2 } = utils.lengthen(
      ray['theta'],
      this.center,
      this.radius,
      this.tickLength
    );
    rays[idx]['x1'] = x1;
    rays[idx]['x2'] = x2;
    rays[idx]['y1'] = y1;
    rays[idx]['y2'] = y2;
    this.setState({
      rays
    });
    // console.log(`offsetcoord ${offsetCoords['theta']}`);

    // if (this.mouse_clicked) {
    //   let { points } = this.state;
    //   const mouse_x = event.clientX;
    //   const mouse_y = event.clientY;
    //   const { center_x, center_y } = this.center;
    //   const [adj_x, adj_y] = findQuadrant(this.center, mouse_x, mouse_y);
    //   let theta = Math.atan2(adj_y, adj_x);
    //   theta = (theta + Math.PI * 2) % (Math.PI * 2);
    //   theta = 2 * Math.PI - theta;
    //   const index = findClosest(theta, points);
    //   points[index]['stroke'] = 'red';
    //   this.setState({
    //     points
    //   });
    // }
  }

  mouseDown(event) {
    console.log('mouse down');
    // this.mouse_clicked = true;
  }

  mouseUp(event) {
    console.log('mouse up');
    // this.mouse_clicked = false;
  }

  mouseEnter(event) {
    // const theta = event.target.getAttribute('theta');
    // console.log(theta);
    // const { center_x, center_y } = this.center;
    // const index = event.target.getAttribute('data-idx');
    // let { points } = this.state;
    // let lines = sliceIndices(index, points);
    // points.forEach((point, idx) => {
    //   const x = Math.cos(point.theta) * this.length + center_x;
    //   const y = Math.sin(point.theta) * this.length + center_y;
    //   point['x2'] = x;
    //   point['y2'] = y;
    // });
    // lines.forEach((line, idx) => {
    //   let new_length;
    //   if (idx === 0 || idx === 4) {
    //     new_length = this.length + 3;
    //   }
    //   if (idx === 1 || idx === 3) {
    //     new_length = this.length + 6;
    //   }
    //   if (idx === 2) {
    //     new_length = this.length + 9;
    //   }
    //   const x = Math.cos(line.theta) * new_length + center_x;
    //   const y = Math.sin(line.theta) * new_length + center_y;
    //   line['x2'] = x;
    //   line['y2'] = y;
    // });
    // this.setState({
    //   points
    // });
  }

  mouseLeave(event) {
    console.log('mouse leave');
  }

  render() {
    let { rays } = this.state;
    rays = rays.map((ray, idx) => {
      return (
        <line
          onMouseEnter={this.mouseEnter}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          theta={ray.theta}
          strokeOpacity=".5"
          data-idx={idx}
          key={idx}
          stroke={ray.marked ? 'red' : 'black'}
          strokeWidth="2.5"
        />
      );
    });
    return (
      <Fragment>
        <div
          className="clock"
          // onMouseEnter={this.mouseEnter}
          // onMouseLeave={this.mouseLeave}
          // onMouseDown={this.mouseDown}
          onMouseMove={this.mouseMove}
        >
          <svg viewBox="0 0 250 250">{rays}</svg>
        </div>
        <Timer />
      </Fragment>
    );
  }
}

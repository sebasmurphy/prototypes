import React, { Component, Fragment } from 'react';
import { css } from '@emotion/core';
import background from './background.png';
import foreground from './foreground.png';

const innerWrapperCSS = css`
  overflow: hidden;
  width: 800px;
  height: 350px;
  position: relative;
`;

const wrapperCSS = css`
  margin-top: 50px;
  width: 800px;
  height: 350px;
  border: 1px solid black;
  margin: 0 auto;
`;
const backgroundCSS = css`
  position: absolute;
`;

const foregroundCSS = css`
  position: absolute;
  margin-top: 150px;
`;

class Parallax extends Component {
  constructor(props) {
    super(props);
    this.position = 0;
    this.mouseMove = this.mouseMove.bind(this);
  }
  mouseMove = event => {
    const clientX = event.clientX;
    const offsetX = event.currentTarget.offsetLeft;
    //center of the dom node
    const centerX = event.currentTarget.width / 2;
    //how far away in the x direction is the cursor from the center
    const leftPosition = clientX - offsetX;
    //distance from center -> positive if moving right, negative if moving left
    const distanceCenter = centerX - leftPosition;
    let margin = distanceCenter; //do some computation here

    // const newPostion = this.position - leftPosition;
    // this.position = leftPostion;
    // console.log(event.currentTarget);
    // console.log(event.clientX);
    // console.log(event.target.offsetLeft);
  };
  render() {
    return (
      <Fragment>
        <div css={wrapperCSS} onMouseMove={this.mouseMove}>
          <div css={innerWrapperCSS}>
            <img src={background} css={backgroundCSS} />
            <img src={foreground} css={foregroundCSS} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Parallax;

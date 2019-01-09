import React, { Component, Fragment } from 'react';
// import './header.css';

class Link extends Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }
  clicked(address) {
    // console.log(address);
  }
  render() {
    const text = this.props.text;
    const address = this.props.address;
    return <div onClick={this.clicked({ address })}>{text}</div>;
  }
}

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data;
    return (
      <div className="post">
        <div className="post.header" />
        <div className="post.body" />
      </div>
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const posts = this.props.posts.map(data => {
      return <Post data={data} />;
    });
    return <div className="main">{posts}</div>;
  }
}

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="header">
          Sebastian Murphy
          <div className="links">
            <Link text="Home" address="/home" />
            <Link text="Blog" address="/blog" />
            <Link text="Archive" address="/archive" />
            <Link text="Projects" address="/projects" />
            <Link text="Github" address="/github" />
          </div>
        </div>
        <Main posts={[]} />
      </div>
    );
  }
}

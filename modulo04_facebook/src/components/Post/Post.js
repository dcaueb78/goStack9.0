import React, { Component } from "react";

import "./Post.css";

class Post extends Component {
  render() {
    return (
      <>
        <div className="post">
          <img src={this.props.data.author.avatar} />
          <div className="author">
            <h1 className="autor-name">{this.props.data.author.name}</h1>
            <h1 className="post-date">{this.props.data.date}</h1>
          </div>
          <hr/>
          <div>
            Coments
          </div>
        </div>
      </>
    );
  }
}

export default Post;

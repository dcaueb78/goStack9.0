import React, { Component } from "react";

import "./Post.css";

class Post extends Component {
  render() {
    return (
      <>
        <div className="post">
          <div className="author">
            <div>
              <img src={this.props.data.author.avatar} />
            </div>
            <div className="author-infos">
              <b className="autor-name">{this.props.data.author.name}</b>
              <p className="post-date">{this.props.data.date}</p>
            </div>
          </div>
          <div className="post-content">
            <p>{this.props.data.content}</p>
          </div>
          <div className="divider"></div>
          <div>
            Coments
          </div>
        </div>
      </>
    );
  }
}

export default Post;

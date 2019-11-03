import React, { Component } from "react";

import "./Post.css";
import Comment from '../Comments/Comment';

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
          {this.props.data.comments.map(comment => (
            <Comment key={comment.id} comment={comment}/>
          ))}
          
        </div>
      </>
    );
  }
}

export default Post;

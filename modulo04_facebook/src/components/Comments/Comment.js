import React, { Component } from "react";
import "./Comment.css";

class Comment extends Component {
  render() {
    return (
      <>
        <div className="comment">
          <img src={this.props.comment.author.avatar} alt="Comment's avatar" />
          <div className="comment-content">
            <p><b>{this.props.comment.author.name}</b>{this.props.comment.content}</p>
          </div>
        </div>
      </>
    );
  }
}

export default Comment;

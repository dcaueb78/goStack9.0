import React, { Component } from "react";
import Profile from "../../assets/profile.jpeg";

import "./Post.css";

class Post extends Component {
  render() {
    return (
      <>
        <div className="post">
          
          <h1>{this.props.data.author.name}</h1>
        </div>
      </>
    );
  }
}

export default Post;

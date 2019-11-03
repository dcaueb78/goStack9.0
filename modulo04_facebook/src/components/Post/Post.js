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
              <bold className="autor-name">{this.props.data.author.name}</bold>
              <p className="post-date">{this.props.data.date}</p>
            </div>
          </div>
          {/* <hr/>
          <div>
            Coments
          </div> */}
        </div>
      </>
    );
  }
}

export default Post;

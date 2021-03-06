import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.loadedPost ||
        (this.props.id !== this.state.loadedPost.id && this.state.loadedPost)
      ) {
        axios
          .get(this.props.url + "/posts/" + this.props.id)
          .then((response) => {
            this.setState({
              loadedPost: response.data,
            });
          });
      }
    }
  }
  render() {
    let post = <p>Please select a Post!</p>;
    if (this.props.id) {
      post = <p>Loading...</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete">Delete</button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;

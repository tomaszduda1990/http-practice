import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";
class Blog extends Component {
  state = {
    posts: [],
    url: "https://jsonplaceholder.typicode.com",
    selectedId: null,
  };
  componentDidMount() {
    axios
      .get(this.state.url + "/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post, i) => {
          return {
            ...post,
            author: "Tomek " + (i + 1),
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  postClicked = (id) => {
    this.setState({ selectedId: id });
  };
  render() {
    const posts = this.state.posts.map((post) => (
      <Post
        key={post.id}
        title={post.title}
        author={post.author}
        clicked={() => this.postClicked(post.id)}
      />
    ));
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost url={this.state.url} id={this.state.selectedId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;

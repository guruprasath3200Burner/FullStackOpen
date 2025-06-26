import Togglable from "./Toggleable";
import React, { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, onDelete, onLike }) => {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateBlog = () => {
    onLike(blog)
      .then((response) => {
        if (response.status == "success") {
          setLikes(likes + 1);
        } else {
          console.log("error", response);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      onDelete(blog);
    } else {
      console.log("Delete cancelled");
    }
  };

  return (
    <div style={blogStyle}>
      title: {blog.title}
      <br />
      author: {blog.author}
      <br />
      <Togglable buttonLabel="view">
        url: {blog.url}
        <br />
        likes: {likes} <button onClick={updateBlog}>like</button>
        <br />
        <button onClick={handleDelete}>delete</button>
        <br />
      </Togglable>
    </div>
  );
};

export default Blog;

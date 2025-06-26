import React from "react";
const BlogForm = ({ createBlog }) => {
  return (
    <form onSubmit={createBlog}>
      <div>
        title
        <input id="blog-title" type="text" name="title" required />
      </div>
      <div>
        author
        <input id="blog-author" type="text" name="author" required />
      </div>
      <div>
        url
        <input id="blog-url" type="text" name="url" required />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;

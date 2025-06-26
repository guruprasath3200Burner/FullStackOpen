import React from "react";
const BlogForm = ({ createBlog }) => {
  return (
    <form onSubmit={createBlog}>
      <div>
        title
        <input type="text" name="title" required />
      </div>
      <div>
        author
        <input type="text" name="author" required />
      </div>
      <div>
        url
        <input type="text" name="url" required />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;

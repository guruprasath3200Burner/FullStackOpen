import Togglable from "./Toggleable";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      title: {blog.title}
      author: {blog.author}
      <br />
      <Togglable buttonLabel="view">
        url: {blog.url}
        <br />
        likes: {blog.likes} <button>like</button>
        <br />
      </Togglable>
    </div>
  );
};

export default Blog;

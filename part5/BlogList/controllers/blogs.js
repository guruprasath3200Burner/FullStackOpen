const blogRouter = require("express").Router();
const { request } = require("http");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(request.user.id);

  if (!user) {
    return response.status(400).json({ error: "User not found" });
  }

  if (!title || !url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }
  const blog = new Blog({
    title,
    author: author || "Unknown",
    url,
    likes: likes ?? 0,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});
blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.user && blog.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "You do not have permission to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);

    user.blogs = user.blogs.filter(
      (blogId) => blogId.toString() !== id.toString()
    );
    await user.save();

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { title, url, author, likes } = request.body;
  const updatedBlog = {
    title,
    url,
    author,
    likes,
  };
  try {
    const result = await Blog.findByIdAndUpdate(id, updatedBlog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (result) {
      response.json(result);
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    response.status(400).json({ error: "Invalid data" });
  }
});

module.exports = blogRouter;

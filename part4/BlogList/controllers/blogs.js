const blogRouter = require("express").Router();
const { request } = require("http");
const Blog = require("../models/blog");
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
  const fakeId = "685bcb6450206165fb1115b2";
  const user = await User.findById(fakeId);
  if (!user) {
    return response.status(400).json({ error: "User not found" });
  } else {
    console.log("User found:", user.username);
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

blogRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const result = await Blog.findByIdAndDelete(id);
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Database error" });
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

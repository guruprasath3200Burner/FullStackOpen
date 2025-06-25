const blogRouter = require("express").Router();
const { request } = require("http");
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", async (request, response) => {
  const { title, url, author = "Unknown", likes = 0 } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(500).json({ error: "Database error" });
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

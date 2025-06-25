const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const starterData = [
  {
    title: "Generic Blog Title 1",
    author: "Jerome K Jerome",
    url: "http://www.google.com",
    likes: 1,
  },
  {
    title: "Generic Blog Title 2",
    author: "Alice Author",
    url: "http://www.example.com",
    likes: 10,
  },
  {
    title: "Tech Blog 1",
    author: "Tech Guru",
    url: "http://www.techblog.com",
    likes: 15,
  },
  {
    title: "Food Blog",
    author: "Food Lover",
    url: "http://www.foodblog.com",
    likes: 8,
  },
  {
    title: "Travel Diary",
    author: "Wanderlust Explorer",
    url: "http://www.travelblog.com",
    likes: 20,
  },
  {
    title: "Sports News",
    author: "Sports Fanatic",
    url: "http://www.sportsblog.com",
    likes: 12,
  },
  {
    title: "Fashion Trends",
    author: "Fashionista",
    url: "http://www.fashionblog.com",
    likes: 18,
  },
  {
    title: "Music Vibes",
    author: "Music Enthusiast",
    url: "http://www.musicblog.com",
    likes: 25,
  },
  {
    title: "Movie Reviews",
    author: "Movie Buff",
    url: "http://www.movieblog.com",
    likes: 7,
  },
  {
    title: "Science Wonders",
    author: "Science Geek",
    url: "http://www.scienceblog.com",
    likes: 14,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(starterData[0]);
  await blogObject.save();
  blogObject = new Blog(starterData[1]);
  await blogObject.save();
});

test("blogs are returned as json and correct amount", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, 2);
});

test("4.9 Unique id property is id", async () => {
  const response = await api.get("/api/blogs");
  assert.notStrictEqual(response.body[0].id, undefined);
});

test("4.10 HTTP POST checking", async () => {
  const tempnewBlog = {
    title: "New Blog Post",
    author: "New Author",
    url: "http://www.newblog.com",
    likes: 5,
  };
  const blogsAtStart = await api.get("/api/blogs");
  const initialLength = blogsAtStart.body.length;

  await api
    .post("/api/blogs")
    .send(tempnewBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await api.get("/api/blogs");
  assert.strictEqual(blogsAtEnd.body.length, initialLength + 1);
});

test("4.11 Likes property check", async () => {
  const tempnewBlog = {
    title: "New Blog 99",
    author: "New Auth",
    url: "http://www.newblog.com",
  };
  await api
    .post("/api/blogs")
    .send(tempnewBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await api.get("/api/blogs");
  const newBlog = blogsAtEnd.body.find((blog) => blog.title === "New Blog 99");
  assert.ok(newBlog.hasOwnProperty("likes"));
  assert.strictEqual(newBlog.likes, 0);
});

describe("4.12 blog list validation", () => {
  test("creating a blog without title returns 400 Bad Request", async () => {
    const blogWithoutTitle = {
      author: "Author Without Title",
      url: "http://www.notitle.com",
      likes: 3,
    };

    await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
  });

  test("creating a blog without url returns 400 Bad Request", async () => {
    const blogWithoutUrl = {
      title: "Blog Without URL",
      author: "Author Without URL",
      likes: 2,
    };

    await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});

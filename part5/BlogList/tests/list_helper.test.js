const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
});

describe("favorite blog", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "as8df8a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17f8dfsa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
  ];
  test("when list has multiple blogs, returns the one with most likes", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    const expected = {
      _id: "as8df8a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };
    assert.deepStrictEqual(result, expected);
  });
  test("when list is empty, returns null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });
});

describe("most blogs", () => {
  const listWithMultipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("when list is empty, returns null", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog, returns that author", () => {
    const oneBlog = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://teaching/reader/Dijkstra68.pdf",
        likes: 5,
      },
    ];
    const result = listHelper.mostBlogs(oneBlog);
    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };
    assert.deepStrictEqual(result, expected);
  });

  test("when list has multiple blogs, returns author with most blogs", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    const expected = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    assert.deepStrictEqual(result, expected);
  });
});

describe("most likes", () => {
  const listWithMultipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("when list is empty, returns null", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog, returns that author", () => {
    const oneBlog = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://teaching/reader/Dijkstra68.pdf",
        likes: 5,
      },
    ];
    const result = listHelper.mostLikes(oneBlog);
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    assert.deepStrictEqual(result, expected);
  });

  test("when list has multiple blogs, returns author with most total likes", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    assert.deepStrictEqual(result, expected);
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes = 0 }) => {
  cy.request({
    url: "http://localhost:5173/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("login-cred")).token
      }`,
    },
  });
});

Cypress.Commands.add("createUser", ({ username, password }) => {
  cy.request({
    url: "http://localhost:5173/api/users",
    method: "POST",
    body: { username, password },
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("login-cred", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

describe("Blog app", function () {
  const user = {
    username: "guru",
    password: "3200",
  };

  before(function () {
    cy.visit("http://localhost:5173");
    cy.request("POST", "http://localhost:5173/api/testing/reset");
    cy.request("POST", "http://localhost:5173/api/users", user);
  });
  it("Checking Setup", function () {
    cy.request("GET", "http://localhost:5173/api/users").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(1);
      expect(response.body[0].username).to.eq(user.username);
    });
  });

  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("5.17 Displays Login Button", function () {
    cy.contains("log in").click();
    cy.get("#username");
    cy.get("#password");
  });

  describe("5.18 Login Functionality ", () => {
    it("Successful Login Case", function () {
      cy.contains("log in").click();
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.contains("login").click();
      cy.contains(`${user.username} is logged in`);
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("WrongUser");
      cy.get("#password").type(user.password);
      cy.contains("login").click();
      cy.contains(`${user.username} is logged in`).should("not.exist");
      cy.contains("Wrong username or password");
    });

    after(function () {
      cy.request("POST", "http://localhost:5173/api/testing/reset");
    });
  });

  describe("5.19 Logged in user can create a new blog", function () {
    before(function () {
      cy.request("POST", "http://localhost:5173/api/testing/reset");
      cy.request("POST", "http://localhost:5173/api/users", user);
      // cy.login(user);
      cy.visit("http://localhost:5173");
    });

    beforeEach(function () {
      cy.contains("log in").click();
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.contains("login").click();
    });

    it("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#blog-title").type("test blog");
      cy.get("#blog-author").type("Guru");
      cy.get("#blog-url").type("www.test.com");
      cy.get("#create-button").click();
      cy.contains("test blog");
    });
  });

  describe("5.20 Users can like a blog", () => {
    before(function () {
      cy.request("POST", "http://localhost:5173/api/testing/reset");
      cy.request("POST", "http://localhost:5173/api/users", user);
      cy.login(user);
      cy.visit("http://localhost:5173");
    });
    const SampleBlog = {
      title: `Sample Blog ${Math.random()}`,
      author: "Guru",
      url: "www.sample.com",
      likes: 0,
    };

    it("a blog can be liked", function () {
      cy.createBlog(SampleBlog);
      cy.visit("http://localhost:5173");
      cy.contains(SampleBlog.title);
      cy.contains("view").click();
      // cy.get("#like-button").click();
      cy.contains("like").click();
      cy.contains(`likes: ${SampleBlog.likes + 1}`);
    });
  });

  describe("5.21 Users can delete a blog", () => {
    before(function () {
      cy.request("POST", "http://localhost:5173/api/testing/reset");
      cy.request("POST", "http://localhost:5173/api/users", user);
      cy.login(user);
      cy.visit("http://localhost:5173");
    });
    const SampleBlog = {
      title: `Sample Blog ${Math.random()}`,
      author: "Guru",
      url: "www.sample.com",
      likes: 0,
    };

    it("a blog can be deleted", function () {
      cy.createBlog(SampleBlog);
      cy.visit("http://localhost:5173");
      cy.contains(SampleBlog.title);
      cy.contains("view").click();
      cy.contains("delete").click();
      cy.visit("http://localhost:5173");
      cy.contains(SampleBlog.title).should("not.exist");
    });
  });

  describe("5.22 Only users can delete a blog", () => {
    const anotherUser = {
      username: "anotherUser",
      password: "1234",
    };
    before(function () {
      cy.request("POST", "http://localhost:5173/api/testing/reset");
      cy.request("POST", "http://localhost:5173/api/users", user);
      cy.request("POST", "http://localhost:5173/api/users", anotherUser);
      cy.login(user);
      cy.visit("http://localhost:5173");
    });
    const SampleBlog = {
      title: `Sample Blog ${Math.random()}`,
      author: "Guru",
      url: "www.sample.com",
      likes: 0,
    };
    it("check for existance of blog", function () {
      cy.createBlog(SampleBlog);
      cy.visit("http://localhost:5173");
      cy.contains(SampleBlog.title);
      cy.contains("Logout").click();
    });

    it("Login via new account", () => {
      cy.login(anotherUser);
      cy.visit("http://localhost:5173");
      cy.contains(SampleBlog.title);
      // cy.contains("log in").click();
      // cy.get("#username").type(anotherUser.username);
      // cy.get("#password").type(anotherUser.password);
      cy.contains("view").click();
      cy.contains("delete").click();
    });
  });
});

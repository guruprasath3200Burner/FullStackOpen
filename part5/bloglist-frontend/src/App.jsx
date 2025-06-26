import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const defaultErrorMessage = {
    message: null,
    type: "error",
  };

  const returnErrorMessage = (message, type) => ({
    message,
    type,
  });
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("login-cred", JSON.stringify(user));
      blogService.setToken(user.token);
      setErrorMessage(returnErrorMessage("Logged in successfully", "success"));
    } catch (exception) {
      setErrorMessage(
        returnErrorMessage("Wrong username or password", "error")
      );
      setTimeout(() => {
        setErrorMessage(defaultErrorMessage);
      }, 5000);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("login-cred");
    setErrorMessage(returnErrorMessage("Logged out successfully", "success"));
    setTimeout(() => {
      setErrorMessage(defaultErrorMessage);
    }, 5000);
    blogService.setToken(null);
    window.location.reload();
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("login-cred");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (event) => {
    event.preventDefault();
    const target = event.target;

    const title = target.title.value;
    const author = target.author.value;
    const url = target.url.value;

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(newBlog));
      setErrorMessage(
        returnErrorMessage(
          `A new blog "${title}" by ${author} added`,
          "success"
        )
      );
      setTimeout(() => setErrorMessage(defaultErrorMessage), 5000);
      target.reset();
    } catch (error) {
      setErrorMessage(returnErrorMessage("Failed to create blog", "error"));
      setTimeout(() => setErrorMessage(defaultErrorMessage), 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div>
      <Notification message={errorMessage.message} type={errorMessage.type} />

      {user === null && loginForm()}

      {user && (
        <div>
          <h2>Blogs</h2>
          <br />
          <p>
            {user.username} is logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <br />
          <h3>create new</h3>
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

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

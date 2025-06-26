import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/NewBlog";
import login from "./services/login";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const defaultErrorMessage = {
    message: null,
    type: "error",
  };
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const returnErrorMessage = (message, type) => ({
    message,
    type,
  });

  const handleBlogLike = async (blog) => {
    const Blogid = blog.id;
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    try {
      const response = await blogService.update(Blogid, updatedBlog);
      return { status: "success", data: response };
    } catch (error) {
      console.log("error", error);
      throw error; // re-throw the error to handle it in the calling function
    }
  };

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

  const handleBlogDelete = (blog) => {
    blogService
      .deleteBlog(blog.id)
      .then((response) => {
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        setErrorMessage(
          returnErrorMessage(
            `Blog "${blog.title}" by ${blog.author} deleted successfully`,
            "success"
          )
        );
        setTimeout(() => {
          setErrorMessage(defaultErrorMessage);
        }, 5000);
      })
      .catch((error) => {
        console.log("error", error);
        setErrorMessage(returnErrorMessage("Failed to delete blog", "error"));
        setTimeout(() => {
          setErrorMessage(defaultErrorMessage);
        }, 5000);
      });
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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

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
          <Toggleable buttonLabel="new blog">
            <BlogForm createBlog={createBlog} />
          </Toggleable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                onDelete={handleBlogDelete}
                onLike={handleBlogLike}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;

import PropTypes from "prop-types";
import React from "react";
const LoginForm = React.forwardRef(
  (
    {
      handleSubmit,
      handleUsernameChange,
      handlePasswordChange,
      username,
      password,
    },
    ref
  ) => {
    return (
      <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
);
LoginForm.displayName = "LoginForm";
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;

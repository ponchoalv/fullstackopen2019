import React from 'react';

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  loginHandle
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandle}>
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
    </div>
  );
};

const Logout = ({ logoutHandler }) => (
  <button onClick={logoutHandler}>logout</button>
);

export default { Login, Logout };

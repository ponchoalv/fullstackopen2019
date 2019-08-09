import React from 'react'

const Login = ({
  username,
  password,
  loginHandle
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandle}>
        <div>
          username
          <input
            {...username}
          />
        </div>
        <div>
          password
          <input
            {...password}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const Logout = ({ logoutHandler }) => (
  <button onClick={logoutHandler}>logout</button>
)

export default { Login, Logout }

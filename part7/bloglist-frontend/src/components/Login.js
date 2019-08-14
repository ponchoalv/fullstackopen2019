import React from "react";
import { loginUser } from "../reducers/userReducer";
import { connect } from "react-redux";


const Login = props => {
  const loginHandle = event => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    event.target.username.value = "";
    event.target.password.value = "";
    props.login(username, password);
    
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandle}>
        <div>
          username
          <input type="text" name="username" />
        </div>
        <div>
          password
          <input type="password" name="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  login: loginUser
};

export default connect(
  null,
  mapDispatchToProps
)(Login);

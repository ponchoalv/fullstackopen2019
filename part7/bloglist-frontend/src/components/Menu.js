import React from "react";
import { connect } from "react-redux";
import { removeUser } from "../reducers/userReducer";
import { Link } from "react-router-dom";

const Menu = props => {
  const padding = {
    paddingRight: 5
  };

  const menuStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={menuStyle}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {props.user.token === null ? (
        <Link to="login" style={padding}>
          <button>Login</button>
        </Link>
      ) : (
        <>
          {props.user.name} is logged in
          <button onClick={props.logout}>Logout</button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDipatchToProps = {
  logout: removeUser
};

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(Menu);

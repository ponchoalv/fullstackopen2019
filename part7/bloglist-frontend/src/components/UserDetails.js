import React from "react";
import { connect } from "react-redux";

const UserDetails = props => {
  if (props.user === undefined){
    return null;
  }
  
  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {props.user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

const filteredUser = (state, userId) => {
  console.log(userId);
  console.log(state);
  return state.userBlogs.find(u => userId === u.id);
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: filteredUser(state, ownProps.userId)
  };
};

export default connect(mapStateToProps)(UserDetails);

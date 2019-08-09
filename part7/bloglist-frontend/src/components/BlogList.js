import React from "react";
import Blog from "./Blog";
import { connect } from "react-redux";

const BlogList = (props) => {
  return (
    <div>
      {props.blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={props.user}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs,
    user: ownProps.user
  };
};

export default connect(
  mapStateToProps
)(BlogList);

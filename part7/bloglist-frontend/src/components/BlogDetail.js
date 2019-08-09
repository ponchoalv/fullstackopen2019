import React from "react";
import { connect } from "react-redux";
import { like, deleteBlog } from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";

const BlogDetail = props => (
  <div>
    <div onClick={props.showDetailHandler}>
      {props.blog.title} {props.blog.author}
    </div>
    <div>
      <a href={props.blog.url}>{props.blog.url}</a>
    </div>
    <div>
      {props.blog.likes} likes
      <button onClick={() => props.likeHandler(props.blog)}>like</button>
    </div>
    <div>added by {props.blog.user.name}</div>
    {props.user.username === props.blog.user.username && (
      <div>
        <button onClick={() => props.removeHandler(props.blog)}>remove</button>
      </div>
    )}
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    showDetailHandler: ownProps.showDetailHandler,
    user: ownProps.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeHandler: blog => {
      try {
        dispatch(like(blog.id));
      } catch (error) {
        dispatch(notify(`${error.response.data.error}`, "error", 3));
      }
    },
    removeHandler: blog => {
      const confirmation = window.confirm(
        `remove ${blog.title} by ${blog.author}`
      );

      if (confirmation) {
        try {
          dispatch(deleteBlog(blog.id));
        } catch (error) {
          dispatch(notify(`${error.response.data.error}`, "error", 3));
        }
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);

import React from "react";
import { connect } from "react-redux";
import { like, deleteBlog } from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";
import Comments from "./Comments";

const BlogDetail = props => {
if(props.blog === undefined) {
  return null;
}

  return (
    <div>
      <h1>
        {props.blog.title} {props.blog.author}
      </h1>
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
          <button onClick={() => props.removeHandler(props.blog)}>
            remove
          </button>
        </div>
      )}
      <Comments blogId={props.blog.id} />
    </div>
  );
};


const findBlogById = (state, ownProps) => {
  return state.blogs.find(b => b.id === ownProps.blogId);
};

const mapStateToProps = (state, ownProps) => {
  return {
    blog: findBlogById(state, ownProps),
    user: state.user
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetail);

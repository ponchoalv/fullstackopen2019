import React from "react";
import { connect } from "react-redux";
import { saveComment } from "../reducers/blogsReducer";

const Comments = props => {
  const submitForm = event => {
    event.preventDefault();
    const message = event.target.message.value;
    event.target.message.value = "";
    props.saveComment(props.blogId, message);
  };

  return (
    <div>
      <h4>Comments</h4>
      <form onSubmit={submitForm}>
        <input name="message" />
        <button>add comment</button>
      </form>
      <ul>
        {props.comments.map(comment => (
          <li key={comment.id}>{comment.message}</li>
        ))}
      </ul>
    </div>
  );
};

const getComments = (state, props) => {
  const blog = state.blogs.find(b => b.id === props.blogId);
  return blog.comments;
};

const mapStateToProps = (state, props) => {
  return {
    comments: getComments(state, props),
    blogId: props.blogId
  };
};

const mapDispatchToProps = {
  saveComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);

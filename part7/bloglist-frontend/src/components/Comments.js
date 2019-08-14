import React from "react";
import { connect } from "react-redux";

const Comments = props => {
  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {props.comments.map(comment => (
          <li key={comment.id}>{comment.message}</li>
        ))}
      </ul>
    </div>
  );
};

const getComments = (state, props) => {
  const blog = state.blogs.find(b => (b.id === props.blogId));
  return blog.comments;
};

const mapStateToProps = (state, props) => {
  return {
    comments: getComments(state, props)
  };
};

export default connect(mapStateToProps)(Comments);
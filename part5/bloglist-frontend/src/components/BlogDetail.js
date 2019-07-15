import React from 'react';

const BlogDetail = ({ blog, showDetailHandler, likeHandler }) => (
  <div>
    <div onClick={showDetailHandler}>
      {blog.title} {blog.author}
    </div>
    <div>
      <a href={blog.url}>{blog.url}</a>
    </div>
    <div>
      {blog.likes} likes<button onClick={() => likeHandler(blog.id)}>like</button>
    </div>
    <div>added by {blog.user.name}</div>
  </div>
);

export default BlogDetail;

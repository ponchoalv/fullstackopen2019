import React, { useState } from 'react';
import BlogDetail from "./BlogDetail";

const Blog = ({ blog, likeHandler }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={blogStyle}>
        {!showDetails ? (
          <div onClick={toggleDetails}>
            {blog.title} {blog.author}
          </div>
        ) : (
          <BlogDetail blog={blog} showDetailHandler={toggleDetails} likeHandler={likeHandler} />
        )}
    </div>
  );
};

export default Blog;

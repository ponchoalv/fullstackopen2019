import React, { useState } from 'react';

const Blog = ({ blog }) => {
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
      <div onClick={toggleDetails}>
        {!showDetails ? (
          <div>
            {blog.title} {blog.author}
          </div>
        ) : (
          <div>
            <div>
              {blog.title} {blog.author}
            </div>
            <div>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
              {blog.likes} likes<button>like</button>
            </div>
            <div>
              added by {blog.user.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

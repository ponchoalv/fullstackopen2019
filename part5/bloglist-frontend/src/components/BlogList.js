import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeHandler, removeHandler, user }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} likeHandler={likeHandler} removeHandler={removeHandler} user={user} />
      ))}
    </div>
  )
}

export default BlogList

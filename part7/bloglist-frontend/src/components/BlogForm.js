import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, title, author, url }) => (
  <div>
    <h1>create new</h1>

    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          {...title}
        />
      </div>
      <div>
        author:
        <input
          {...author}
        />
      </div>
      <div>
        url:
        <input {...url} />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm

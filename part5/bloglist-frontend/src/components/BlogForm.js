import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, title, author, url, handleBlogChange }) => (
  <div>
    <h1>create new</h1>

    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          name="title"
          value={title}
          onChange={handleBlogChange('title')}
        />
      </div>
      <div>
        author:
        <input
          name="author"
          value={author}
          onChange={handleBlogChange('author')}
        />
      </div>
      <div>
        url:
        <input name="url" value={url} onChange={handleBlogChange('url')} />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleBlogChange: PropTypes.func.isRequired
}

export default BlogForm

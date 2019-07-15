import React from 'react'

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

export default BlogForm

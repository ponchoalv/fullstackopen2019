import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'

const BlogList = props => {
  return (
    <div>
      {props.blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(BlogList)

import blogsService from '../services/blogs'
import { notify } from './notificationReducer'

const sortLikes = (firstEl, secondEl) => {
  return secondEl.likes - firstEl.likes
}

export const like = id => {
  return async dispatch => {
    try {
      const blog = await blogsService.getById(id)
      const newBlog = { ...blog, likes: blog.likes + 1 }
      blogsService.update(id, newBlog)

      dispatch({
        type: 'LIKE',
        newBlog
      })
    } catch (error) {
      dispatch(
        notify(
          'Something went wrong while tryng to send a Link, try again later',
          'error',
          5
        )
      )
    }
  }
}

export const newBlog = content => {
  return async dispatch => {
    const response = await blogsService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: response
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogsService.removeBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const initializeBlogs = token => {
  return async dispatch => {
    blogsService.setToken(token)
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const saveComment = (id, message) => {
  return async dispatch => {
    const comment = { message }
    const savedComment = await blogsService.saveComment(id, comment)

    dispatch({
      type: 'ADD_COMMENT',
      comment: savedComment,
      blogId: id
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'LIKE': {
    const newState = state.map(blog =>
      blog.id !== action.newBlog.id ? blog : action.newBlog
    )
    return newState.sort(sortLikes)
  }
  case 'NEW_BLOG':
    return [...state, action.data].sort(sortLikes)
  case 'INIT_BLOGS':
    return action.data.sort(sortLikes)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'ADD_COMMENT': {
    const blog = state.find(b => b.id === action.blogId)
    const newBlog = {
      ...blog,
      comments: blog.comments.concat(action.comment)
    }
    console.log('blog ->', blog, 'newBlog -> ', newBlog)
    return state.map(b => (newBlog.id === b.id ? newBlog : b))
  }
  default:
    return state
  }
}

export default reducer

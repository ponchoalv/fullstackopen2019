import React, { useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import Menu from './components/Menu'
import { useField } from './hooks'
import { connect } from 'react-redux'
import { initializeBlogs, newBlog } from './reducers/blogsReducer'
import { notify } from './reducers/notificationReducer'
import { registerUser, removeUser } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { setUserList } from './reducers/userBlogsReducer'
import { setTitle } from './reducers/drawerReducer'

import UserDetails from './components/UserDetails'
import BlogDetail from './components/BlogDetail'
import AppContent from './components/AppContent'

const App = props => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const newBlogFormRef = React.createRef()
  const signUser = props.registerUser
  const initBlogs = props.initializeBlogs
  const setUsers = props.setUserList

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      signUser(user)
      initBlogs(user.token)
      setUsers()
    }
  }, [signUser, initBlogs, setUsers])

  const addBlog = async event => {
    event.preventDefault()
    newBlogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      props.newBlog(blogObject)
      props.notify(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        'success',
        3
      )
      title.clear.clear()
      author.clear.clear()
      url.clear.clear()
    } catch (error) {
      props.notify(`${error.response.data.error}`, 'error', 3)
    }
  }

  return (
    <Router>
      {props.user.token === null ? (
        <>
          <Notification />
          <Login />
        </>
      ) : (
        <>
          <div>
            <Menu />
            <h1>blogs</h1>
            <Notification />
          </div>
          <Route
            exact
            path="/"
            render={() => {
              props.setTitle('Blogs')
              return (
                <AppContent>
                  <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
                    <BlogForm
                      addBlog={addBlog}
                      title={title}
                      author={author}
                      url={url}
                    />
                  </Togglable>
                  <BlogList />
                </AppContent>
              )
            }}
          />
          <Route
            exact
            path="/users"
            render={() => {
              props.setTitle('Users')
              return (
                <AppContent>
                  {' '}
                  <Users />{' '}
                </AppContent>
              )
            }}
          />
          <Route
            exact
            path="/users/:id"
            render={({ match }) => {
              props.setTitle('User Details')
              return (
                <AppContent>
                  {' '}
                  <UserDetails userId={match.params.id} />{' '}
                </AppContent>
              )
            }}
          />
          <Route
            exact
            path="/blogs/:id"
            render={({ match }) => {
              props.setTitle('Blog Details')
              return (
                <AppContent>
                  <BlogDetail blogId={match.params.id} />
                </AppContent>
              )
            }}
          />
        </>
      )}
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  newBlog,
  notify,
  registerUser,
  removeUser,
  setUserList,
  setTitle
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

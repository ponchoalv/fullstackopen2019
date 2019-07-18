import React, { useState, useEffect } from 'react'
import LoginComponents from './components/Login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import blogsService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClassName, setNotificationClassName] = useState(
    'notification'
  )
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [user, setUser] = useState(null)
  const newBlogFormRef = React.createRef()

  const setNotification = (message, className) => {
    setNotificationMessage(message)
    setNotificationClassName(className)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
      blogsService.getAll().then(blogs => setBlogs(blogs.sort((left, right) => {
        return right.likes - left.likes
      })))
    }
  }, [])

  const handleLoging = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
      username.clear.clear()
      password.clear.clear()
    } catch (error) {
      setNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogsService.setToken(null)
    setUser(null)
  }

  const likeHandler = async id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await blogsService.update(id, changedBlog)
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : changedBlog)).sort((left, right) => {
        return right.likes - left.likes
      }))
    } catch (error) {
      setNotification(`${error.response.data.error}`, 'error')
    }
  }

  const removeHandler = async id => {
    const blog = blogs.find(n => n.id === id)

    const confirmation = window.confirm(`remove ${blog.title} by ${blog.author}`)

    if (confirmation) {
      try {
        await blogsService.removeBlog(id)
        setBlogs(blogs.filter(blog => (blog.id !== id)).sort((left, right) => {
          return right.likes - left.likes
        }))
      } catch (error) {
        setNotification(`${error.response.data.error}`, 'error')
      }
    }

  }

  const addBlog = async event => {
    event.preventDefault()
    newBlogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      const result = await blogsService.create(blogObject)
      setBlogs(blogs.concat(result))
      setNotification(
        `a new blog ${result.title} by ${result.author} added`,
        'successful'
      )

      title.clear.clear()
      author.clear.clear()
      url.clear.clear()
    } catch (error) {
      setNotification(`${error.response.data.error}`, 'error')
    }
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification
        message={notificationMessage}
        notificationClassName={notificationClassName}
      />
      {user === null ? (
        <LoginComponents.Login
          username={username}
          password={password}
          loginHandle={handleLoging}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <LoginComponents.Logout logoutHandler={handleLogout} />
          </p>
          <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
            <BlogForm
              addBlog={addBlog}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
          <BlogList blogs={blogs} likeHandler={likeHandler} removeHandler={removeHandler} user={user}/>
        </div>
      )}
    </div>
  )
}

export default App

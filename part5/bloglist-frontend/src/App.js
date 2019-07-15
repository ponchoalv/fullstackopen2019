import React, { useState, useEffect } from 'react'
import LoginComponents from './components/Login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import blogsService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClassName, setNotificationClassName] = useState(
    'notification'
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

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
        username,
        password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      const blogs = await blogsService.getAll()
      setBlogs(blogs)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
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

  const handleBlogChange = name => event => {
    const value = event.target.value
    switch (name) {
    case 'title':
      setTitle(value)
      break
    case 'author':
      setAuthor(value)
      break
    case 'url':
      setUrl(value)
      break
    default:
      break
    }
  }

  const addBlog = async event => {
    event.preventDefault()
    newBlogFormRef.current.toggleVisibility()
    const blogObject = {
      title,
      author,
      url
    }

    try {
      const result = await blogsService.create(blogObject)
      setBlogs(blogs.concat(result))
      setNotification(
        `a new blog ${result.title} by ${result.author} added`,
        'successful'
      )

      setTitle('')
      setAuthor('')
      setUrl('')
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
          setPassword={setPassword}
          setUsername={setUsername}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <LoginComponents.Logout logoutHandler={handleLogout} />
          </p>
          <Togglable buttonLabel="new note" ref={newBlogFormRef}>
            <BlogForm
              addBlog={addBlog}
              title={title}
              author={author}
              url={url}
              handleBlogChange={handleBlogChange}
            />
          </Togglable>
          <BlogList blogs={blogs} likeHandler={likeHandler} removeHandler={removeHandler} user={user}/>
        </div>
      )}
    </div>
  )
}

export default App

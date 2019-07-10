import React, { useState, useEffect } from 'react';
import LoginComponents from './components/Login';
import BlogList from './components/BlogList';
import blogsService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = props => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
      blogsService.getAll().then(blogs => setBlogs(blogs));
    }
  }, []);

  const handleLoging = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogsService.setToken(null);
    setUser(null);
  };

  return (
    <div>
      <h1>Blogs</h1>
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
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import LoginComponents from "./components/Login";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogsService from "./services/blogs";
import { useField } from "./hooks";
import { connect } from "react-redux";
import { initializeBlogs, newBlog } from "./reducers/blogsReducer";
import { notify } from "./reducers/notificationReducer";
import { registerUser, removeUser} from "./reducers/userReducer";

import "./App.css";

const App = props => {
  const username = useField("text");
  const password = useField("password");
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const newBlogFormRef = React.createRef();
  const signUser = props.registerUser;
  const initBlogs = props.initializeBlogs; 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      signUser(user);
      initBlogs(user.token);
    }
  }, [signUser, initBlogs]);

  const handleLoging = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      props.registerUser(user);
      props.initializeBlogs(user.token);
      username.clear.clear();
      password.clear.clear();
    } catch (error) {
      props.notify("wrong username or password", "error", 3);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogsService.setToken(null);
    props.removeUser();
  };

  const addBlog = async event => {
    event.preventDefault();
    newBlogFormRef.current.toggleVisibility();
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    };

    try {
      props.newBlog(blogObject);
      props.notify(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        "successful",
        3
      );
      title.clear.clear();
      author.clear.clear();
      url.clear.clear();
    } catch (error) {
      props.notify(`${error.response.data.error}`, "error", 3);
    }
  };

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {props.user.token === null ? (
        <LoginComponents.Login
          username={username}
          password={password}
          loginHandle={handleLoging}
        />
      ) : (
        <div>
          <p>
            {props.user.name} logged in
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
          <BlogList user={props.user} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  newBlog,
  notify,
  registerUser,
  removeUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

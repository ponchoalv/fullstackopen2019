import React, { useEffect } from "react";
import LoginComponents from "./components/Login";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import blogsService from "./services/blogs";
import { useField } from "./hooks";
import { connect } from "react-redux";
import { initializeBlogs, newBlog } from "./reducers/blogsReducer";
import { notify } from "./reducers/notificationReducer";
import { registerUser, removeUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { setUserList } from "./reducers/userBlogsReducer";

import "./App.css";
import UserDetails from "./components/UserDetails";
import BlogDetail from "./components/BlogDetail";

const App = props => {
  const username = useField("text");
  const password = useField("password");
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const newBlogFormRef = React.createRef();
  const signUser = props.registerUser;
  const initBlogs = props.initializeBlogs;
  const setUsers = props.setUserList;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      signUser(user);
      initBlogs(user.token);
      setUsers();
    }
  }, [signUser, initBlogs, setUsers]);

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
          <Router>
            <Route
              exact
              path="/"
              render={() => (
                <div>
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
            />
            <Route exact path="/users" render={() => <Users />} />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => <UserDetails userId={match.params.id} />}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => <BlogDetail blogId={match.params.id} />}
            />
          </Router>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  initializeBlogs,
  newBlog,
  notify,
  registerUser,
  removeUser,
  setUserList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

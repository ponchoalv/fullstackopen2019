import blogsService from "../services/blogs";
import loginService from "../services/login";
import { initializeBlogs } from "./blogsReducer";
import { notify } from "./notificationReducer";
import { setUserList } from "./userBlogsReducer";

const initialState = {
  token: null,
  username: null,
  name: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return action.user;
    case "REMOVE_USER":
      return initialState;
    default:
      return state;
  }
};

export const registerUser = user => {
  return { type: "REGISTER_USER", user };
};

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: username,
        password: password
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(initializeBlogs(user.token));
      dispatch(setUserList())
      dispatch({ type: "REGISTER_USER", user });
    } catch (error) {
      dispatch(notify("wrong username or password", "error", 3));
    }
  };
};

export const removeUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogsService.setToken(null);
    dispatch({
      type: "REMOVE_USER"
    });
  };
};

export default userReducer;

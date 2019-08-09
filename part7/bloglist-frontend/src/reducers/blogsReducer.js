import blogsService from "../services/blogs";

const sortLikes = (firstEl, secondEl) => {
  return secondEl.likes - firstEl.likes;
};

export const like = id => {
  return async dispatch => {
    const blog = await blogsService.getById(id);
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const response = await blogsService.update(id, newBlog);
    const updatedBlog = {...response, user:newBlog.user};
    dispatch({
      type: "LIKE",
      updatedBlog
    });
  };
};

export const newBlog = content => {
  return async dispatch => {
    const response = await blogsService.create(content);
    dispatch({
      type: "NEW_BLOG",
      data: response
    });
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    await blogsService.removeBlog(id);
    dispatch({
      type: "DELETE_BLOG",
      data: id
    });
  };
};

export const initializeBlogs = (token) => {
  return async dispatch => {
    blogsService.setToken(token);
    const blogs = await blogsService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "LIKE":
      const newState = state.map(blog =>
        blog.id !== action.updatedBlog.id ? blog : action.updatedBlog
      );
      return newState.sort(sortLikes);
    case "NEW_BLOG":
      return [...state, action.data].sort(sortLikes);
    case "INIT_BLOGS":
      return action.data.sort(sortLikes);
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.data);
    default:
      return state;
  }
};

export default reducer;

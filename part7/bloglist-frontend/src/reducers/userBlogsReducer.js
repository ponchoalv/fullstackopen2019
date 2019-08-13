import userService from "../services/users";

const userBlogReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_BLOGS":
      return action.users
    default:
      return state;
  }
};

export const setUserList = () => {
  return async dipatch => {
    const users = await userService.getAll();
    dipatch({
      type: "SET_USER_BLOGS",
      users
    });
  };
};

export default userBlogReducer;

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
  return {
    type: "REGISTER_USER",
    user
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER"
  };
};

export default userReducer;

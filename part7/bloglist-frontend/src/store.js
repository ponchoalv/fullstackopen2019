import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogsReducer from './reducers/blogsReducer';
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import userBlogsReducer from "./reducers/userBlogsReducer"

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer,
  userBlogs: userBlogsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import notificationReducer from './notificationReducer';

export default configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    login: loginReducer,
    notification: notificationReducer,
  },
});
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

export default configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});
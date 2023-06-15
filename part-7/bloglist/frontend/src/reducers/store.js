import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogReducer';
import notificationReducer from './notificationReducer';

export default configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
  },
});
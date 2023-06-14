import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationReducer';

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
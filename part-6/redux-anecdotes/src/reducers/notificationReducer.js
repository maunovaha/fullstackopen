import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return '';
    }
  }
});

export const { displayNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (notification, durationInSeconds) => {
  return async (dispatch) => {
    dispatch(displayNotification(notification));
    setTimeout(() => {
      dispatch(clearNotification());
    }, durationInSeconds * 1000);
  };
};

export default notificationSlice.reducer;

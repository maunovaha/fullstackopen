import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    // eslint-disable-next-line
    displayNotification(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line
    clearNotification(state, action) {
      return '';
    },
  },
});

export const { displayNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (notification, durationInSeconds = 3) => {
  return async (dispatch) => {
    dispatch(displayNotification(notification));
    setTimeout(() => {
      dispatch(clearNotification());
    }, durationInSeconds * 1000);
  };
};

export default notificationSlice.reducer;

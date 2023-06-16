import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/UserService';
import { setNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    // eslint-disable-next-line
    setUsers(state, action) {
      return [...action.payload];
    },
  },
});

export const { setUsers } = userSlice.actions;

export const initUsers = () => {
  return async (dispatch) => {
    const response = await userService.getAll();

    if (response.status === 200) {
      dispatch(setUsers(response.users));
    } else {
      dispatch(setNotification('Internal server error, try again later.'));
    }
  };
};

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/LoginService';
import { setNotification } from './notificationReducer';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    // eslint-disable-next-line
    setLoggedInUser(state, action) {
      return { ...action.payload };
    },
  },
});

export const { setLoggedInUser } = loginSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await loginService.login(username, password);

    if (response.status === 200) {
      dispatch(setNotification(''));
      dispatch(setLoggedInUser(response.user));
      window.localStorage.setItem('loggedUser', JSON.stringify(response.user));
    } else if (response.status === 401) {
      dispatch(setNotification('Invalid username or password.'));
    } else {
      dispatch(setNotification('Internal server error, try again later.'));
    }
  };
};

export const logout = () => {
  window.localStorage.removeItem('loggedUser');
};

export default loginSlice.reducer;

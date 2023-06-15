import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/BlogService';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    // eslint-disable-next-line
    addBlog(state, action) {
      return [...state, { ...action.payload }];
    },
    // eslint-disable-next-line
    setBlogs(state, action) {
      return [...action.payload];
    },
  },
});

export const { addBlog, setBlogs } = blogSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();

    if (response.status === 200) {
      dispatch(setBlogs(response.blogs.map((blog) => ({ ...blog, user: blog.user.id }))));
    } else {
      dispatch(setNotification('Internal server error, try again later.'));
    }
  };
};

export const createBlog = (title, author, url, token) => {
  return async (dispatch) => {
    const response = await blogService.create(title, author, url, token);

    if (response.status === 201) {
      dispatch(setNotification(`A new blog "${response.blog.title}" added!`));
      dispatch(addBlog(response.blog));
    } else if (response.status === 400) {
      dispatch(setNotification('Creating blog failed, did you forget to provide title and url?'));
    } else if (response.status === 401) {
      // TODO: How to dispatch the logout?
      // logout();
    } else {
      dispatch(setNotification('Internal server error, try again later.'));
    }
  };
};

export default blogSlice.reducer;

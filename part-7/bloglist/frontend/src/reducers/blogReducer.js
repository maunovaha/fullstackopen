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
    addCommentToBlog(state, action) {
      return state.map(blog =>
        ({ ...blog, comments: blog.id === action.payload.blog ? [...blog.comments, { ...action.payload }] : blog.comments })
      );
    },
    // eslint-disable-next-line
    setBlogs(state, action) {
      return [...action.payload];
    },
    // eslint-disable-next-line
    addLikeToBlog(state, action) {
      return state.map(blog =>
        ({ ...blog, likes: blog.id === action.payload ? blog.likes + 1 : blog.likes })
      );
    },
    // eslint-disable-next-line
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { addBlog, addCommentToBlog, setBlogs, addLikeToBlog, deleteBlog } = blogSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();

    if (response.status === 200) {
      dispatch(setBlogs(response.blogs));
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

export const createComment = (id, message, token) => {
  return async (dispatch) => {
    const response = await blogService.comment(id, message, token);

    if (response.status === 201) {
      dispatch(setNotification(`A new comment added!`));
      dispatch(addCommentToBlog(response.comment));
    } else if (response.status === 400) {
      dispatch(setNotification('Commenting blog failed, did you forget to provide a message?'));
    } else if (response.status === 401) {
      // TODO: How to dispatch the logout?
      // logout();
    } else {
      dispatch(setNotification('Internal server error, try again later.'));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.like(blog.id, blog.likes + 1);

    if (response.status === 200) {
      dispatch(addLikeToBlog(response.blog.id));
    } else {
      dispatch(setNotification('Internal server error, try again later.'));
    }
  };
};

export const destroyBlog = (id, token) => {
  return async (dispatch) => {
    const response = await blogService.destroy(id, token);

    if (response.status === 204) {
      dispatch(deleteBlog(id));
    } else if (response.status === 400) {
      dispatch(setNotification('Cannot delete a blog belonging to other user.'));
    } else {
      dispatch(setNotification('Internal server error, try again later.'));
    }
  };
};

export default blogSlice.reducer;

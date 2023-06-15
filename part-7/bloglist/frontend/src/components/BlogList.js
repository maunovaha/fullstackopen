import Blog from '../components/Blog';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { likeBlog, destroyBlog } from '../reducers/blogReducer';

// To prevent unnecessary rerenders, I need to use `createSelector` so that the
// sorted blogs are being memoized.
const selectSortedBlogs = createSelector(
  (state) => state.blogs,
  (blogs) => blogs.toSorted((a, b) => b.likes - a.likes)
);

const BlogList = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectSortedBlogs);

  const handleLikeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    dispatch(likeBlog(blog));
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete the blog?')) {
      return;
    }
    dispatch(destroyBlog(id, user.token));
  };

  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user}
          onLikeBlog={handleLikeBlog}
          onDeleteBlog={handleDeleteBlog}
        />
      ))}
    </>
  );
};

export default BlogList;

import Blog from '../components/Blog';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

// To prevent unnecessary rerenders, I need to use `createSelector` so that the
// sorted blogs are being memoized.
const selectSortedBlogs = createSelector(
  (state) => state.blogs,
  (blogs) => blogs.toSorted((a, b) => b.likes - a.likes)
);

const BlogList = ({ user }) => {
  const blogs = useSelector(selectSortedBlogs);

  const handleLikeBlog = async (id) => {
    console.log('Like: ', id);

    // const likedBlog = blogs.find((blog) => blog.id === id);
    // const response = await blogService.like(id, likedBlog.likes + 1);

    // if (response.status === 200) {
    //   setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response.blog)));
    // } else {
    //   dispatch(setNotification('Internal server error, try again later.'));
    // }
  };

  const handleDeleteBlog = async (id) => {
    console.log('Delete: ', id);

    // if (!window.confirm('Are you sure you want to delete the blog?')) {
    //   return;
    // }

    // const response = await blogService.destroy(id, user.token);

    // if (response.status === 204) {
    //   setBlogs(blogs.filter((blog) => blog.id !== id));
    // } else if (response.status === 400) {
    //   dispatch(setNotification('Cannot delete a blog belonging to other user.'));
    // } else {
    //   dispatch(setNotification('Internal server error, try again later.'));
    // }
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

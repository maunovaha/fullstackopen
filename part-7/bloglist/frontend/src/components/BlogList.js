import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

// To prevent unnecessary rerenders, I need to use `createSelector` so that the
// sorted blogs are being memoized.
const selectSortedBlogs = createSelector(
  (state) => state.blogs,
  (blogs) => blogs.toSorted((a, b) => b.likes - a.likes)
);

const BlogList = () => {
  const blogs = useSelector(selectSortedBlogs);

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.url}</Link></li>
      ))}
    </ul>
  );
};

export default BlogList;

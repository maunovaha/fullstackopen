const Blog = ({ blog }) => {
  return (
    <div>- {blog.title} (Written by <em>{blog.author || 'unknown author'}</em>)</div>
  );
};

export default Blog;
import { useState } from 'react';

const Blog = ({ blog, currentUser, onLikeBlog, onDeleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const toggleLabel = viewDetails ? 'Hide' : 'View';

  const handleViewDetails = () => {
    setViewDetails(!viewDetails);
  };

  return (
    <div className="blog">
      <div style={{ display: 'flex', marginBottom: '0.25rem' }}>
        <div style={{ paddingRight: '1rem' }}>
          - {blog.title}
        </div>
        <div>
          <button type="button" onClick={handleViewDetails}>{toggleLabel}</button>
        </div>
      </div>
      {viewDetails &&
        <ul>
          <li>Written by: {blog.author || 'unknown author'}</li>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes} <button type="button" onClick={() => onLikeBlog(blog.id)}>Like</button></li>
          {blog.user && blog.user === currentUser.id &&
            <li><button type="button" onClick={() => onDeleteBlog(blog.id)}>Delete</button></li>
          }
        </ul>
      }
    </div>
  );
};

export default Blog;
import { useState } from 'react';

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const toggleLabel = viewDetails ? 'Hide' : 'View';

  const toggleViewDetails = (e) => {
    setViewDetails(!viewDetails);
  };

  return (
    <>
      <div style={{ display: 'flex', marginBottom: '0.25rem' }}>
        <div style={{ paddingRight: '1rem' }}>
          - {blog.title}
        </div>
        <div>
          <button onClick={toggleViewDetails}>{toggleLabel}</button>
        </div>
      </div>
      {viewDetails &&
        <ul>
          <li>Written by: {blog.author || 'unknown author'}</li>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes || 0} <button>Like</button></li>
        </ul>
      }
    </>
  );
};

export default Blog;
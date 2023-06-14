import { useState } from 'react';
import Alert from './Alert';

const BlogForm = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();
    onCreateBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h1>Create new blog</h1>
      <Alert />
      <form onSubmit={addBlog}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block' }}>
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="author" style={{ display: 'block' }}>
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="url" style={{ display: 'block' }}>
            Url
          </label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    </>
  );
};

export default BlogForm;

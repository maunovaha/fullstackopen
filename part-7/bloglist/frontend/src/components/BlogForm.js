import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import Alert from './Alert';

const BlogForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = (e) => {
    e.preventDefault();
    dispatch(createBlog(title, author, url, user.token));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h1>Create new blog</h1>
      <Alert />
      <form onSubmit={handleCreateBlog}>
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

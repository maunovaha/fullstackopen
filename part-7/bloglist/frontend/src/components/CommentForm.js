import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../reducers/blogReducer';
import Alert from './Alert';

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);
  const [message, setMessage] = useState('');

  const handleCreateComment = (e) => {
    e.preventDefault();
    dispatch(createComment(blog.id, message, user.token));
    setMessage('');
  };

  return (
    <>
      <Alert />
      <form onSubmit={handleCreateComment}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="message" style={{ display: 'block' }}>
            Comment
          </label>
          <input
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <input type="submit" value="Post comment" />
      </form>
    </>
  );
};

export default CommentForm;

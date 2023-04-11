import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;

    if (anecdote.length === 0) {
      return;
    }

    e.target.anecdote.value = '';
    dispatch(createAnecdote(anecdote));
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="anecdote" />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default AnecdoteForm;
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/AnecdoteService';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;

    if (anecdote.length === 0) {
      return;
    }

    e.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`You created ${newAnecdote.content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
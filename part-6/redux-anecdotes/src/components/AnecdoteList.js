import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';
import AnecdoteListItem from './AnecdoteListItem';

const filterAnecdotes = (filter, anecdotes) => {
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
};

const sortAnecdotesByVotes = (anecdotes) => {
  return anecdotes.toSorted((a, b) => b.votes - a.votes);
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => filterAnecdotes(state.filter, sortAnecdotesByVotes(state.anecdotes)));

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`You voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <AnecdoteListItem key={anecdote.id} onClick={() => vote(anecdote)} {...anecdote} />
      )}
    </div>
  );
};

export default AnecdoteList;

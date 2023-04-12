import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
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
    dispatch(voteAnecdote(anecdote.id, anecdote.votes));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 3));
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

import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
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

  return (
    <div>
      {anecdotes.map(anecdote =>
        <AnecdoteListItem key={anecdote.id} onClick={() => dispatch(addVote(anecdote.id))} {...anecdote} />
      )}
    </div>
  );
};

export default AnecdoteList;

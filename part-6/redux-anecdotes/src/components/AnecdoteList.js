import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import AnecdoteListItem from './AnecdoteListItem';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state);
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map(anecdote => 
        <AnecdoteListItem key={anecdote.id} onClick={() => dispatch(addVote(anecdote.id))} {...anecdote} />
      )}
    </div>
  );
};

export default AnecdoteList;

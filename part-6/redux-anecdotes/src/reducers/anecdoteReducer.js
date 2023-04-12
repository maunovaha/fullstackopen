import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, { ...action.payload }];
    },
    addVote(state, action) {
      return state.map(anecdote => 
        ({ ...anecdote, votes: anecdote.id === action.payload ? anecdote.votes + 1 : anecdote.votes })
      );
    },
    setAnecdotes(state, action) {
      return [...action.payload];
    }
  }
});

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
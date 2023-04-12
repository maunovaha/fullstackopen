import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/AnecdoteService';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map(anecdote => 
        ({ ...anecdote, votes: anecdote.id === action.payload ? anecdote.votes + 1 : anecdote.votes })
      );
    },
    setAnecdotes(state, action) {
      return [...action.payload];
    },
    appendAnecdote(state, action) {
      return [...state, { ...action.payload }];
    }
  }
});

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id, votes) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(id, votes);
    dispatch(addVote(updatedAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
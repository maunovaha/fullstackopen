import { createSlice } from '@reduxjs/toolkit';

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      // @reduxjs/toolkit uses Immer -lib internally, so we could mutate the state directly using
      // state.push({ ... }); but I don't like it so we return new state object instead.
      return [...state, { ...action.payload }];
    },
    toggleImportanceOf(state, action) {
      // Debug: console.log(JSON.parse(JSON.stringify(state)));
      return state.map(note => note.id === action.payload ? { ...note, important: !note.important } : note);
    },
    appendNote(state, action) {
      return [...state, { ...action.payload }];
    },
    setNotes(state, action) {
      return [...action.payload];
    }
  }
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export default noteSlice.reducer;

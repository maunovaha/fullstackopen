import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  }
];

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      // @reduxjs/toolkit uses Immer -lib internally, so we could mutate the state directly using
      // state.push({ ... }); but I don't like it so we return new state object instead.
      return [...state, { id: generateId(), content: action.payload, important: false }];
    },
    toggleImportanceOf(state, action) {
      // Debug: console.log(JSON.parse(JSON.stringify(state)));
      return state.map(note => note.id === action.payload ? { ...note, important: !note.important } : note);
    }
  }
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;

export default noteSlice.reducer;

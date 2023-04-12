import { createSlice } from '@reduxjs/toolkit';
import noteService from '../services/NoteService';

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
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

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.create(content);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;

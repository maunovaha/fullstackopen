import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteReducer';
import filterReducer from './filterReducer';

export default configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
});

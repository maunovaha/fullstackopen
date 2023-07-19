import axios from 'axios';
import { Note, NewNote } from '../../types';

const baseUrl = 'http://localhost:3001/notes';

export const getAllNotes = async (): Promise<Note[]> => {
  // Giving type variable to axios.get might be ok if we are absolutely sure 
  // that the backend behaves correctly and returns always the data in correct form. 
  // If we want to build a robust system we should prepare for surprises and parse 
  // the response data in the frontend similarly that we did in the previous section 
  // for the requests to the backend.
  //
  // TL;DR The response data needs to be validated in real app because it can be anything.
  const response = await axios.get<Note[]>(baseUrl);
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>(baseUrl, newNote);
  return response.data;
};

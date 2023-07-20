import axios from 'axios';
import { Diary } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getAllDiaries = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

export default {
  getAllDiaries
};

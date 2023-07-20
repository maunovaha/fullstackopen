import axios from 'axios';
import { Diary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getAllDiaries = async (): Promise<Diary[]> => {
  const { data } = await axios.get<Diary[]>(baseUrl);
  return data;
};

const addDiary = async (diary: NewDiary): Promise<Diary> => {
  const { data } = await axios.post<Diary>(baseUrl, diary);
  return data;
};

export default {
  getAllDiaries,
  addDiary
};

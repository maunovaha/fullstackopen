import axios from 'axios';
import { Diary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

interface FailedRequest {
  errorMessage: string;
}

export const isFailedRequest = (result: unknown): result is FailedRequest => {
  return result !== null && typeof result === 'object' && 'errorMessage' in result;
};

const handleRequestError = (error: unknown): FailedRequest => {
  if (axios.isAxiosError(error) && error.response) {
    return { errorMessage: error.response.data };
  } else {
    return { errorMessage: 'Something went wrong.' };
  }
};

const getAllDiaries = async (): Promise<Diary[] | FailedRequest> => {
  try {
    const { data } = await axios.get<Diary[]>(baseUrl);
    return data;
  } catch (error) {
    return handleRequestError(error);
  }
};

const addDiary = async (diary: NewDiary): Promise<Diary | FailedRequest> => {
  try {
    const { data } = await axios.post<Diary>(baseUrl, diary);
    return data;
  } catch (error) {
    return handleRequestError(error);
  }
};

export default {
  getAllDiaries,
  addDiary
};

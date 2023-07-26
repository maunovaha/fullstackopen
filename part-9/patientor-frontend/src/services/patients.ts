import axios from "axios";
import { NewJournalEntry, Patient, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

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

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const findOne = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addJournalEntry = async (id: string, object: NewJournalEntry) => {
  try {
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );
    return data;
  } catch (error) {
    return handleRequestError(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, findOne, create, addJournalEntry
};


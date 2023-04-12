import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const response = await axios.post(baseUrl, { content, important: false });
  return response.data;
};

export default { getAll, create };
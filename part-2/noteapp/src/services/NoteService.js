import axios from 'axios';

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/notes')
  return response.data;
}

const create = async (newObject) => {
  const response = await axios.post('http://localhost:3001/notes', newObject);
  return response.data;
}

const update = async (id, newObject) => {
  const response = await axios.put(`http://localhost:3001/notes/${id}`, newObject);
  return response.data;
}

export default { getAll, create, update };
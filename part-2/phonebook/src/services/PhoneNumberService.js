import axios from 'axios';

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/persons')
  return response.data;
}

const create = async (newObject) => {
  const response = await axios.post('http://localhost:3001/persons', newObject);
  return response.data;
}

const update = async (newObject) => {
  const response = await axios.put(`http://localhost:3001/persons/${newObject.id}`, newObject);
  return response.data;
}

const destroy = async (id) => {
  const response = await axios.delete(`http://localhost:3001/persons/${id}`);
  return response.data;
}

// eslint-disable-next-line
export default { getAll, create, update, destroy };
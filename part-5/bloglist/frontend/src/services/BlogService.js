import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return { status: response.status, blogs: response.data };
  } catch (error) {
    return { status: error.response.status };
  }
};

const create = async (title, author, url, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(baseUrl, { title, url, author }, config);
    return { status: response.status, blog: response.data };
  } catch (error) {
    return { status: error.response.status };
  }
};

const like = async (id, likes) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, { likes });
    return { status: response.status, blog: response.data };
  } catch (error) {
    return { status: error.response.status };
  }
};

const destroy = async (id, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return { status: response.status };
  } catch (error) {
    return { status: error.response.status };
  }
};

export default { getAll, create, like, destroy };

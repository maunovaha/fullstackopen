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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };

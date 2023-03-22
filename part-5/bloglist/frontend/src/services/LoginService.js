import axios from 'axios';

const baseUrl = '/api/login';

const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, { username, password });
    return { status: response.status, user: response.data };
  } catch (error) {
    return { status: error.response.status };
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
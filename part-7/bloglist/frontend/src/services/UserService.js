import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return { status: response.status, users: response.data };
  } catch (error) {
    return { status: error.response.status };
  }
};

export default { getAll };

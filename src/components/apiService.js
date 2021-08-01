import axios from 'axios';

const BASE_URL = 'https://jordan.ashton.fashion/api/goods/30/comments';

const apiService = page => {
  return axios.get(`${BASE_URL}?page=${page}`);
};

export default apiService;

import axios from 'axios';
import BASE_URL from './BASE_URL';

const axiosInstance = axios.create({
  baseURL: BASE_URL, //
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

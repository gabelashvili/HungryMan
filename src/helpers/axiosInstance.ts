import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { clearAuthedUser } from '../store/ducks/userDuck';
import storeRegistry from '../store/storeRegistry';

const instance = axios.create({
  timeout: 20000, // request timeout
  baseURL: process.env.REACT_APP_BASE_URL,
});

// request interceptor

instance.interceptors.request.use(
  (config : AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (config.headers && token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use((response: AxiosRequestConfig) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    toast.error('გაიარეთ ავტორიზაცია...');
    storeRegistry?.getStore().dispatch(clearAuthedUser());
  }
  return Promise.reject(error);
});

export default instance;

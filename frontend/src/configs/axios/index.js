import axios from 'axios'

axios.interceptors.request.use(function (config) {
  config.baseURL = import.meta.env.VITE_BACKEND_API
  return config;
}, function (error) {
  console.error(error)
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axios;
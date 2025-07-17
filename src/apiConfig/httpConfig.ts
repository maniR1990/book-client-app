import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/books', // full server URL since proxy won't work cross-repo
  timeout: 10000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('[Response]', response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[Error] ${error.response.status}: ${error.response.statusText}`);
      // toast.error("Something went wrong!");
    } else {
      console.error('Network Error or Server is Down');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

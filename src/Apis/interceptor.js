import axios from "axios";

export const Interceptor = () => {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  });
};

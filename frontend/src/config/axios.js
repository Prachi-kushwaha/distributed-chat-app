// axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔑 Always attach fresh token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    } else {
      delete config.headers.Authorization; // remove if no token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Handle expired/invalid token globally
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Sending token:", token);  // 👀 check in console
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

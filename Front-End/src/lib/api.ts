import axios from "axios";
import { useAuthStore } from "../store/authStore"; // 1. Import the auth store

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

// 2. Create the request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from the Zustand store
    const token = useAuthStore.getState().token;

    // If a token exists, add the Authorization header to the request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // The interceptor must return the config object
    return config;
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

export default apiClient;

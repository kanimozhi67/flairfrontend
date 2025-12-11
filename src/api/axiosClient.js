import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // make sure this matches your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Add the token to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

import axios from "axios";
const baseURL =
  process.env.REACT_APP_API_URL || "https://flairbackend.vercel.app";
console.log("baseURL:", baseURL);
const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  //  // make sure this matches your backend
  baseURL: `${baseURL}/api`,
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

import axios from "axios";

const api = axios.create({
  // baseURL: "https://flight-backend-production.up.railway.app/api",
  // baseURL: "http://localhost:5000/api/",
  baseURL: "https://flight-backend-36uz.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
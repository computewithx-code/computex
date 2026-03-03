import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/", // replace with your Laravel API URL
  withCredentials: true,                // needed for Sanctum auth
});

export default api;

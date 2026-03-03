import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // crucial for cookies
});

export const signup = async (form) => {
  // get CSRF cookie first
  await api.get("/sanctum/csrf-cookie");
  // then POST to register
  const res = await api.post("/register", form);
  return res.data;
};
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const startContainer = () => {
  return axios.post(`${API}/containers/start`, {}, {
    withCredentials: true
  });
};

export const stopContainer = (id) => {
  return axios.post(`${API}/containers/${id}/stop`, {}, {
    withCredentials: true
  });
};

export const getActiveContainers = () => {
  return axios.get(`${API}/containers/active`, {
    withCredentials: true
  });
};

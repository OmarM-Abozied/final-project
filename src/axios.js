import axios from "axios";

export const apiAxios = axios.create({
  baseURL: "http://localhost:5000",
});

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiAxios.interceptors.response.use((res) => {
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
});

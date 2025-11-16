import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if using cookies
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or cookies

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error?.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default client;

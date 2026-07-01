import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`
    };
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Request failed.";

    return Promise.reject({
      ...error,
      message,
      status: error?.response?.status
    });
  }
);

export default apiClient;

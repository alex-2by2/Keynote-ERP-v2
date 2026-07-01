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
  response => response,
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

export const api = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config)
};

export default apiClient;

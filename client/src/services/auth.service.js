// client/src/services/auth.service.js

import apiClient from "./api";

class AuthService {
  async login(credentials) {
    return apiClient.post("/auth/login", credentials);
  }

  async refresh(refreshToken) {
    return apiClient.post("/auth/refresh", { refreshToken });
  }

  async logout(refreshToken) {
    if (refreshToken) {
      await apiClient.post("/auth/logout", { refreshToken });
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export default new AuthService();

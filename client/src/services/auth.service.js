// client/src/services/auth.service.js

import apiClient from "../api/apiClient";

class AuthService {
  async login(credentials) {
    const response = await apiClient.post(
      "/auth/login",
      credentials
    );

    return response.data;
  }

  async refresh(refreshToken) {
    const response = await apiClient.post(
      "/auth/refresh",
      { refreshToken }
    );

    return response.data;
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

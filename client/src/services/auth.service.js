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

  async getProfile() {
    const response = await apiClient.get(
      "/auth/profile"
    );

    return response.data;
  }

  async logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
}

export default new AuthService();

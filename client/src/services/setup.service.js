import apiClient from "./api";

class SetupService {
  async getStatus() {
    return apiClient.get("/setup/status");
  }

  async initialize(payload) {
    return apiClient.post("/setup/initialize", payload);
  }
}

export default new SetupService();

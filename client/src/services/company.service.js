// client/src/services/company.service.js

import apiClient from "../api/apiClient";

class CompanyService {
  async getAll(params = {}) {
    const response = await apiClient.get(
      "/companies",
      {
        params
      }
    );

    return response.data;
  }

  async getById(id) {
    const response = await apiClient.get(
      `/companies/${id}`
    );

    return response.data;
  }

  async create(data) {
    const response = await apiClient.post(
      "/companies",
      data
    );

    return response.data;
  }

  async update(id, data) {
    const response = await apiClient.put(
      `/companies/${id}`,
      data
    );

    return response.data;
  }

  async delete(id) {
    const response = await apiClient.delete(
      `/companies/${id}`
    );

    return response.data;
  }
}

export default new CompanyService();

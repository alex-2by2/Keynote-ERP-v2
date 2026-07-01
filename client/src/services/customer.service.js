// client/src/services/customer.service.js

import apiClient from "../api/apiClient";

class CustomerService {
  async getAll(params = {}) {
    const response = await apiClient.get(
      "/customers",
      { params }
    );

    return response.data;
  }

  async getById(id) {
    const response = await apiClient.get(
      `/customers/${id}`
    );

    return response.data;
  }

  async create(data) {
    const response = await apiClient.post(
      "/customers",
      data
    );

    return response.data;
  }

  async update(id, data) {
    const response = await apiClient.put(
      `/customers/${id}`,
      data
    );

    return response.data;
  }

  async delete(id) {
    const response = await apiClient.delete(
      `/customers/${id}`
    );

    return response.data;
  }
}

export default new CustomerService();

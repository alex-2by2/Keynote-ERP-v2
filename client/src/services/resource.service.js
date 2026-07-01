import apiClient from "../api/apiClient";

export function createCrudService(resourcePath) {
  const normalizedPath = resourcePath.startsWith("/") ? resourcePath : `/${resourcePath}`;

  return {
    getAll(params = {}) {
      return apiClient.get(normalizedPath, { params });
    },

    getById(id) {
      return apiClient.get(`${normalizedPath}/${id}`);
    },

    create(data) {
      return apiClient.post(normalizedPath, data);
    },

    update(id, data) {
      return apiClient.put(`${normalizedPath}/${id}`, data);
    },

    delete(id) {
      return apiClient.delete(`${normalizedPath}/${id}`);
    }
  };
}

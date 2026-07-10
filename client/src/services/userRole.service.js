// client/src/services/userRole.service.js

import apiClient from "./api";

export function listUserRoles(params = {}) {
  return apiClient.get("/user-roles", { params });
}

export function assignUserRole(data) {
  return apiClient.post("/user-roles", data);
}

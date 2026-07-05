// client/src/services/dashboard.service.js

import apiClient from "./api";

export function getDashboardStats() {
  return apiClient.get("/dashboard/stats");
}

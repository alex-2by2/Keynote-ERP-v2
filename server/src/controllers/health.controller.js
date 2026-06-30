import { success } from "../utils/apiResponse.js";

export function health(req, res) {
  return success(
    res,
    {
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    },
    "Server Healthy"
  );
  }

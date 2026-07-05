// server/src/controllers/DashboardController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import DashboardService from "../services/DashboardService.js";

export const getDashboardStats = asyncHandler(
  async (req, res) => {
    const stats = await DashboardService.getStats();

    return success(res, stats);
  }
);

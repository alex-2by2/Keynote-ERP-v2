// server/src/controllers/SetupController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

import SetupService from "../services/SetupService.js";

export const getSetupStatus = asyncHandler(
  async (req, res) => {
    const initialized =
      await SetupService.isInitialized();

    return success(
      res,
      {
        initialized
      },
      initialized
        ? "ERP is already initialized."
        : "ERP setup required."
    );
  }
);

export const initializeSetup = asyncHandler(
  async (req, res) => {
    const result =
      await SetupService.initialize(
        req.body
      );

    return success(
      res,
      result,
      "ERP initialized successfully."
    );
  }
);

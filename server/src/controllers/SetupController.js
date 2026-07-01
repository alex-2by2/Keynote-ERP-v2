import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

import SetupService from "../services/SetupService.js";
import { validateSetup } from "../validators/setup.validator.js";

export const getSetupStatus = asyncHandler(async (req, res) => {
  const initialized = await SetupService.isInitialized();

  return success(
    res,
    {
      initialized
    },
    initialized
      ? "ERP is already initialized."
      : "ERP setup required."
  );
});

export const initializeSetup = asyncHandler(async (req, res) => {
  const data = validateSetup(req.body);

  const result = await SetupService.initialize(data);

  return success(
    res,
    result,
    "ERP initialized successfully."
  );
});

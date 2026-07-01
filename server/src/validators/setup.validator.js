// server/src/validators/setup.validator.js

import AppError from "../utils/AppError.js";

export function validateSetup(payload) {
  if (!payload) {
    throw new AppError(
      "Request body is required.",
      400,
      "INVALID_REQUEST"
    );
  }

  return payload;
}

// server/src/middleware/validateRequest.js

import { validationResult } from "express-validator";

import AppError from "../utils/AppError.js";

export default function validateRequest(
  req,
  res,
  next
) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const formatted = errors.array().map(error => ({
    field: error.path,
    message: error.msg
  }));

  return next(
    new AppError(
      "Validation failed.",
      422,
      "VALIDATION_ERROR",
      formatted
    )
  );
}

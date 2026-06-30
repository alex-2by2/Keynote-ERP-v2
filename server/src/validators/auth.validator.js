// server/src/validators/auth.validator.js

import AppError from "../utils/AppError.js";

const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function validateLogin(payload) {
  const email = String(payload.email || "")
    .trim()
    .toLowerCase();

  const password = String(payload.password || "");

  if (!email) {
    throw new AppError(
      "Email is required.",
      400,
      "VALIDATION_ERROR"
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new AppError(
      "Invalid email address.",
      400,
      "VALIDATION_ERROR"
    );
  }

  if (!password) {
    throw new AppError(
      "Password is required.",
      400,
      "VALIDATION_ERROR"
    );
  }

  return {
    email,
    password
  };
}

// server/src/validators/user.validator.js

import AppError from "../utils/AppError.js";

const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function requireString(value, field, min, max) {
  if (typeof value !== "string") {
    throw new AppError(`${field} is required.`, 400, "VALIDATION_ERROR");
  }

  const normalized = value.trim();

  if (normalized.length < min || normalized.length > max) {
    throw new AppError(
      `${field} must be between ${min} and ${max} characters.`,
      400,
      "VALIDATION_ERROR"
    );
  }

  return normalized;
}

export function validateCreateUser(payload) {
  const firstName = requireString(payload.firstName, "First name", 2, 100);
  const lastName = requireString(payload.lastName, "Last name", 2, 100);

  const email = requireString(payload.email, "Email", 5, 255).toLowerCase();

  if (!EMAIL_REGEX.test(email)) {
    throw new AppError(
      "Invalid email address.",
      400,
      "VALIDATION_ERROR"
    );
  }

  const password = requireString(payload.password, "Password", 8, 128);

  const role = payload.role ?? "employee";

  if (!["admin", "manager", "employee"].includes(role)) {
    throw new AppError(
      "Invalid user role.",
      400,
      "VALIDATION_ERROR"
    );
  }

  return {
    firstName,
    lastName,
    email,
    password,
    role
  };
}

export function validateUpdateUser(payload) {
  const data = {};

  if (payload.firstName !== undefined) {
    data.firstName = requireString(
      payload.firstName,
      "First name",
      2,
      100
    );
  }

  if (payload.lastName !== undefined) {
    data.lastName = requireString(
      payload.lastName,
      "Last name",
      2,
      100
    );
  }

  if (payload.email !== undefined) {
    const email = requireString(
      payload.email,
      "Email",
      5,
      255
    ).toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      throw new AppError(
        "Invalid email address.",
        400,
        "VALIDATION_ERROR"
      );
    }

    data.email = email;
  }

  if (payload.password !== undefined) {
    data.password = requireString(
      payload.password,
      "Password",
      8,
      128
    );
  }

  if (payload.role !== undefined) {
    if (!["admin", "manager", "employee"].includes(payload.role)) {
      throw new AppError(
        "Invalid user role.",
        400,
        "VALIDATION_ERROR"
      );
    }

    data.role = payload.role;
  }

  if (payload.isActive !== undefined) {
    data.isActive = Boolean(payload.isActive);
  }

  return data;
}

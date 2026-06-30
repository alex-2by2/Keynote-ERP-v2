// server/src/controllers/AuthController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

import UserService from "../services/UserService.js";

import {
  generateAccessToken
} from "../utils/jwt.js";

import {
  verifyPassword
} from "../utils/password.js";

export const login = asyncHandler(async (req, res) => {
  const email = String(req.body.email || "")
    .trim()
    .toLowerCase();

  const password = String(req.body.password || "");

  if (!email || !password) {
    throw new AppError(
      "Email and password are required.",
      400,
      "VALIDATION_ERROR"
    );
  }

  const user = await UserService.getByEmail(email);

  if (!user) {
    throw new AppError(
      "Invalid email or password.",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  const validPassword = verifyPassword(
    password,
    user.password
  );

  if (!validPassword) {
    throw new AppError(
      "Invalid email or password.",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  await UserService.updateLastLogin(user.id);

  const token = generateAccessToken({
    sub: user.id,
    role: user.role
  });

  return success(
    res,
    {
      accessToken: token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    },
    "Login successful."
  );
});

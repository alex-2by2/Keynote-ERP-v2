// server/src/controllers/AuthController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

import UserService from "../services/UserService.js";

import { generateAccessToken } from "../utils/jwt.js";
import { verifyPassword } from "../utils/password.js";
import { validateLogin } from "../validators/auth.validator.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = validateLogin(req.body);

  const user = await UserService.getByEmail(email);

  if (!user) {
    throw new AppError(
      "Invalid email or password.",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  const passwordMatched = verifyPassword(password, user.password);

  if (!passwordMatched) {
    throw new AppError(
      "Invalid email or password.",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  await UserService.updateLastLogin(user.id);

  const accessToken = generateAccessToken({
    sub: user.id,
    role: user.role
  });

  return success(
    res,
    {
      accessToken,
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

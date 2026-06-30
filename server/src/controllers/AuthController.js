// server/src/controllers/AuthController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

import AuthService from "../services/AuthService.js";
import RefreshTokenService from "../services/RefreshTokenService.js";

import { validateLogin } from "../validators/auth.validator.js";

export const login = asyncHandler(async (req, res) => {
  const credentials = validateLogin(req.body);

  const auth = await AuthService.login(
    credentials.email,
    credentials.password
  );

  const refreshToken = await RefreshTokenService.issue(
    auth.user.id,
    req.ip
  );

  return success(
    res,
    {
      accessToken: auth.accessToken,
      refreshToken: refreshToken.token,
      expiresAt: refreshToken.expiresAt,
      user: auth.user
    },
    "Login successful."
  );
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = String(req.body.refreshToken || "").trim();

  if (refreshToken) {
    await RefreshTokenService.revoke(
      refreshToken,
      req.ip
    );
  }

  return success(
    res,
    null,
    "Logout successful."
  );
});

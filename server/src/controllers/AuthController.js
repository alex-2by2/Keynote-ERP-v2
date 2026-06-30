// server/src/controllers/AuthController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

import AuthService from "../services/AuthService.js";
import RefreshTokenService from "../services/RefreshTokenService.js";

import { validateLogin } from "../validators/auth.validator.js";
import { generateAccessToken } from "../utils/jwt.js";

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

export const refresh = asyncHandler(async (req, res) => {
  const token = String(req.body.refreshToken || "").trim();

  const refreshToken =
    await RefreshTokenService.verify(token);

  const accessToken = generateAccessToken({
    sub: refreshToken.user.id,
    role: refreshToken.user.role,
    email: refreshToken.user.email
  });

  return success(
    res,
    {
      accessToken
    },
    "Access token refreshed."
  );
});

export const logout = asyncHandler(async (req, res) => {
  const token = String(req.body.refreshToken || "").trim();

  if (token) {
    await RefreshTokenService.revoke(
      token,
      req.ip
    );
  }

  return success(
    res,
    null,
    "Logout successful."
  );
});

// server/src/services/RefreshTokenService.js

import crypto from "node:crypto";

import RefreshTokenRepository from "../repositories/RefreshTokenRepository.js";
import AppError from "../utils/AppError.js";

const REFRESH_TOKEN_TTL_DAYS = 30;

export default class RefreshTokenService {
  static async issue(userId, ipAddress = null) {
    const token = crypto.randomBytes(64).toString("hex");

    const expiresAt = new Date(
      Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000
    );

    return RefreshTokenRepository.create({
      user: userId,
      token,
      expiresAt,
      createdByIp: ipAddress
    });
  }

  static async verify(token) {
    const refreshToken =
      await RefreshTokenRepository.findByToken(token);

    if (!refreshToken) {
      throw new AppError(
        "Invalid refresh token.",
        401,
        "INVALID_REFRESH_TOKEN"
      );
    }

    if (refreshToken.revokedAt) {
      throw new AppError(
        "Refresh token has been revoked.",
        401,
        "REFRESH_TOKEN_REVOKED"
      );
    }

    if (refreshToken.expiresAt < new Date()) {
      throw new AppError(
        "Refresh token has expired.",
        401,
        "REFRESH_TOKEN_EXPIRED"
      );
    }

    return refreshToken;
  }

  static async revoke(token, ipAddress = null) {
    return RefreshTokenRepository.revoke(
      token,
      ipAddress
    );
  }

  static async revokeAll(userId, ipAddress = null) {
    return RefreshTokenRepository.revokeAllForUser(
      userId,
      ipAddress
    );
  }
}

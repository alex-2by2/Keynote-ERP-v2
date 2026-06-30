// server/src/utils/jwt.js

import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { env } from "../config/env.js";

const ACCESS_TOKEN_EXPIRES_IN = env.jwtExpiresIn;
const REFRESH_TOKEN_EXPIRES_IN = "30d";

export function generateAccessToken(payload) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

export function getRefreshTokenExpiry() {
  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + 30
  );

  return expiresAt;
}

export const REFRESH_TOKEN_EXPIRES_IN_DAYS = 30;

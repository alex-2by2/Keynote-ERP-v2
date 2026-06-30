// server/src/services/AuthService.js

import AppError from "../utils/AppError.js";
import UserService from "./UserService.js";

import {
  verifyPassword
} from "../utils/password.js";

import {
  generateAccessToken
} from "../utils/jwt.js";

export default class AuthService {
  static async login(email, password) {
    const user = await UserService.getByEmail(email);

    if (!user) {
      throw new AppError(
        "Invalid email or password.",
        401,
        "INVALID_CREDENTIALS"
      );
    }

    if (!user.isActive) {
      throw new AppError(
        "User account is disabled.",
        403,
        "ACCOUNT_DISABLED"
      );
    }

    const passwordMatched = verifyPassword(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError(
        "Invalid email or password.",
        401,
        "INVALID_CREDENTIALS"
      );
    }

    await UserService.updateLastLogin(user.id);

    return {
      accessToken: generateAccessToken({
        sub: user.id,
        role: user.role,
        email: user.email
      }),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    };
  }
}

// server/src/services/UserService.js

import UserRepository from "../repositories/UserRepository.js";
import AppError from "../utils/AppError.js";
import { hashPassword } from "../utils/password.js";

export default class UserService {
 static async create(
  payload,
  session = null
) {
    const email = payload.email.trim().toLowerCase();

    const exists = await UserRepository.existsByEmail(email);

    if (exists) {
      throw new AppError(
        "Email already exists.",
        409,
        "EMAIL_ALREADY_EXISTS"
      );
    }

   const user =
  await UserRepository.create(
    {
      ...payload,
      email,
      password: hashPassword(
        payload.password
      )
    },
    session
  );

return user;
  }

  static async getById(id) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new AppError(
        "User not found.",
        404,
        "USER_NOT_FOUND"
      );
    }

    return user;
  }

  static async getByEmail(email) {
    return UserRepository.findByEmail(email);
  }

  static async update(id, payload) {
    const user = await this.getById(id);

    if (payload.password) {
      payload.password = hashPassword(payload.password);
    }

    return UserRepository.update(user.id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return UserRepository.delete(id);
  }

  static async list() {
    return UserRepository.list({
      isActive: true
    });
  }

  static async updateLastLogin(id) {
    return UserRepository.updateLastLogin(id);
  }
}

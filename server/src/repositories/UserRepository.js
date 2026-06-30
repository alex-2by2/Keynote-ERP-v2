// server/src/repositories/UserRepository.js

import User from "../models/User.js";

export default class UserRepository {
  static async create(payload) {
    return User.create(payload);
  }

  static async findById(id) {
    return User.findById(id);
  }

  static async findByEmail(email) {
    return User.findOne({
      email: email.trim().toLowerCase()
    }).select("+password");
  }

  static async existsByEmail(email) {
    return User.exists({
      email: email.trim().toLowerCase()
    });
  }

  static async updateLastLogin(id, date = new Date()) {
    return User.findByIdAndUpdate(
      id,
      {
        lastLoginAt: date
      },
      {
        new: true
      }
    );
  }

  static async update(id, payload) {
    return User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });
  }

  static async delete(id) {
    return User.findByIdAndDelete(id);
  }

  static async list(filter = {}) {
    return User.find(filter).sort({
      createdAt: -1
    });
  }
}

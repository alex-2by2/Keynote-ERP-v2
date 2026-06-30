// server/src/repositories/RoleRepository.js

import Role from "../models/Role.js";

export default class RoleRepository {
  static async create(payload) {
    return Role.create(payload);
  }

  static async findById(id) {
    return Role.findById(id).populate("permissions");
  }

  static async findByCode(code) {
    return Role.findOne({
      code: code.trim().toUpperCase()
    }).populate("permissions");
  }

  static async list(filter = {}) {
    return Role.find(filter)
      .populate("permissions")
      .sort({ name: 1 });
  }

  static async update(id, payload) {
    return Role.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    }).populate("permissions");
  }

  static async delete(id) {
    return Role.findByIdAndDelete(id);
  }

  static async existsByCode(code) {
    return Role.exists({
      code: code.trim().toUpperCase()
    });
  }
}

// server/src/repositories/PermissionRepository.js

import Permission from "../models/Permission.js";

export default class PermissionRepository {
static async create(
  payload,
  session = null
) {
  if (session) {
    const [permission] =
      await Permission.create(
        [payload],
        { session }
      );

    return permission;
  }

  return Permission.create(payload);
}
  static async findById(id) {
    return Permission.findById(id);
  }

  static async findByCode(code) {
    return Permission.findOne({
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Permission.find(filter).sort({
      module: 1,
      name: 1
    });
  }

  static async update(id, payload) {
    return Permission.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    );
  }

  static async delete(id) {
    return Permission.findByIdAndDelete(id);
  }

  static async existsByCode(code) {
    return Permission.exists({
      code: code.trim().toUpperCase()
    });
  }
}

// server/src/services/PermissionService.js

import PermissionRepository from "../repositories/PermissionRepository.js";
import AppError from "../utils/AppError.js";

export default class PermissionService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

    const exists = await PermissionRepository.existsByCode(code);

    if (exists) {
      throw new AppError(
        "Permission code already exists.",
        409,
        "PERMISSION_ALREADY_EXISTS"
      );
    }

    return PermissionRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const permission = await PermissionRepository.findById(id);

    if (!permission) {
      throw new AppError(
        "Permission not found.",
        404,
        "PERMISSION_NOT_FOUND"
      );
    }

    return permission;
  }

  static async getByCode(code) {
    return PermissionRepository.findByCode(code);
  }

  static async list() {
    return PermissionRepository.list({
      active: true
    });
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code.trim().toUpperCase();
    }

    return PermissionRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return PermissionRepository.delete(id);
  }
}

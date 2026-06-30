// server/src/services/RoleService.js

import RoleRepository from "../repositories/RoleRepository.js";
import PermissionRepository from "../repositories/PermissionRepository.js";
import AppError from "../utils/AppError.js";

export default class RoleService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

    const exists = await RoleRepository.existsByCode(code);

    if (exists) {
      throw new AppError(
        "Role code already exists.",
        409,
        "ROLE_ALREADY_EXISTS"
      );
    }

    const permissions = await this.#resolvePermissions(
      payload.permissions || []
    );

    return RoleRepository.create({
      ...payload,
      code,
      permissions
    });
  }

  static async getById(id) {
    const role = await RoleRepository.findById(id);

    if (!role) {
      throw new AppError(
        "Role not found.",
        404,
        "ROLE_NOT_FOUND"
      );
    }

    return role;
  }

  static async getByCode(code) {
    return RoleRepository.findByCode(code);
  }

  static async list() {
    return RoleRepository.list({
      active: true
    });
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code.trim().toUpperCase();
    }

    if (payload.permissions) {
      payload.permissions = await this.#resolvePermissions(
        payload.permissions
      );
    }

    return RoleRepository.update(id, payload);
  }

  static async delete(id) {
    const role = await this.getById(id);

    if (role.system) {
      throw new AppError(
        "System roles cannot be deleted.",
        403,
        "SYSTEM_ROLE"
      );
    }

    return RoleRepository.delete(id);
  }

  static async #resolvePermissions(permissionIds) {
    const resolved = [];

    for (const id of permissionIds) {
      const permission = await PermissionRepository.findById(id);

      if (!permission) {
        throw new AppError(
          `Permission not found: ${id}`,
          404,
          "PERMISSION_NOT_FOUND"
        );
      }

      resolved.push(permission._id);
    }

    return resolved;
  }
}

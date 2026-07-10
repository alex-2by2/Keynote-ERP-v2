// server/src/services/RoleService.js

import RoleRepository from "../repositories/RoleRepository.js";
import PermissionRepository from "../repositories/PermissionRepository.js";
import RolePermissionRepository from "../repositories/RolePermissionRepository.js";
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

    const permissionIds = await this.#resolvePermissions(
      payload.permissions || []
    );

    const role = await RoleRepository.create({
      code,
      name: payload.name,
      description: payload.description,
      active: payload.active !== false
    });

    await this.#syncPermissions(role.id, permissionIds);

    return this.getById(role.id);
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

    return this.#attachPermissions(role);
  }

  static async getByCode(code) {
    const role = await RoleRepository.findByCode(code);

    if (!role) {
      return null;
    }

    return this.#attachPermissions(role);
  }

  static async list() {
    const roles = await RoleRepository.list({
      active: true
    });

    return Promise.all(
      roles.map(role => this.#attachPermissions(role))
    );
  }

  static async update(id, payload) {
    await this.getById(id);

    const updateData = { ...payload };
    const permissions = updateData.permissions;

    delete updateData.permissions;

    if (updateData.code) {
      updateData.code = updateData.code
        .trim()
        .toUpperCase();
    }

    await RoleRepository.update(id, updateData);

    if (permissions) {
      const permissionIds =
        await this.#resolvePermissions(permissions);

      await this.#syncPermissions(id, permissionIds);
    }

    return this.getById(id);
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

  static async seedDefaults(session = null) {
    const { DEFAULT_ROLES } = await import(
      "../seed/roles.seed.js"
    );

    const createdRoles = [];

    for (const role of DEFAULT_ROLES) {
      const exists = await RoleRepository.existsByCode(
        role.code
      );

      if (exists) {
        continue;
      }

      const created = await RoleRepository.create(
        {
          ...role,
          active: true
        },
        session
      );

      createdRoles.push(created);
    }

    return createdRoles;
  }

  static async #resolvePermissions(permissionIds) {
    const resolved = [];

    for (const id of permissionIds) {
      const permission =
        await PermissionRepository.findById(id);

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

  // Replaces the full set of permissions for a role.
  // Simpler and safer than diffing old vs new.
  static async #syncPermissions(roleId, permissionIds) {
    const existing =
      await RolePermissionRepository.findByRole(roleId);

    for (const rolePermission of existing) {
      await RolePermissionRepository.delete(
        rolePermission._id
      );
    }

    for (const permissionId of permissionIds) {
      await RolePermissionRepository.create({
        role: roleId,
        permission: permissionId
      });
    }
  }

  static async #attachPermissions(role) {
    const rolePermissions =
      await RolePermissionRepository.findByRole(role.id);

    const permissions = rolePermissions
      .filter(rolePermission => rolePermission.permission)
      .map(rolePermission => rolePermission.permission);

    const roleObject = role.toObject
      ? role.toObject()
      : role;

    return { ...roleObject, permissions };
  }
}

// server/src/repositories/RolePermissionRepository.js

import RolePermission from "../models/RolePermission.js";

export default class RolePermissionRepository {
  static async create(payload, session = null) {
    if (session) {
      const [rolePermission] =
        await RolePermission.create(
          [payload],
          { session }
        );

      return rolePermission;
    }

    return RolePermission.create(payload);
  }

  static async findByRole(roleId) {
    return RolePermission.find({
      role: roleId
    }).populate("permission");
  }

  static async findByPermission(permissionId) {
    return RolePermission.find({
      permission: permissionId
    }).populate("role");
  }

  static async delete(id, session = null) {
    const query =
      RolePermission.findByIdAndDelete(id);

    if (session) {
      query.session(session);
    }

    return query;
  }
}

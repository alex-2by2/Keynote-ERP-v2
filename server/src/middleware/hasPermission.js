// server/src/middleware/hasPermission.js

import AppError from "../utils/AppError.js";
import RoleService from "../services/RoleService.js";

export default function hasPermission(...requiredPermissions) {
  const required = new Set(
    requiredPermissions.map((permission) =>
      permission.trim().toUpperCase()
    )
  );

  return async (req, res, next) => {
    try {
      if (!req.currentUser) {
        throw new AppError(
          "Authentication required.",
          401,
          "UNAUTHORIZED"
        );
      }

      const role = await RoleService.getByCode(req.currentUser.role);

      if (!role) {
        throw new AppError(
          "Role not found.",
          403,
          "ROLE_NOT_FOUND"
        );
      }

      const granted = new Set(
        role.permissions.map((permission) => permission.code)
      );

      const authorized = [...required].every((permission) =>
        granted.has(permission)
      );

      if (!authorized) {
        throw new AppError(
          "Insufficient permissions.",
          403,
          "INSUFFICIENT_PERMISSIONS"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

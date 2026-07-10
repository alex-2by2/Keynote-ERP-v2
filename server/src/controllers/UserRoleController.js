// server/src/controllers/UserRoleController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import UserRoleService from "../services/UserRoleService.js";

export const assignUserRole = asyncHandler(
  async (req, res) => {
    const userRole = await UserRoleService.assign(
      req.body
    );

    return success(
      res,
      userRole,
      "Role assigned successfully."
    );
  }
);

export const listUserRoles = asyncHandler(
  async (req, res) => {
    const userRoles = await UserRoleService.list(
      req.query.company
    );

    return success(res, userRoles);
  }
);

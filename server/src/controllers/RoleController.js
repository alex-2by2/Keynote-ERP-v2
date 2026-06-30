// server/src/controllers/RoleController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import RoleService from "../services/RoleService.js";

export const createRole = asyncHandler(async (req, res) => {
  const role = await RoleService.create(req.body);

  return success(
    res,
    role,
    "Role created successfully.",
    201
  );
});

export const getRole = asyncHandler(async (req, res) => {
  const role = await RoleService.getById(req.params.id);

  return success(res, role);
});

export const listRoles = asyncHandler(async (req, res) => {
  const roles = await RoleService.list();

  return success(res, roles);
});

export const updateRole = asyncHandler(async (req, res) => {
  const role = await RoleService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    role,
    "Role updated successfully."
  );
});

export const deleteRole = asyncHandler(async (req, res) => {
  await RoleService.delete(req.params.id);

  return success(
    res,
    null,
    "Role deleted successfully."
  );
});

// server/src/controllers/PermissionController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import PermissionService from "../services/PermissionService.js";

export const createPermission = asyncHandler(async (req, res) => {
  const permission = await PermissionService.create(req.body);

  return success(
    res,
    permission,
    "Permission created successfully.",
    201
  );
});

export const getPermission = asyncHandler(async (req, res) => {
  const permission = await PermissionService.getById(req.params.id);

  return success(res, permission);
});

export const listPermissions = asyncHandler(async (req, res) => {
  const permissions = await PermissionService.list();

  return success(res, permissions);
});

export const updatePermission = asyncHandler(async (req, res) => {
  const permission = await PermissionService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    permission,
    "Permission updated successfully."
  );
});

export const deletePermission = asyncHandler(async (req, res) => {
  await PermissionService.delete(req.params.id);

  return success(
    res,
    null,
    "Permission deleted successfully."
  );
});

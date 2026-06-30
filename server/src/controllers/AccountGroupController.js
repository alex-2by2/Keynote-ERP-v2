// server/src/controllers/AccountGroupController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import AccountGroupService from "../services/AccountGroupService.js";

export const createAccountGroup = asyncHandler(async (req, res) => {
  const accountGroup =
    await AccountGroupService.create(req.body);

  return success(
    res,
    accountGroup,
    "Account group created successfully.",
    201
  );
});

export const getAccountGroup = asyncHandler(async (req, res) => {
  const accountGroup =
    await AccountGroupService.getById(
      req.params.id
    );

  return success(res, accountGroup);
});

export const listAccountGroups = asyncHandler(async (req, res) => {
  const accountGroups =
    await AccountGroupService.list(
      req.query.company || null
    );

  return success(res, accountGroups);
});

export const updateAccountGroup = asyncHandler(async (req, res) => {
  const accountGroup =
    await AccountGroupService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    accountGroup,
    "Account group updated successfully."
  );
});

export const deleteAccountGroup = asyncHandler(async (req, res) => {
  await AccountGroupService.delete(
    req.params.id
  );

  return success(
    res,
    null,
    "Account group deleted successfully."
  );
});

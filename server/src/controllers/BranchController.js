// server/src/controllers/BranchController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import BranchService from "../services/BranchService.js";

export const createBranch = asyncHandler(async (req, res) => {
  const branch = await BranchService.create(req.body);

  return success(
    res,
    branch,
    "Branch created successfully.",
    201
  );
});

export const getBranch = asyncHandler(async (req, res) => {
  const branch = await BranchService.getById(req.params.id);

  return success(res, branch);
});

export const listBranches = asyncHandler(async (req, res) => {
  const branches = await BranchService.list();

  return success(res, branches);
});

export const updateBranch = asyncHandler(async (req, res) => {
  const branch = await BranchService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    branch,
    "Branch updated successfully."
  );
});

export const deleteBranch = asyncHandler(async (req, res) => {
  await BranchService.delete(req.params.id);

  return success(
    res,
    null,
    "Branch deleted successfully."
  );
});

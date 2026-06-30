// server/src/controllers/DesignationController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import DesignationService from "../services/DesignationService.js";

export const createDesignation = asyncHandler(async (req, res) => {
  const designation = await DesignationService.create(req.body);

  return success(
    res,
    designation,
    "Designation created successfully.",
    201
  );
});

export const getDesignation = asyncHandler(async (req, res) => {
  const designation = await DesignationService.getById(req.params.id);

  return success(res, designation);
});

export const listDesignations = asyncHandler(async (req, res) => {
  const designations = await DesignationService.list();

  return success(res, designations);
});

export const updateDesignation = asyncHandler(async (req, res) => {
  const designation = await DesignationService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    designation,
    "Designation updated successfully."
  );
});

export const deleteDesignation = asyncHandler(async (req, res) => {
  await DesignationService.delete(req.params.id);

  return success(
    res,
    null,
    "Designation deleted successfully."
  );
});

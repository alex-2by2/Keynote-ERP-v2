// server/src/controllers/CostCenterController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import CostCenterService from "../services/CostCenterService.js";

export const createCostCenter = asyncHandler(async (req, res) => {
  const costCenter = await CostCenterService.create(req.body);

  return success(
    res,
    costCenter,
    "Cost center created successfully.",
    201
  );
});

export const getCostCenter = asyncHandler(async (req, res) => {
  const costCenter = await CostCenterService.getById(
    req.params.id
  );

  return success(res, costCenter);
});

export const listCostCenters = asyncHandler(async (req, res) => {
  const costCenters = await CostCenterService.list(
    req.query.company || null
  );

  return success(res, costCenters);
});

export const updateCostCenter = asyncHandler(async (req, res) => {
  const costCenter = await CostCenterService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    costCenter,
    "Cost center updated successfully."
  );
});

export const deleteCostCenter = asyncHandler(async (req, res) => {
  await CostCenterService.delete(req.params.id);

  return success(
    res,
    null,
    "Cost center deleted successfully."
  );
});

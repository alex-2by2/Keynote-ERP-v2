// server/src/controllers/UnitOfMeasureController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import UnitOfMeasureService from "../services/UnitOfMeasureService.js";

export const createUnitOfMeasure = asyncHandler(async (req, res) => {
  const unit = await UnitOfMeasureService.create(req.body);

  return success(
    res,
    unit,
    "Unit of measure created successfully.",
    201
  );
});

export const getUnitOfMeasure = asyncHandler(async (req, res) => {
  const unit = await UnitOfMeasureService.getById(
    req.params.id
  );

  return success(res, unit);
});

export const listUnitOfMeasures = asyncHandler(async (req, res) => {
  const units = await UnitOfMeasureService.list(
    req.query.company || null
  );

  return success(res, units);
});

export const updateUnitOfMeasure = asyncHandler(async (req, res) => {
  const unit = await UnitOfMeasureService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    unit,
    "Unit of measure updated successfully."
  );
});

export const deleteUnitOfMeasure = asyncHandler(async (req, res) => {
  await UnitOfMeasureService.delete(req.params.id);

  return success(
    res,
    null,
    "Unit of measure deleted successfully."
  );
});

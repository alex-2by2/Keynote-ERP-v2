// server/src/controllers/WarehouseController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import WarehouseService from "../services/WarehouseService.js";

export const createWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await WarehouseService.create(req.body);

  return success(
    res,
    warehouse,
    "Warehouse created successfully.",
    201
  );
});

export const getWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await WarehouseService.getById(
    req.params.id
  );

  return success(res, warehouse);
});

export const listWarehouses = asyncHandler(async (req, res) => {
  const warehouses = await WarehouseService.list(
    req.query.company || null
  );

  return success(res, warehouses);
});

export const updateWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await WarehouseService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    warehouse,
    "Warehouse updated successfully."
  );
});

export const deleteWarehouse = asyncHandler(async (req, res) => {
  await WarehouseService.delete(req.params.id);

  return success(
    res,
    null,
    "Warehouse deleted successfully."
  );
});

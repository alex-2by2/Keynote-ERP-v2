// server/src/controllers/SupplierController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import SupplierService from "../services/SupplierService.js";

export const createSupplier = asyncHandler(async (req, res) => {
  const supplier = await SupplierService.create(req.body);

  return success(
    res,
    supplier,
    "Supplier created successfully.",
    201
  );
});

export const getSupplier = asyncHandler(async (req, res) => {
  const supplier = await SupplierService.getById(
    req.params.id
  );

  return success(res, supplier);
});

export const listSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await SupplierService.list(
    req.query.company || null
  );

  return success(res, suppliers);
});

export const updateSupplier = asyncHandler(async (req, res) => {
  const supplier = await SupplierService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    supplier,
    "Supplier updated successfully."
  );
});

export const deleteSupplier = asyncHandler(async (req, res) => {
  await SupplierService.delete(req.params.id);

  return success(
    res,
    null,
    "Supplier deleted successfully."
  );
});

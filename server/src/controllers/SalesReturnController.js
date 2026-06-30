// server/src/controllers/SalesReturnController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import SalesReturnService from "../services/SalesReturnService.js";

export const createSalesReturn = asyncHandler(async (req, res) => {
  const salesReturn = await SalesReturnService.create(
    req.body
  );

  return success(
    res,
    salesReturn,
    "Sales return created successfully.",
    201
  );
});

export const getSalesReturn = asyncHandler(async (req, res) => {
  const salesReturn =
    await SalesReturnService.getById(
      req.params.id
    );

  return success(res, salesReturn);
});

export const listSalesReturns = asyncHandler(async (req, res) => {
  const salesReturns =
    await SalesReturnService.list(
      req.query.company || null
    );

  return success(res, salesReturns);
});

export const updateSalesReturn = asyncHandler(async (req, res) => {
  const salesReturn =
    await SalesReturnService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    salesReturn,
    "Sales return updated successfully."
  );
});

export const deleteSalesReturn = asyncHandler(async (req, res) => {
  await SalesReturnService.delete(
    req.params.id
  );

  return success(
    res,
    null,
    "Sales return deleted successfully."
  );
});

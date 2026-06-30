// server/src/controllers/StockController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import StockService from "../services/StockService.js";

export const createStock = asyncHandler(async (req, res) => {
  const stock = await StockService.create(req.body);

  return success(
    res,
    stock,
    "Stock record created successfully.",
    201
  );
});

export const getStock = asyncHandler(async (req, res) => {
  const stock = await StockService.getById(
    req.params.id
  );

  return success(res, stock);
});

export const listStocks = asyncHandler(async (req, res) => {
  const stocks = await StockService.list(
    req.query.company || null,
    req.query.warehouse || null
  );

  return success(res, stocks);
});

export const updateStock = asyncHandler(async (req, res) => {
  const stock = await StockService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    stock,
    "Stock record updated successfully."
  );
});

export const deleteStock = asyncHandler(async (req, res) => {
  await StockService.delete(req.params.id);

  return success(
    res,
    null,
    "Stock record deleted successfully."
  );
});

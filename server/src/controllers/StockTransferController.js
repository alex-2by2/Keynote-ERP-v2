// server/src/controllers/StockTransferController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import StockTransferService from "../services/StockTransferService.js";

export const createStockTransfer = asyncHandler(async (req, res) => {
  const stockTransfer = await StockTransferService.create(
    req.body
  );

  return success(
    res,
    stockTransfer,
    "Stock transfer created successfully.",
    201
  );
});

export const getStockTransfer = asyncHandler(async (req, res) => {
  const stockTransfer =
    await StockTransferService.getById(
      req.params.id
    );

  return success(res, stockTransfer);
});

export const listStockTransfers = asyncHandler(async (req, res) => {
  const stockTransfers =
    await StockTransferService.list(
      req.query.company || null
    );

  return success(res, stockTransfers);
});

export const updateStockTransfer = asyncHandler(async (req, res) => {
  const stockTransfer =
    await StockTransferService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    stockTransfer,
    "Stock transfer updated successfully."
  );
});

export const deleteStockTransfer = asyncHandler(async (req, res) => {
  await StockTransferService.delete(req.params.id);

  return success(
    res,
    null,
    "Stock transfer deleted successfully."
  );
});

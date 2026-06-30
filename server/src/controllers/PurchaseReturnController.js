// server/src/controllers/PurchaseReturnController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import PurchaseReturnService from "../services/PurchaseReturnService.js";

export const createPurchaseReturn = asyncHandler(async (req, res) => {
  const purchaseReturn =
    await PurchaseReturnService.create(req.body);

  return success(
    res,
    purchaseReturn,
    "Purchase return created successfully.",
    201
  );
});

export const getPurchaseReturn = asyncHandler(async (req, res) => {
  const purchaseReturn =
    await PurchaseReturnService.getById(
      req.params.id
    );

  return success(res, purchaseReturn);
});

export const listPurchaseReturns = asyncHandler(async (req, res) => {
  const purchaseReturns =
    await PurchaseReturnService.list(
      req.query.company || null
    );

  return success(res, purchaseReturns);
});

export const updatePurchaseReturn = asyncHandler(async (req, res) => {
  const purchaseReturn =
    await PurchaseReturnService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    purchaseReturn,
    "Purchase return updated successfully."
  );
});

export const deletePurchaseReturn = asyncHandler(async (req, res) => {
  await PurchaseReturnService.delete(
    req.params.id
  );

  return success(
    res,
    null,
    "Purchase return deleted successfully."
  );
});

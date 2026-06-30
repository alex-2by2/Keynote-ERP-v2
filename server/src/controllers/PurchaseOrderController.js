// server/src/controllers/PurchaseOrderController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import PurchaseOrderService from "../services/PurchaseOrderService.js";

export const createPurchaseOrder = asyncHandler(async (req, res) => {
  const purchaseOrder = await PurchaseOrderService.create(
    req.body
  );

  return success(
    res,
    purchaseOrder,
    "Purchase order created successfully.",
    201
  );
});

export const getPurchaseOrder = asyncHandler(async (req, res) => {
  const purchaseOrder =
    await PurchaseOrderService.getById(
      req.params.id
    );

  return success(res, purchaseOrder);
});

export const listPurchaseOrders = asyncHandler(async (req, res) => {
  const purchaseOrders =
    await PurchaseOrderService.list(
      req.query.company || null
    );

  return success(res, purchaseOrders);
});

export const updatePurchaseOrder = asyncHandler(async (req, res) => {
  const purchaseOrder =
    await PurchaseOrderService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    purchaseOrder,
    "Purchase order updated successfully."
  );
});

export const deletePurchaseOrder = asyncHandler(async (req, res) => {
  await PurchaseOrderService.delete(req.params.id);

  return success(
    res,
    null,
    "Purchase order deleted successfully."
  );
});

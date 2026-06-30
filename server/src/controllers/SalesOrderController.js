// server/src/controllers/SalesOrderController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import SalesOrderService from "../services/SalesOrderService.js";

export const createSalesOrder = asyncHandler(async (req, res) => {
  const salesOrder = await SalesOrderService.create(
    req.body
  );

  return success(
    res,
    salesOrder,
    "Sales order created successfully.",
    201
  );
});

export const getSalesOrder = asyncHandler(async (req, res) => {
  const salesOrder =
    await SalesOrderService.getById(
      req.params.id
    );

  return success(res, salesOrder);
});

export const listSalesOrders = asyncHandler(async (req, res) => {
  const salesOrders =
    await SalesOrderService.list(
      req.query.company || null
    );

  return success(res, salesOrders);
});

export const updateSalesOrder = asyncHandler(async (req, res) => {
  const salesOrder =
    await SalesOrderService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    salesOrder,
    "Sales order updated successfully."
  );
});

export const deleteSalesOrder = asyncHandler(async (req, res) => {
  await SalesOrderService.delete(req.params.id);

  return success(
    res,
    null,
    "Sales order deleted successfully."
  );
});

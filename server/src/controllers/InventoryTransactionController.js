// server/src/controllers/InventoryTransactionController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import InventoryTransactionService from "../services/InventoryTransactionService.js";

export const createInventoryTransaction = asyncHandler(
  async (req, res) => {
    const transaction =
      await InventoryTransactionService.create(
        req.body
      );

    return success(
      res,
      transaction,
      "Inventory transaction created successfully.",
      201
    );
  }
);

export const getInventoryTransaction = asyncHandler(
  async (req, res) => {
    const transaction =
      await InventoryTransactionService.getById(
        req.params.id
      );

    return success(res, transaction);
  }
);

export const listInventoryTransactions = asyncHandler(
  async (req, res) => {
    const transactions =
      await InventoryTransactionService.list({
        company: req.query.company,
        warehouse: req.query.warehouse,
        item: req.query.item
      });

    return success(res, transactions);
  }
);

export const deleteInventoryTransaction = asyncHandler(
  async (req, res) => {
    await InventoryTransactionService.delete(
      req.params.id
    );

    return success(
      res,
      null,
      "Inventory transaction deleted successfully."
    );
  }
);

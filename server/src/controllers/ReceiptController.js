// server/src/controllers/ReceiptController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

import ReceiptService from "../services/ReceiptService.js";

export const createReceipt = asyncHandler(
  async (req, res) => {
    const receipt =
      await ReceiptService.create(
        req.body
      );

    return success(
      res,
      receipt,
      "Receipt created successfully.",
      201
    );
  }
);

export const getReceipt = asyncHandler(
  async (req, res) => {
    const receipt =
      await ReceiptService.getById(
        req.params.id
      );

    return success(
      res,
      receipt
    );
  }
);

export const listReceipts = asyncHandler(
  async (req, res) => {
    const receipts =
      await ReceiptService.list(
        req.query.company || null
      );

    return success(
      res,
      receipts
    );
  }
);

export const updateReceipt = asyncHandler(
  async (req, res) => {
    const receipt =
      await ReceiptService.update(
        req.params.id,
        req.body
      );

    return success(
      res,
      receipt,
      "Receipt updated successfully."
    );
  }
);

export const deleteReceipt = asyncHandler(
  async (req, res) => {
    await ReceiptService.delete(
      req.params.id
    );

    return success(
      res,
      null,
      "Receipt deleted successfully."
    );
  }
);

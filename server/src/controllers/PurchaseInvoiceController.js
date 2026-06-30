// server/src/controllers/PurchaseInvoiceController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

import PurchaseInvoiceService from "../services/PurchaseInvoiceService.js";

export const createPurchaseInvoice = asyncHandler(
  async (req, res) => {
    const purchaseInvoice =
      await PurchaseInvoiceService.create(
        req.body
      );

    return success(
      res,
      purchaseInvoice,
      "Purchase invoice created successfully.",
      201
    );
  }
);

export const getPurchaseInvoice = asyncHandler(
  async (req, res) => {
    const purchaseInvoice =
      await PurchaseInvoiceService.getById(
        req.params.id
      );

    return success(
      res,
      purchaseInvoice
    );
  }
);

export const listPurchaseInvoices = asyncHandler(
  async (req, res) => {
    const purchaseInvoices =
      await PurchaseInvoiceService.list(
        req.query.company || null
      );

    return success(
      res,
      purchaseInvoices
    );
  }
);

export const updatePurchaseInvoice = asyncHandler(
  async (req, res) => {
    const purchaseInvoice =
      await PurchaseInvoiceService.update(
        req.params.id,
        req.body
      );

    return success(
      res,
      purchaseInvoice,
      "Purchase invoice updated successfully."
    );
  }
);

export const deletePurchaseInvoice = asyncHandler(
  async (req, res) => {
    await PurchaseInvoiceService.delete(
      req.params.id
    );

    return success(
      res,
      null,
      "Purchase invoice deleted successfully."
    );
  }
);

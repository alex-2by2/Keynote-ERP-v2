// server/src/controllers/SalesInvoiceController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

import SalesInvoiceService from "../services/SalesInvoiceService.js";

export const createSalesInvoice = asyncHandler(
  async (req, res) => {
    const salesInvoice =
      await SalesInvoiceService.create(
        req.body
      );

    return success(
      res,
      salesInvoice,
      "Sales invoice created successfully.",
      201
    );
  }
);

export const getSalesInvoice = asyncHandler(
  async (req, res) => {
    const salesInvoice =
      await SalesInvoiceService.getById(
        req.params.id
      );

    return success(
      res,
      salesInvoice
    );
  }
);

export const listSalesInvoices = asyncHandler(
  async (req, res) => {
    const salesInvoices =
      await SalesInvoiceService.list(
        req.query.company || null
      );

    return success(
      res,
      salesInvoices
    );
  }
);

export const updateSalesInvoice = asyncHandler(
  async (req, res) => {
    const salesInvoice =
      await SalesInvoiceService.update(
        req.params.id,
        req.body
      );

    return success(
      res,
      salesInvoice,
      "Sales invoice updated successfully."
    );
  }
);

export const deleteSalesInvoice = asyncHandler(
  async (req, res) => {
    await SalesInvoiceService.delete(
      req.params.id
    );

    return success(
      res,
      null,
      "Sales invoice deleted successfully."
    );
  }
);

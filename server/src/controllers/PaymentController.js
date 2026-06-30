// server/src/controllers/PaymentController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";

import PaymentService from "../services/PaymentService.js";

export const createPayment = asyncHandler(
  async (req, res) => {
    const payment =
      await PaymentService.create(
        req.body
      );

    return success(
      res,
      payment,
      "Payment created successfully.",
      201
    );
  }
);

export const getPayment = asyncHandler(
  async (req, res) => {
    const payment =
      await PaymentService.getById(
        req.params.id
      );

    return success(
      res,
      payment
    );
  }
);

export const listPayments = asyncHandler(
  async (req, res) => {
    const payments =
      await PaymentService.list(
        req.query.company || null
      );

    return success(
      res,
      payments
    );
  }
);

export const updatePayment = asyncHandler(
  async (req, res) => {
    const payment =
      await PaymentService.update(
        req.params.id,
        req.body
      );

    return success(
      res,
      payment,
      "Payment updated successfully."
    );
  }
);

export const deletePayment = asyncHandler(
  async (req, res) => {
    await PaymentService.delete(
      req.params.id
    );

    return success(
      res,
      null,
      "Payment deleted successfully."
    );
  }
);

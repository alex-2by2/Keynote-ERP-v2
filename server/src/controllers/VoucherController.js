// server/src/controllers/VoucherController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import VoucherService from "../services/VoucherService.js";

export const createVoucher = asyncHandler(async (req, res) => {
  const voucher = await VoucherService.create(
    req.body
  );

  return success(
    res,
    voucher,
    "Voucher created successfully.",
    201
  );
});

export const getVoucher = asyncHandler(async (req, res) => {
  const voucher = await VoucherService.getById(
    req.params.id
  );

  return success(res, voucher);
});

export const listVouchers = asyncHandler(async (req, res) => {
  const vouchers = await VoucherService.list(
    req.query.company || null
  );

  return success(res, vouchers);
});

export const updateVoucher = asyncHandler(async (req, res) => {
  const voucher = await VoucherService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    voucher,
    "Voucher updated successfully."
  );
});

export const deleteVoucher = asyncHandler(async (req, res) => {
  await VoucherService.delete(
    req.params.id
  );

  return success(
    res,
    null,
    "Voucher deleted successfully."
  );
});

// server/src/controllers/AccountLedgerController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import AccountLedgerService from "../services/AccountLedgerService.js";

export const createAccountLedger = asyncHandler(async (req, res) => {
  const accountLedger =
    await AccountLedgerService.create(req.body);

  return success(
    res,
    accountLedger,
    "Account ledger created successfully.",
    201
  );
});

export const getAccountLedger = asyncHandler(async (req, res) => {
  const accountLedger =
    await AccountLedgerService.getById(
      req.params.id
    );

  return success(res, accountLedger);
});

export const listAccountLedgers = asyncHandler(async (req, res) => {
  const accountLedgers =
    await AccountLedgerService.list(
      req.query.company || null
    );

  return success(res, accountLedgers);
});

export const updateAccountLedger = asyncHandler(async (req, res) => {
  const accountLedger =
    await AccountLedgerService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    accountLedger,
    "Account ledger updated successfully."
  );
});

export const deleteAccountLedger = asyncHandler(async (req, res) => {
  await AccountLedgerService.delete(
    req.params.id
  );

  return success(
    res,
    null,
    "Account ledger deleted successfully."
  );
});

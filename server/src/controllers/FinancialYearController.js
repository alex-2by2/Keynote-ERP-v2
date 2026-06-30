// server/src/controllers/FinancialYearController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import FinancialYearService from "../services/FinancialYearService.js";

export const createFinancialYear = asyncHandler(async (req, res) => {
  const financialYear = await FinancialYearService.create(req.body);

  return success(
    res,
    financialYear,
    "Financial year created successfully.",
    201
  );
});

export const getFinancialYear = asyncHandler(async (req, res) => {
  const financialYear = await FinancialYearService.getById(
    req.params.id
  );

  return success(res, financialYear);
});

export const listFinancialYears = asyncHandler(async (req, res) => {
  const financialYears = await FinancialYearService.list(
    req.query.company || null
  );

  return success(res, financialYears);
});

export const updateFinancialYear = asyncHandler(async (req, res) => {
  const financialYear = await FinancialYearService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    financialYear,
    "Financial year updated successfully."
  );
});

export const deleteFinancialYear = asyncHandler(async (req, res) => {
  await FinancialYearService.delete(req.params.id);

  return success(
    res,
    null,
    "Financial year deleted successfully."
  );
});

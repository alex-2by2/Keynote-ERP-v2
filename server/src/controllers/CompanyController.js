// server/src/controllers/CompanyController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import CompanyService from "../services/CompanyService.js";

export const createCompany = asyncHandler(async (req, res) => {
  const company = await CompanyService.create(req.body);

  return success(
    res,
    company,
    "Company created successfully.",
    201
  );
});

export const getCompany = asyncHandler(async (req, res) => {
  const company = await CompanyService.getById(req.params.id);

  return success(res, company);
});

export const listCompanies = asyncHandler(async (req, res) => {
  const companies = await CompanyService.list();

  return success(res, companies);
});

export const updateCompany = asyncHandler(async (req, res) => {
  const company = await CompanyService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    company,
    "Company updated successfully."
  );
});

export const deleteCompany = asyncHandler(async (req, res) => {
  await CompanyService.delete(req.params.id);

  return success(
    res,
    null,
    "Company deleted successfully."
  );
});

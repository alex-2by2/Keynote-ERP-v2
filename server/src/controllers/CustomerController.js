// server/src/controllers/CustomerController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import CustomerService from "../services/CustomerService.js";

export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await CustomerService.create(req.body);

  return success(
    res,
    customer,
    "Customer created successfully.",
    201
  );
});

export const getCustomer = asyncHandler(async (req, res) => {
  const customer = await CustomerService.getById(
    req.params.id
  );

  return success(res, customer);
});

export const listCustomers = asyncHandler(async (req, res) => {
  const customers = await CustomerService.list(
    req.query.company || null
  );

  return success(res, customers);
});

export const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await CustomerService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    customer,
    "Customer updated successfully."
  );
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  await CustomerService.delete(req.params.id);

  return success(
    res,
    null,
    "Customer deleted successfully."
  );
});

// server/src/controllers/EmployeeController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import EmployeeService from "../services/EmployeeService.js";

export const createEmployee = asyncHandler(async (req, res) => {
  const employee = await EmployeeService.create(req.body);

  return success(
    res,
    employee,
    "Employee created successfully.",
    201
  );
});

export const getEmployee = asyncHandler(async (req, res) => {
  const employee = await EmployeeService.getById(req.params.id);

  return success(res, employee);
});

export const listEmployees = asyncHandler(async (req, res) => {
  const employees = await EmployeeService.list();

  return success(res, employees);
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await EmployeeService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    employee,
    "Employee updated successfully."
  );
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  await EmployeeService.delete(req.params.id);

  return success(
    res,
    null,
    "Employee deleted successfully."
  );
});

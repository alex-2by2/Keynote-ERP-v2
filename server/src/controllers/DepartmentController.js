// server/src/controllers/DepartmentController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import DepartmentService from "../services/DepartmentService.js";

export const createDepartment = asyncHandler(async (req, res) => {
  const department = await DepartmentService.create(req.body);

  return success(
    res,
    department,
    "Department created successfully.",
    201
  );
});

export const getDepartment = asyncHandler(async (req, res) => {
  const department = await DepartmentService.getById(req.params.id);

  return success(res, department);
});

export const listDepartments = asyncHandler(async (req, res) => {
  const departments = await DepartmentService.list();

  return success(res, departments);
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const department = await DepartmentService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    department,
    "Department updated successfully."
  );
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  await DepartmentService.delete(req.params.id);

  return success(
    res,
    null,
    "Department deleted successfully."
  );
});

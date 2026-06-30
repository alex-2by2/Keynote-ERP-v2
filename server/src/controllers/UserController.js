// server/src/controllers/UserController.js

import UserService from "../services/UserService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import {
  validateCreateUser,
  validateUpdateUser
} from "../validators/user.validator.js";

export const createUser = asyncHandler(async (req, res) => {
  const payload = validateCreateUser(req.body);

  const user = await UserService.create(payload);

  return success(res, user, "User created successfully.", 201);
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await UserService.getById(req.params.id);

  return success(res, user);
});

export const listUsers = asyncHandler(async (req, res) => {
  const users = await UserService.list();

  return success(res, users);
});

export const updateUser = asyncHandler(async (req, res) => {
  const payload = validateUpdateUser(req.body);

  const user = await UserService.update(req.params.id, payload);

  return success(res, user, "User updated successfully.");
});

export const deleteUser = asyncHandler(async (req, res) => {
  await UserService.delete(req.params.id);

  return success(res, null, "User deleted successfully.");
});

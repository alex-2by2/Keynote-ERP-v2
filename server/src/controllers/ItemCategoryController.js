// server/src/controllers/ItemCategoryController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import ItemCategoryService from "../services/ItemCategoryService.js";

export const createItemCategory = asyncHandler(async (req, res) => {
  const category = await ItemCategoryService.create(req.body);

  return success(
    res,
    category,
    "Item category created successfully.",
    201
  );
});

export const getItemCategory = asyncHandler(async (req, res) => {
  const category = await ItemCategoryService.getById(
    req.params.id
  );

  return success(res, category);
});

export const listItemCategories = asyncHandler(async (req, res) => {
  const categories = await ItemCategoryService.list(
    req.query.company || null
  );

  return success(res, categories);
});

export const updateItemCategory = asyncHandler(async (req, res) => {
  const category = await ItemCategoryService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    category,
    "Item category updated successfully."
  );
});

export const deleteItemCategory = asyncHandler(async (req, res) => {
  await ItemCategoryService.delete(req.params.id);

  return success(
    res,
    null,
    "Item category deleted successfully."
  );
});

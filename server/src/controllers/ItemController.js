// server/src/controllers/ItemController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import ItemService from "../services/ItemService.js";

export const createItem = asyncHandler(async (req, res) => {
  const item = await ItemService.create(req.body);

  return success(
    res,
    item,
    "Item created successfully.",
    201
  );
});

export const getItem = asyncHandler(async (req, res) => {
  const item = await ItemService.getById(req.params.id);

  return success(res, item);
});

export const listItems = asyncHandler(async (req, res) => {
  const items = await ItemService.list(
    req.query.company || null
  );

  return success(res, items);
});

export const updateItem = asyncHandler(async (req, res) => {
  const item = await ItemService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    item,
    "Item updated successfully."
  );
});

export const deleteItem = asyncHandler(async (req, res) => {
  await ItemService.delete(req.params.id);

  return success(
    res,
    null,
    "Item deleted successfully."
  );
});

// server/src/controllers/GoodsIssueController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import GoodsIssueService from "../services/GoodsIssueService.js";

export const createGoodsIssue = asyncHandler(async (req, res) => {
  const goodsIssue = await GoodsIssueService.create(
    req.body
  );

  return success(
    res,
    goodsIssue,
    "Goods issue created successfully.",
    201
  );
});

export const getGoodsIssue = asyncHandler(async (req, res) => {
  const goodsIssue = await GoodsIssueService.getById(
    req.params.id
  );

  return success(res, goodsIssue);
});

export const listGoodsIssues = asyncHandler(async (req, res) => {
  const goodsIssues = await GoodsIssueService.list(
    req.query.company || null
  );

  return success(res, goodsIssues);
});

export const updateGoodsIssue = asyncHandler(async (req, res) => {
  const goodsIssue = await GoodsIssueService.update(
    req.params.id,
    req.body
  );

  return success(
    res,
    goodsIssue,
    "Goods issue updated successfully."
  );
});

export const deleteGoodsIssue = asyncHandler(async (req, res) => {
  await GoodsIssueService.delete(req.params.id);

  return success(
    res,
    null,
    "Goods issue deleted successfully."
  );
});

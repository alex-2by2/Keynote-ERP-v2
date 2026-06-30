// server/src/controllers/GoodsReceiptController.js

import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import GoodsReceiptService from "../services/GoodsReceiptService.js";

export const createGoodsReceipt = asyncHandler(async (req, res) => {
  const goodsReceipt = await GoodsReceiptService.create(
    req.body
  );

  return success(
    res,
    goodsReceipt,
    "Goods receipt created successfully.",
    201
  );
});

export const getGoodsReceipt = asyncHandler(async (req, res) => {
  const goodsReceipt =
    await GoodsReceiptService.getById(
      req.params.id
    );

  return success(res, goodsReceipt);
});

export const listGoodsReceipts = asyncHandler(async (req, res) => {
  const goodsReceipts =
    await GoodsReceiptService.list(
      req.query.company || null
    );

  return success(res, goodsReceipts);
});

export const updateGoodsReceipt = asyncHandler(async (req, res) => {
  const goodsReceipt =
    await GoodsReceiptService.update(
      req.params.id,
      req.body
    );

  return success(
    res,
    goodsReceipt,
    "Goods receipt updated successfully."
  );
});

export const deleteGoodsReceipt = asyncHandler(async (req, res) => {
  await GoodsReceiptService.delete(req.params.id);

  return success(
    res,
    null,
    "Goods receipt deleted successfully."
  );
});

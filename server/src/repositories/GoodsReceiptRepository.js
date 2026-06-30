// server/src/repositories/GoodsReceiptRepository.js

import GoodsReceipt from "../models/GoodsReceipt.js";

export default class GoodsReceiptRepository {
  static async create(payload) {
    return GoodsReceipt.create(payload);
  }

  static async findById(id) {
    return GoodsReceipt.findById(id)
      .populate("company", "code displayName")
      .populate("purchaseOrder", "orderNumber status")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async findByReceiptNumber(
    companyId,
    receiptNumber
  ) {
    return GoodsReceipt.findOne({
      company: companyId,
      receiptNumber: receiptNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("purchaseOrder", "orderNumber status")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async existsByReceiptNumber(
    companyId,
    receiptNumber
  ) {
    return GoodsReceipt.exists({
      company: companyId,
      receiptNumber: receiptNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return GoodsReceipt.find(filter)
      .populate("company", "code displayName")
      .populate("purchaseOrder", "orderNumber")
      .populate("warehouse", "code name")
      .sort({
        receiptDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return GoodsReceipt.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("purchaseOrder", "orderNumber")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async delete(id) {
    return GoodsReceipt.findByIdAndDelete(id);
  }
}

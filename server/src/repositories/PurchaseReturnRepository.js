// server/src/repositories/PurchaseReturnRepository.js

import PurchaseReturn from "../models/PurchaseReturn.js";

export default class PurchaseReturnRepository {
  static async create(payload) {
    return PurchaseReturn.create(payload);
  }

  static async findById(id) {
    return PurchaseReturn.findById(id)
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async findByReturnNumber(
    companyId,
    returnNumber
  ) {
    return PurchaseReturn.findOne({
      company: companyId,
      returnNumber: returnNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async existsByReturnNumber(
    companyId,
    returnNumber
  ) {
    return PurchaseReturn.exists({
      company: companyId,
      returnNumber: returnNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return PurchaseReturn.find(filter)
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("warehouse", "code name")
      .sort({
        returnDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return PurchaseReturn.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async delete(id) {
    return PurchaseReturn.findByIdAndDelete(id);
  }
}

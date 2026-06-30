// server/src/repositories/SalesReturnRepository.js

import SalesReturn from "../models/SalesReturn.js";

export default class SalesReturnRepository {
  static async create(payload) {
    return SalesReturn.create(payload);
  }

  static async findById(id) {
    return SalesReturn.findById(id)
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async findByReturnNumber(
    companyId,
    returnNumber
  ) {
    return SalesReturn.findOne({
      company: companyId,
      returnNumber: returnNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async existsByReturnNumber(
    companyId,
    returnNumber
  ) {
    return SalesReturn.exists({
      company: companyId,
      returnNumber: returnNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return SalesReturn.find(filter)
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("warehouse", "code name")
      .sort({
        returnDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return SalesReturn.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async delete(id) {
    return SalesReturn.findByIdAndDelete(id);
  }
}

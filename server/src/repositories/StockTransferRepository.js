// server/src/repositories/StockTransferRepository.js

import StockTransfer from "../models/StockTransfer.js";

export default class StockTransferRepository {
  static async create(payload) {
    return StockTransfer.create(payload);
  }

  static async findById(id) {
    return StockTransfer.findById(id)
      .populate("company", "code displayName")
      .populate("fromWarehouse", "code name")
      .populate("toWarehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async findByTransferNumber(
    companyId,
    transferNumber
  ) {
    return StockTransfer.findOne({
      company: companyId,
      transferNumber: transferNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("fromWarehouse", "code name")
      .populate("toWarehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async existsByTransferNumber(
    companyId,
    transferNumber
  ) {
    return StockTransfer.exists({
      company: companyId,
      transferNumber: transferNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return StockTransfer.find(filter)
      .populate("company", "code displayName")
      .populate("fromWarehouse", "code name")
      .populate("toWarehouse", "code name")
      .sort({
        transferDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return StockTransfer.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("fromWarehouse", "code name")
      .populate("toWarehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async delete(id) {
    return StockTransfer.findByIdAndDelete(id);
  }
}

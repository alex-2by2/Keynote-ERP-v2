// server/src/repositories/InventoryTransactionRepository.js

import InventoryTransaction from "../models/InventoryTransaction.js";

export default class InventoryTransactionRepository {
  static async create(payload) {
    return InventoryTransaction.create(payload);
  }

  static async findById(id) {
    return InventoryTransaction.findById(id)
      .populate("company", "code displayName")
      .populate("warehouse", "code name")
      .populate("item", "code sku name");
  }

  static async list(filter = {}) {
    return InventoryTransaction.find(filter)
      .populate("company", "code displayName")
      .populate("warehouse", "code name")
      .populate("item", "code sku name")
      .sort({
        transactionDate: -1,
        createdAt: -1
      });
  }

  static async findLatest(company, warehouse, item) {
    return InventoryTransaction.findOne({
      company,
      warehouse,
      item
    }).sort({
      transactionDate: -1,
      createdAt: -1
    });
  }

  static async update(id, payload) {
    return InventoryTransaction.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("warehouse", "code name")
      .populate("item", "code sku name");
  }

  static async delete(id) {
    return InventoryTransaction.findByIdAndDelete(id);
  }
}

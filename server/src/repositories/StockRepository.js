// server/src/repositories/StockRepository.js

import Stock from "../models/Stock.js";

export default class StockRepository {
  static async create(payload) {
    return Stock.create(payload);
  }

  static async findById(id) {
    return Stock.findById(id)
      .populate("company", "code displayName")
      .populate("warehouse", "code name")
      .populate("item", "code sku name");
  }

  static async findByWarehouseAndItem(
    companyId,
    warehouseId,
    itemId
  ) {
    return Stock.findOne({
      company: companyId,
      warehouse: warehouseId,
      item: itemId
    })
      .populate("company", "code displayName")
      .populate("warehouse", "code name")
      .populate("item", "code sku name");
  }

  static async list(filter = {}) {
    return Stock.find(filter)
      .populate("company", "code displayName")
      .populate("warehouse", "code name")
      .populate("item", "code sku name")
      .sort({
        updatedAt: -1
      });
  }

  static async update(id, payload) {
    return Stock.findByIdAndUpdate(
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
    return Stock.findByIdAndDelete(id);
  }
}

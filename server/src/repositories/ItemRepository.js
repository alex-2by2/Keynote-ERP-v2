// server/src/repositories/ItemRepository.js

import Item from "../models/Item.js";

export default class ItemRepository {
  static async create(payload) {
    return Item.create(payload);
  }

  static async findById(id) {
    return Item.findById(id)
      .populate("company", "code displayName")
      .populate("category", "code name")
      .populate("unit", "code name symbol");
  }

  static async findByCode(companyId, code) {
    return Item.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("category", "code name")
      .populate("unit", "code name symbol");
  }

  static async findBySku(companyId, sku) {
    return Item.findOne({
      company: companyId,
      sku: sku.trim().toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("category", "code name")
      .populate("unit", "code name symbol");
  }

  static async existsByCode(companyId, code) {
    return Item.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async existsBySku(companyId, sku) {
    return Item.exists({
      company: companyId,
      sku: sku.trim().toUpperCase()
    });
  }

  static async existsByBarcode(companyId, barcode, excludeId = null) {
    const filter = {
      company: companyId,
      barcode: barcode.trim()
    };

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    return Item.exists(filter);
  }

  static async list(filter = {}) {
    return Item.find(filter)
      .populate("company", "code displayName")
      .populate("category", "code name")
      .populate("unit", "code name symbol")
      .sort({
        name: 1
      });
  }

  static async update(id, payload) {
    return Item.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("category", "code name")
      .populate("unit", "code name symbol");
  }

  static async delete(id) {
    return Item.findByIdAndDelete(id);
  }
}

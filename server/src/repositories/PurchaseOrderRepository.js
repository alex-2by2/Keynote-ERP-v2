// server/src/repositories/PurchaseOrderRepository.js

import PurchaseOrder from "../models/PurchaseOrder.js";

export default class PurchaseOrderRepository {
  static async create(payload) {
    return PurchaseOrder.create(payload);
  }

  static async findById(id) {
    return PurchaseOrder.findById(id)
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async findByOrderNumber(companyId, orderNumber) {
    return PurchaseOrder.findOne({
      company: companyId,
      orderNumber: orderNumber.trim().toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async existsByOrderNumber(companyId, orderNumber) {
    return PurchaseOrder.exists({
      company: companyId,
      orderNumber: orderNumber.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return PurchaseOrder.find(filter)
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("warehouse", "code name")
      .sort({
        orderDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return PurchaseOrder.findByIdAndUpdate(
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
    return PurchaseOrder.findByIdAndDelete(id);
  }
}

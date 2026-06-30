// server/src/repositories/SalesOrderRepository.js

import SalesOrder from "../models/SalesOrder.js";

export default class SalesOrderRepository {
  static async create(payload) {
    return SalesOrder.create(payload);
  }

  static async findById(id) {
    return SalesOrder.findById(id)
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async findByOrderNumber(companyId, orderNumber) {
    return SalesOrder.findOne({
      company: companyId,
      orderNumber: orderNumber.trim().toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async existsByOrderNumber(companyId, orderNumber) {
    return SalesOrder.exists({
      company: companyId,
      orderNumber: orderNumber.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return SalesOrder.find(filter)
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("warehouse", "code name")
      .sort({
        orderDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return SalesOrder.findByIdAndUpdate(
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
    return SalesOrder.findByIdAndDelete(id);
  }
}

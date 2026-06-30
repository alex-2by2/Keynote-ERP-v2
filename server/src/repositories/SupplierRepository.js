// server/src/repositories/SupplierRepository.js

import Supplier from "../models/Supplier.js";

export default class SupplierRepository {
  static async create(payload) {
    return Supplier.create(payload);
  }

  static async findById(id) {
    return Supplier.findById()
      .populate("company", "code displayName");
  }

  static async findByCode(companyId, code) {
    return Supplier.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    }).populate("company", "code displayName");
  }

  static async existsByCode(companyId, code) {
    return Supplier.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Supplier.find(filter)
      .populate("company", "code displayName")
      .sort({
        name: 1
      });
  }

  static async update(id, payload) {
    return Supplier.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    ).populate("company", "code displayName");
  }

  static async delete(id) {
    return Supplier.findByIdAndDelete(id);
  }
}

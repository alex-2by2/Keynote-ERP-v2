// server/src/repositories/WarehouseRepository.js

import Warehouse from "../models/Warehouse.js";

export default class WarehouseRepository {
  static async create(payload) {
    return Warehouse.create(payload);
  }

  static async findById(id) {
    return Warehouse.findById(id)
      .populate("company", "code displayName")
      .populate("branch", "code name")
      .populate({
        path: "manager",
        select: "employeeCode",
        populate: {
          path: "user",
          select: "firstName lastName email"
        }
      });
  }

  static async findByCode(companyId, code) {
    return Warehouse.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("branch", "code name")
      .populate({
        path: "manager",
        select: "employeeCode",
        populate: {
          path: "user",
          select: "firstName lastName email"
        }
      });
  }

  static async existsByCode(companyId, code) {
    return Warehouse.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Warehouse.find(filter)
      .populate("company", "code displayName")
      .populate("branch", "code name")
      .populate({
        path: "manager",
        select: "employeeCode",
        populate: {
          path: "user",
          select: "firstName lastName email"
        }
      })
      .sort({
        code: 1
      });
  }

  static async update(id, payload) {
    return Warehouse.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("branch", "code name")
      .populate({
        path: "manager",
        select: "employeeCode",
        populate: {
          path: "user",
          select: "firstName lastName email"
        }
      });
  }

  static async delete(id) {
    return Warehouse.findByIdAndDelete(id);
  }
}

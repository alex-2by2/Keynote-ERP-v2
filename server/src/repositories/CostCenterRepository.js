// server/src/repositories/CostCenterRepository.js

import CostCenter from "../models/CostCenter.js";

export default class CostCenterRepository {
  static async create(payload) {
    return CostCenter.create(payload);
  }

  static async findById(id) {
    return CostCenter.findById(id)
      .populate("company", "code legalName displayName")
      .populate("department", "code name")
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
    return CostCenter.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    })
      .populate("company", "code legalName displayName")
      .populate("department", "code name")
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
    return CostCenter.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return CostCenter.find(filter)
      .populate("company", "code legalName displayName")
      .populate("department", "code name")
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
    return CostCenter.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code legalName displayName")
      .populate("department", "code name")
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
    return CostCenter.findByIdAndDelete(id);
  }
}

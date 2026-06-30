// server/src/repositories/DesignationRepository.js

import Designation from "../models/Designation.js";

export default class DesignationRepository {
  static async create(payload) {
    return Designation.create(payload);
  }

  static async findById(id) {
    return Designation.findById(id)
      .populate("department");
  }

  static async findByCode(code) {
    return Designation.findOne({
      code: code.trim().toUpperCase()
    }).populate("department");
  }

  static async existsByCode(code) {
    return Designation.exists({
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Designation.find(filter)
      .populate("department")
      .sort({
        department: 1,
        level: 1,
        name: 1
      });
  }

  static async update(id, payload) {
    return Designation.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    ).populate("department");
  }

  static async delete(id) {
    return Designation.findByIdAndDelete(id);
  }
}

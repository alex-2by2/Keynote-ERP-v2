// server/src/repositories/DepartmentRepository.js

import Department from "../models/Department.js";

export default class DepartmentRepository {
  static async create(payload) {
    return Department.create(payload);
  }

  static async findById(id) {
    return Department.findById(id).populate(
      "manager",
      "firstName lastName email role"
    );
  }

  static async findByCode(code) {
    return Department.findOne({
      code: code.trim().toUpperCase()
    }).populate(
      "manager",
      "firstName lastName email role"
    );
  }

  static async existsByCode(code) {
    return Department.exists({
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Department.find(filter)
      .populate(
        "manager",
        "firstName lastName email role"
      )
      .sort({ name: 1 });
  }

  static async update(id, payload) {
    return Department.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    ).populate(
      "manager",
      "firstName lastName email role"
    );
  }

  static async delete(id) {
    return Department.findByIdAndDelete(id);
  }
}

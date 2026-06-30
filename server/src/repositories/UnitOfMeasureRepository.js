// server/src/repositories/UnitOfMeasureRepository.js

import UnitOfMeasure from "../models/UnitOfMeasure.js";

export default class UnitOfMeasureRepository {
  static async create(payload) {
    return UnitOfMeasure.create(payload);
  }

  static async findById(id) {
    return UnitOfMeasure.findById(id)
      .populate("company", "code displayName");
  }

  static async findByCode(companyId, code) {
    return UnitOfMeasure.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    }).populate("company", "code displayName");
  }

  static async existsByCode(companyId, code) {
    return UnitOfMeasure.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return UnitOfMeasure.find(filter)
      .populate("company", "code displayName")
      .sort({
        category: 1,
        name: 1
      });
  }

  static async update(id, payload) {
    return UnitOfMeasure.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    ).populate("company", "code displayName");
  }

  static async delete(id) {
    return UnitOfMeasure.findByIdAndDelete(id);
  }
}

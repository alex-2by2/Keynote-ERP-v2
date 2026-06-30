// server/src/repositories/ItemCategoryRepository.js

import ItemCategory from "../models/ItemCategory.js";

export default class ItemCategoryRepository {
  static async create(payload) {
    return ItemCategory.create(payload);
  }

  static async findById(id) {
    return ItemCategory.findById(id)
      .populate("company", "code displayName")
      .populate(
        "parentCategory",
        "code name"
      );
  }

  static async findByCode(companyId, code) {
    return ItemCategory.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    })
      .populate("company", "code displayName")
      .populate(
        "parentCategory",
        "code name"
      );
  }

  static async existsByCode(companyId, code) {
    return ItemCategory.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return ItemCategory.find(filter)
      .populate("company", "code displayName")
      .populate(
        "parentCategory",
        "code name"
      )
      .sort({
        name: 1
      });
  }

  static async update(id, payload) {
    return ItemCategory.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate(
        "parentCategory",
        "code name"
      );
  }

  static async delete(id) {
    return ItemCategory.findByIdAndDelete(id);
  }
}

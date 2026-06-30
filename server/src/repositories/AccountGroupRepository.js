// server/src/repositories/AccountGroupRepository.js

import AccountGroup from "../models/AccountGroup.js";

export default class AccountGroupRepository {
  static async create(payload) {
    return AccountGroup.create(payload);
  }

  static async findById(id) {
    return AccountGroup.findById(id)
      .populate("company", "code displayName")
      .populate("parentGroup", "code name");
  }

  static async findByCode(companyId, code) {
    return AccountGroup.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("parentGroup", "code name");
  }

  static async existsByCode(companyId, code) {
    return AccountGroup.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return AccountGroup.find(filter)
      .populate("company", "code displayName")
      .populate("parentGroup", "code name")
      .sort({
        code: 1
      });
  }

  static async update(id, payload) {
    return AccountGroup.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("parentGroup", "code name");
  }

  static async delete(id) {
    return AccountGroup.findByIdAndDelete(id);
  }
}

// server/src/repositories/AccountLedgerRepository.js

import AccountLedger from "../models/AccountLedger.js";

export default class AccountLedgerRepository {
  static async create(payload) {
    return AccountLedger.create(payload);
  }

  static async findById(id) {
    return AccountLedger.findById(id)
      .populate("company", "code displayName")
      .populate("accountGroup", "code name nature");
  }

  static async findByCode(companyId, code) {
    return AccountLedger.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("accountGroup", "code name nature");
  }

  static async existsByCode(companyId, code) {
    return AccountLedger.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return AccountLedger.find(filter)
      .populate("company", "code displayName")
      .populate("accountGroup", "code name nature")
      .sort({
        code: 1,
        name: 1
      });
  }

  static async update(id, payload) {
    return AccountLedger.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("accountGroup", "code name nature");
  }

  static async delete(id) {
    return AccountLedger.findByIdAndDelete(id);
  }
}

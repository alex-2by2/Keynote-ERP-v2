// server/src/repositories/FinancialYearRepository.js

import FinancialYear from "../models/FinancialYear.js";

export default class FinancialYearRepository {
  static async create(payload) {
    return FinancialYear.create(payload);
  }

  static async findById(id) {
    return FinancialYear.findById().populate(
      "company",
      "code legalName displayName"
    );
  }

  static async findByCode(companyId, code) {
    return FinancialYear.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    }).populate(
      "company",
      "code legalName displayName"
    );
  }

  static async existsByCode(companyId, code) {
    return FinancialYear.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async findCurrent(companyId) {
    return FinancialYear.findOne({
      company: companyId,
      isCurrent: true
    }).populate(
      "company",
      "code legalName displayName"
    );
  }

  static async list(filter = {}) {
    return FinancialYear.find(filter)
      .populate(
        "company",
        "code legalName displayName"
      )
      .sort({
        startDate: -1
      });
  }

  static async update(id, payload) {
    return FinancialYear.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    ).populate(
      "company",
      "code legalName displayName"
    );
  }

  static async delete(id) {
    return FinancialYear.findByIdAndDelete(id);
  }
}

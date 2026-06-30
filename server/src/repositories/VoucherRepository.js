// server/src/repositories/VoucherRepository.js

import Voucher from "../models/Voucher.js";

export default class VoucherRepository {
  static async create(payload) {
    return Voucher.create(payload);
  }

  static async findById(id) {
    return Voucher.findById(id)
      .populate("company", "code displayName")
      .populate("financialYear", "name startDate endDate")
      .populate("entries.ledger", "code name");
  }

  static async findByVoucherNumber(
    companyId,
    voucherNumber
  ) {
    return Voucher.findOne({
      company: companyId,
      voucherNumber: voucherNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("financialYear", "name")
      .populate("entries.ledger", "code name");
  }

  static async existsByVoucherNumber(
    companyId,
    voucherNumber
  ) {
    return Voucher.exists({
      company: companyId,
      voucherNumber: voucherNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Voucher.find(filter)
      .populate("company", "code displayName")
      .populate("financialYear", "name")
      .sort({
        voucherDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return Voucher.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("financialYear", "name")
      .populate("entries.ledger", "code name");
  }

  static async delete(id) {
    return Voucher.findByIdAndDelete(id);
  }
}

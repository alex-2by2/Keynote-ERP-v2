// server/src/repositories/ReceiptRepository.js

import Receipt from "../models/Receipt.js";

export default class ReceiptRepository {
  static async create(payload) {
    return Receipt.create(payload);
  }

  static async findById(id) {
    return Receipt.findById(id)
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate(
        "salesInvoice",
        "invoiceNumber invoiceDate grandTotal status"
      )
      .populate(
        "accountLedger",
        "code name"
      )
      .populate(
        "voucher",
        "voucherNumber voucherDate"
      );
  }

  static async findByReceiptNumber(
    companyId,
    receiptNumber
  ) {
    return Receipt.findOne({
      company: companyId,
      receiptNumber: receiptNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate(
        "salesInvoice",
        "invoiceNumber invoiceDate grandTotal status"
      )
      .populate(
        "accountLedger",
        "code name"
      )
      .populate(
        "voucher",
        "voucherNumber voucherDate"
      );
  }

  static async existsByReceiptNumber(
    companyId,
    receiptNumber
  ) {
    return Receipt.exists({
      company: companyId,
      receiptNumber: receiptNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Receipt.find(filter)
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate(
        "salesInvoice",
        "invoiceNumber"
      )
      .populate(
        "accountLedger",
        "code name"
      )
      .populate(
        "voucher",
        "voucherNumber"
      )
      .sort({
        receiptDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return Receipt.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate(
        "salesInvoice",
        "invoiceNumber"
      )
      .populate(
        "accountLedger",
        "code name"
      )
      .populate(
        "voucher",
        "voucherNumber"
      );
  }

  static async delete(id) {
    return Receipt.findByIdAndDelete(id);
  }
}

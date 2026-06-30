// server/src/repositories/PaymentRepository.js

import Payment from "../models/Payment.js";

export default class PaymentRepository {
  static async create(payload) {
    return Payment.create(payload);
  }

  static async findById(id) {
    return Payment.findById(id)
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("customer", "code name")
      .populate(
        "purchaseInvoice",
        "invoiceNumber invoiceDate grandTotal status"
      )
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

  static async findByPaymentNumber(
    companyId,
    paymentNumber
  ) {
    return Payment.findOne({
      company: companyId,
      paymentNumber: paymentNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("customer", "code name")
      .populate(
        "purchaseInvoice",
        "invoiceNumber invoiceDate grandTotal status"
      )
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

  static async existsByPaymentNumber(
    companyId,
    paymentNumber
  ) {
    return Payment.exists({
      company: companyId,
      paymentNumber: paymentNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Payment.find(filter)
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("customer", "code name")
      .populate(
        "purchaseInvoice",
        "invoiceNumber"
      )
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
        paymentDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return Payment.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("customer", "code name")
      .populate(
        "purchaseInvoice",
        "invoiceNumber"
      )
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
    return Payment.findByIdAndDelete(id);
  }
}

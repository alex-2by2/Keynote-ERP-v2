// server/src/repositories/SalesInvoiceRepository.js

import SalesInvoice from "../models/SalesInvoice.js";

export default class SalesInvoiceRepository {
  static async create(payload) {
    return SalesInvoice.create(payload);
  }

  static async findById(id) {
    return SalesInvoice.findById(id)
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("salesOrder", "orderNumber status")
      .populate("goodsIssue", "issueNumber status")
      .populate("voucher", "voucherNumber voucherDate")
      .populate("items.item", "code sku name");
  }

  static async findByInvoiceNumber(
    companyId,
    invoiceNumber
  ) {
    return SalesInvoice.findOne({
      company: companyId,
      invoiceNumber: invoiceNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("salesOrder", "orderNumber status")
      .populate("goodsIssue", "issueNumber status")
      .populate("voucher", "voucherNumber voucherDate")
      .populate("items.item", "code sku name");
  }

  static async existsByInvoiceNumber(
    companyId,
    invoiceNumber
  ) {
    return SalesInvoice.exists({
      company: companyId,
      invoiceNumber: invoiceNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return SalesInvoice.find(filter)
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("salesOrder", "orderNumber")
      .populate("goodsIssue", "issueNumber")
      .populate("voucher", "voucherNumber")
      .sort({
        invoiceDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return SalesInvoice.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("customer", "code name")
      .populate("salesOrder", "orderNumber")
      .populate("goodsIssue", "issueNumber")
      .populate("voucher", "voucherNumber")
      .populate("items.item", "code sku name");
  }

  static async delete(id) {
    return SalesInvoice.findByIdAndDelete(id);
  }
}

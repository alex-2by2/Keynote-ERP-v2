// server/src/repositories/PurchaseInvoiceRepository.js

import PurchaseInvoice from "../models/PurchaseInvoice.js";

export default class PurchaseInvoiceRepository {
  static async create(payload) {
    return PurchaseInvoice.create(payload);
  }

  static async findById(id) {
    return PurchaseInvoice.findById(id)
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("purchaseOrder", "orderNumber status")
      .populate("goodsReceipt", "receiptNumber status")
      .populate("voucher", "voucherNumber voucherDate")
      .populate("items.item", "code sku name");
  }

  static async findByInvoiceNumber(
    companyId,
    invoiceNumber
  ) {
    return PurchaseInvoice.findOne({
      company: companyId,
      invoiceNumber: invoiceNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("purchaseOrder", "orderNumber status")
      .populate("goodsReceipt", "receiptNumber status")
      .populate("voucher", "voucherNumber voucherDate")
      .populate("items.item", "code sku name");
  }

  static async existsByInvoiceNumber(
    companyId,
    invoiceNumber
  ) {
    return PurchaseInvoice.exists({
      company: companyId,
      invoiceNumber: invoiceNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return PurchaseInvoice.find(filter)
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("purchaseOrder", "orderNumber")
      .populate("goodsReceipt", "receiptNumber")
      .populate("voucher", "voucherNumber")
      .sort({
        invoiceDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return PurchaseInvoice.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("supplier", "code name")
      .populate("purchaseOrder", "orderNumber")
      .populate("goodsReceipt", "receiptNumber")
      .populate("voucher", "voucherNumber")
      .populate("items.item", "code sku name");
  }

  static async delete(id) {
    return PurchaseInvoice.findByIdAndDelete(id);
  }
}

// server/src/services/PurchaseInvoiceService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import SupplierRepository from "../repositories/SupplierRepository.js";
import PurchaseOrderRepository from "../repositories/PurchaseOrderRepository.js";
import GoodsReceiptRepository from "../repositories/GoodsReceiptRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import PurchaseInvoiceRepository from "../repositories/PurchaseInvoiceRepository.js";

export default class PurchaseInvoiceService {
  static async create(payload) {
    const [company, supplier] = await Promise.all([
      CompanyRepository.findById(payload.company),
      SupplierRepository.findById(payload.supplier)
    ]);

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    if (!supplier) {
      throw new AppError(
        "Supplier not found.",
        404,
        "SUPPLIER_NOT_FOUND"
      );
    }

    if (payload.purchaseOrder) {
      const purchaseOrder =
        await PurchaseOrderRepository.findById(
          payload.purchaseOrder
        );

      if (!purchaseOrder) {
        throw new AppError(
          "Purchase order not found.",
          404,
          "PURCHASE_ORDER_NOT_FOUND"
        );
      }
    }

    if (payload.goodsReceipt) {
      const goodsReceipt =
        await GoodsReceiptRepository.findById(
          payload.goodsReceipt
        );

      if (!goodsReceipt) {
        throw new AppError(
          "Goods receipt not found.",
          404,
          "GOODS_RECEIPT_NOT_FOUND"
        );
      }
    }

    const invoiceNumber =
      payload.invoiceNumber
        .trim()
        .toUpperCase();

    const exists =
      await PurchaseInvoiceRepository.existsByInvoiceNumber(
        company.id,
        invoiceNumber
      );

    if (exists) {
      throw new AppError(
        "Purchase invoice already exists.",
        409,
        "PURCHASE_INVOICE_EXISTS"
      );
    }

    let subTotal = 0;
    let discountTotal = 0;
    let taxTotal = 0;

    for (const line of payload.items) {
      const item =
        await ItemRepository.findById(
          line.item
        );

      if (!item) {
        throw new AppError(
          "Item not found.",
          404,
          "ITEM_NOT_FOUND"
        );
      }

      const quantity =
        Number(line.quantity);

      const unitCost =
        Number(line.unitCost);

      const discount =
        Number(line.discount || 0);

      const taxPercentage =
        Number(
          line.taxPercentage || 0
        );

      const gross =
        quantity * unitCost;

      const taxable =
        gross - discount;

      const taxAmount =
        (taxable * taxPercentage) /
        100;

      line.taxAmount = taxAmount;

      line.lineTotal =
        taxable + taxAmount;

      subTotal += gross;
      discountTotal += discount;
      taxTotal += taxAmount;
    }

    const grandTotal =
      subTotal -
      discountTotal +
      taxTotal;

    return PurchaseInvoiceRepository.create({
      ...payload,
      invoiceNumber,
      subTotal,
      discountTotal,
      taxTotal,
      grandTotal
    });
  }

  static async getById(id) {
    const invoice =
      await PurchaseInvoiceRepository.findById(
        id
      );

    if (!invoice) {
      throw new AppError(
        "Purchase invoice not found.",
        404,
        "PURCHASE_INVOICE_NOT_FOUND"
      );
    }

    return invoice;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return PurchaseInvoiceRepository.list(
      filter
    );
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.invoiceNumber) {
      payload.invoiceNumber =
        payload.invoiceNumber
          .trim()
          .toUpperCase();
    }

    return PurchaseInvoiceRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return PurchaseInvoiceRepository.delete(
      id
    );
  }
}

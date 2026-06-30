// server/src/services/PurchaseOrderService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import SupplierRepository from "../repositories/SupplierRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import PurchaseOrderRepository from "../repositories/PurchaseOrderRepository.js";

export default class PurchaseOrderService {
  static async create(payload) {
    const company = await CompanyRepository.findById(
      payload.company
    );

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    const [supplier, warehouse] = await Promise.all([
      SupplierRepository.findById(payload.supplier),
      WarehouseRepository.findById(payload.warehouse)
    ]);

    if (!supplier) {
      throw new AppError(
        "Supplier not found.",
        404,
        "SUPPLIER_NOT_FOUND"
      );
    }

    if (!warehouse) {
      throw new AppError(
        "Warehouse not found.",
        404,
        "WAREHOUSE_NOT_FOUND"
      );
    }

    const orderNumber = payload.orderNumber
      .trim()
      .toUpperCase();

    const exists =
      await PurchaseOrderRepository.existsByOrderNumber(
        company.id,
        orderNumber
      );

    if (exists) {
      throw new AppError(
        "Purchase order already exists.",
        409,
        "PURCHASE_ORDER_EXISTS"
      );
    }

    let subTotal = 0;
    let taxTotal = 0;
    let discountTotal = 0;

    for (const line of payload.items) {
      const item = await ItemRepository.findById(line.item);

      if (!item) {
        throw new AppError(
          "Invalid item.",
          404,
          "ITEM_NOT_FOUND"
        );
      }

      const lineAmount =
        line.quantity * line.unitPrice;

      const discount =
        lineAmount *
        (line.discountPercent || 0) /
        100;

      const taxable = lineAmount - discount;

      const tax =
        taxable *
        (line.taxPercent || 0) /
        100;

      line.lineTotal = taxable + tax;

      subTotal += lineAmount;
      taxTotal += tax;
      discountTotal += discount;
    }

    return PurchaseOrderRepository.create({
      ...payload,
      orderNumber,
      subTotal,
      taxTotal,
      discountTotal,
      grandTotal:
        subTotal -
        discountTotal +
        taxTotal
    });
  }

  static async getById(id) {
    const purchaseOrder =
      await PurchaseOrderRepository.findById(id);

    if (!purchaseOrder) {
      throw new AppError(
        "Purchase order not found.",
        404,
        "PURCHASE_ORDER_NOT_FOUND"
      );
    }

    return purchaseOrder;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return PurchaseOrderRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return PurchaseOrderRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return PurchaseOrderRepository.delete(id);
  }
}

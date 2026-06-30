// server/src/services/GoodsReceiptService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import PurchaseOrderRepository from "../repositories/PurchaseOrderRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import GoodsReceiptRepository from "../repositories/GoodsReceiptRepository.js";

export default class GoodsReceiptService {
  static async create(payload) {
    const [company, purchaseOrder, warehouse] =
      await Promise.all([
        CompanyRepository.findById(payload.company),
        PurchaseOrderRepository.findById(
          payload.purchaseOrder
        ),
        WarehouseRepository.findById(
          payload.warehouse
        )
      ]);

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    if (!purchaseOrder) {
      throw new AppError(
        "Purchase order not found.",
        404,
        "PURCHASE_ORDER_NOT_FOUND"
      );
    }

    if (!warehouse) {
      throw new AppError(
        "Warehouse not found.",
        404,
        "WAREHOUSE_NOT_FOUND"
      );
    }

    const receiptNumber = payload.receiptNumber
      .trim()
      .toUpperCase();

    const exists =
      await GoodsReceiptRepository.existsByReceiptNumber(
        company.id,
        receiptNumber
      );

    if (exists) {
      throw new AppError(
        "Receipt number already exists.",
        409,
        "GOODS_RECEIPT_EXISTS"
      );
    }

    let totalAmount = 0;

    for (const line of payload.items) {
      const item = await ItemRepository.findById(
        line.item
      );

      if (!item) {
        throw new AppError(
          "Item not found.",
          404,
          "ITEM_NOT_FOUND"
        );
      }

      line.lineTotal =
        line.acceptedQuantity * line.unitCost;

      totalAmount += line.lineTotal;
    }

    return GoodsReceiptRepository.create({
      ...payload,
      receiptNumber,
      totalAmount
    });
  }

  static async getById(id) {
    const receipt =
      await GoodsReceiptRepository.findById(id);

    if (!receipt) {
      throw new AppError(
        "Goods receipt not found.",
        404,
        "GOODS_RECEIPT_NOT_FOUND"
      );
    }

    return receipt;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return GoodsReceiptRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return GoodsReceiptRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return GoodsReceiptRepository.delete(id);
  }
}

// server/src/services/PurchaseReturnService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import SupplierRepository from "../repositories/SupplierRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import PurchaseReturnRepository from "../repositories/PurchaseReturnRepository.js";

export default class PurchaseReturnService {
  static async create(payload) {
    const [company, supplier, warehouse] =
      await Promise.all([
        CompanyRepository.findById(payload.company),
        SupplierRepository.findById(payload.supplier),
        WarehouseRepository.findById(payload.warehouse)
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

    if (!warehouse) {
      throw new AppError(
        "Warehouse not found.",
        404,
        "WAREHOUSE_NOT_FOUND"
      );
    }

    const returnNumber = payload.returnNumber
      .trim()
      .toUpperCase();

    const exists =
      await PurchaseReturnRepository.existsByReturnNumber(
        company.id,
        returnNumber
      );

    if (exists) {
      throw new AppError(
        "Purchase return already exists.",
        409,
        "PURCHASE_RETURN_EXISTS"
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
        line.quantity * line.unitCost;

      totalAmount += line.lineTotal;
    }

    return PurchaseReturnRepository.create({
      ...payload,
      returnNumber,
      totalAmount
    });
  }

  static async getById(id) {
    const purchaseReturn =
      await PurchaseReturnRepository.findById(id);

    if (!purchaseReturn) {
      throw new AppError(
        "Purchase return not found.",
        404,
        "PURCHASE_RETURN_NOT_FOUND"
      );
    }

    return purchaseReturn;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return PurchaseReturnRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return PurchaseReturnRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return PurchaseReturnRepository.delete(id);
  }
}

// server/src/services/InventoryTransactionService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import InventoryTransactionRepository from "../repositories/InventoryTransactionRepository.js";

export default class InventoryTransactionService {
  static async create(payload) {
    const [company, warehouse, item] =
      await Promise.all([
        CompanyRepository.findById(payload.company),
        WarehouseRepository.findById(payload.warehouse),
        ItemRepository.findById(payload.item)
      ]);

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    if (!warehouse) {
      throw new AppError(
        "Warehouse not found.",
        404,
        "WAREHOUSE_NOT_FOUND"
      );
    }

    if (!item) {
      throw new AppError(
        "Item not found.",
        404,
        "ITEM_NOT_FOUND"
      );
    }

    const latest =
      await InventoryTransactionRepository.findLatest(
        company.id,
        warehouse.id,
        item.id
      );

    const previousBalance =
      latest?.balanceQuantity ?? 0;

    const balanceQuantity =
      previousBalance +
      (payload.quantityIn || 0) -
      (payload.quantityOut || 0);

    if (balanceQuantity < 0) {
      throw new AppError(
        "Insufficient stock balance.",
        400,
        "INSUFFICIENT_STOCK"
      );
    }

    return InventoryTransactionRepository.create({
      ...payload,
      referenceNumber:
        payload.referenceNumber
          .trim()
          .toUpperCase(),
      balanceQuantity
    });
  }

  static async getById(id) {
    const transaction =
      await InventoryTransactionRepository.findById(
        id
      );

    if (!transaction) {
      throw new AppError(
        "Inventory transaction not found.",
        404,
        "INVENTORY_TRANSACTION_NOT_FOUND"
      );
    }

    return transaction;
  }

  static async list(filters = {}) {
    return InventoryTransactionRepository.list(
      filters
    );
  }

  static async delete(id) {
    await this.getById(id);

    return InventoryTransactionRepository.delete(
      id
    );
  }
}

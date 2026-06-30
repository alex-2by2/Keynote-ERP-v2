// server/src/services/StockService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import StockRepository from "../repositories/StockRepository.js";

export default class StockService {
  static async create(payload) {
    const [company, warehouse, item] = await Promise.all([
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

    const existing =
      await StockRepository.findByWarehouseAndItem(
        company.id,
        warehouse.id,
        item.id
      );

    if (existing) {
      throw new AppError(
        "Stock record already exists.",
        409,
        "STOCK_ALREADY_EXISTS"
      );
    }

    return StockRepository.create(payload);
  }

  static async getById(id) {
    const stock = await StockRepository.findById(id);

    if (!stock) {
      throw new AppError(
        "Stock record not found.",
        404,
        "STOCK_NOT_FOUND"
      );
    }

    return stock;
  }

  static async list(company = null, warehouse = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    if (warehouse) {
      filter.warehouse = warehouse;
    }

    return StockRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return StockRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return StockRepository.delete(id);
  }
}

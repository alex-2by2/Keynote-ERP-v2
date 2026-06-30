// server/src/services/StockTransferService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import StockTransferRepository from "../repositories/StockTransferRepository.js";

export default class StockTransferService {
  static async create(payload) {
    const [company, fromWarehouse, toWarehouse] =
      await Promise.all([
        CompanyRepository.findById(payload.company),
        WarehouseRepository.findById(
          payload.fromWarehouse
        ),
        WarehouseRepository.findById(
          payload.toWarehouse
        )
      ]);

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    if (!fromWarehouse || !toWarehouse) {
      throw new AppError(
        "Warehouse not found.",
        404,
        "WAREHOUSE_NOT_FOUND"
      );
    }

    if (
      String(fromWarehouse.id) ===
      String(toWarehouse.id)
    ) {
      throw new AppError(
        "Source and destination warehouse cannot be the same.",
        400,
        "INVALID_WAREHOUSE_TRANSFER"
      );
    }

    const transferNumber = payload.transferNumber
      .trim()
      .toUpperCase();

    const exists =
      await StockTransferRepository.existsByTransferNumber(
        company.id,
        transferNumber
      );

    if (exists) {
      throw new AppError(
        "Transfer number already exists.",
        409,
        "STOCK_TRANSFER_EXISTS"
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

    return StockTransferRepository.create({
      ...payload,
      transferNumber,
      totalAmount
    });
  }

  static async getById(id) {
    const transfer =
      await StockTransferRepository.findById(id);

    if (!transfer) {
      throw new AppError(
        "Stock transfer not found.",
        404,
        "STOCK_TRANSFER_NOT_FOUND"
      );
    }

    return transfer;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return StockTransferRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return StockTransferRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return StockTransferRepository.delete(id);
  }
}

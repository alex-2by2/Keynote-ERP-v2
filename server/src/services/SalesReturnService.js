// server/src/services/SalesReturnService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import CustomerRepository from "../repositories/CustomerRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import StockRepository from "../repositories/StockRepository.js";
import SalesReturnRepository from "../repositories/SalesReturnRepository.js";

export default class SalesReturnService {
  static async create(payload) {
    const [company, customer, warehouse] =
      await Promise.all([
        CompanyRepository.findById(payload.company),
        CustomerRepository.findById(payload.customer),
        WarehouseRepository.findById(payload.warehouse)
      ]);

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    if (!customer) {
      throw new AppError(
        "Customer not found.",
        404,
        "CUSTOMER_NOT_FOUND"
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
      await SalesReturnRepository.existsByReturnNumber(
        company.id,
        returnNumber
      );

    if (exists) {
      throw new AppError(
        "Sales return already exists.",
        409,
        "SALES_RETURN_EXISTS"
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
        line.quantity * line.unitPrice;

      totalAmount += line.lineTotal;
    }

    const salesReturn =
      await SalesReturnRepository.create({
        ...payload,
        returnNumber,
        totalAmount
      });

    // Returned goods come back into stock.
    for (const line of payload.items) {
      const returnedQty =
        Number(line.quantity);

      const stock =
        await StockRepository.findByWarehouseAndItem(
          payload.company,
          payload.warehouse,
          line.item
        );

      if (stock) {
        await StockRepository.update(
          stock._id,
          {
            quantity:
              stock.quantity + returnedQty
          }
        );
      } else {
        await StockRepository.create({
          company: payload.company,
          warehouse: payload.warehouse,
          item: line.item,
          quantity: returnedQty
        });
      }
    }

    return salesReturn;
  }

  static async getById(id) {
    const salesReturn =
      await SalesReturnRepository.findById(id);

    if (!salesReturn) {
      throw new AppError(
        "Sales return not found.",
        404,
        "SALES_RETURN_NOT_FOUND"
      );
    }

    return salesReturn;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return SalesReturnRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return SalesReturnRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return SalesReturnRepository.delete(id);
  }
}

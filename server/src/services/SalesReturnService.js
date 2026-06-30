// server/src/services/SalesReturnService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import CustomerRepository from "../repositories/CustomerRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
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

    return SalesReturnRepository.create({
      ...payload,
      returnNumber,
      totalAmount
    });
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

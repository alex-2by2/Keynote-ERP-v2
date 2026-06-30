// server/src/services/SalesOrderService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import CustomerRepository from "../repositories/CustomerRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import SalesOrderRepository from "../repositories/SalesOrderRepository.js";

export default class SalesOrderService {
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

    const [customer, warehouse] = await Promise.all([
      CustomerRepository.findById(payload.customer),
      WarehouseRepository.findById(payload.warehouse)
    ]);

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

    const orderNumber = payload.orderNumber
      .trim()
      .toUpperCase();

    const exists =
      await SalesOrderRepository.existsByOrderNumber(
        company.id,
        orderNumber
      );

    if (exists) {
      throw new AppError(
        "Sales order already exists.",
        409,
        "SALES_ORDER_EXISTS"
      );
    }

    let subTotal = 0;
    let taxTotal = 0;
    let discountTotal = 0;

    for (const line of payload.items) {
      const item = await ItemRepository.findById(line.item);

      if (!item) {
        throw new AppError(
          "Item not found.",
          404,
          "ITEM_NOT_FOUND"
        );
      }

      const amount =
        line.quantity * line.unitPrice;

      const discount =
        amount *
        (line.discountPercent || 0) /
        100;

      const taxable = amount - discount;

      const tax =
        taxable *
        (line.taxPercent || 0) /
        100;

      line.lineTotal = taxable + tax;

      subTotal += amount;
      discountTotal += discount;
      taxTotal += tax;
    }

    return SalesOrderRepository.create({
      ...payload,
      orderNumber,
      subTotal,
      discountTotal,
      taxTotal,
      grandTotal:
        subTotal -
        discountTotal +
        taxTotal
    });
  }

  static async getById(id) {
    const salesOrder =
      await SalesOrderRepository.findById(id);

    if (!salesOrder) {
      throw new AppError(
        "Sales order not found.",
        404,
        "SALES_ORDER_NOT_FOUND"
      );
    }

    return salesOrder;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return SalesOrderRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return SalesOrderRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return SalesOrderRepository.delete(id);
  }
}

// server/src/services/SalesInvoiceService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import CustomerRepository from "../repositories/CustomerRepository.js";
import SalesOrderRepository from "../repositories/SalesOrderRepository.js";
import GoodsIssueRepository from "../repositories/GoodsIssueRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import StockRepository from "../repositories/StockRepository.js";
import SalesInvoiceRepository from "../repositories/SalesInvoiceRepository.js";

export default class SalesInvoiceService {
  static async create(payload) {
    const [company, customer] =
      await Promise.all([
        CompanyRepository.findById(
          payload.company
        ),
        CustomerRepository.findById(
          payload.customer
        )
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

    if (payload.salesOrder) {
      const salesOrder =
        await SalesOrderRepository.findById(
          payload.salesOrder
        );

      if (!salesOrder) {
        throw new AppError(
          "Sales order not found.",
          404,
          "SALES_ORDER_NOT_FOUND"
        );
      }
    }

    if (payload.goodsIssue) {
      const goodsIssue =
        await GoodsIssueRepository.findById(
          payload.goodsIssue
        );

      if (!goodsIssue) {
        throw new AppError(
          "Goods issue not found.",
          404,
          "GOODS_ISSUE_NOT_FOUND"
        );
      }
    }

    const invoiceNumber =
      payload.invoiceNumber
        .trim()
        .toUpperCase();

    const exists =
      await SalesInvoiceRepository.existsByInvoiceNumber(
        company.id,
        invoiceNumber
      );

    if (exists) {
      throw new AppError(
        "Sales invoice already exists.",
        409,
        "SALES_INVOICE_EXISTS"
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

      const unitPrice =
        Number(line.unitPrice);

      const discount =
        Number(
          line.discount || 0
        );

      const taxPercentage =
        Number(
          line.taxPercentage || 0
        );

      const gross =
        quantity * unitPrice;

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

    // If a warehouse was given, this is a direct/POS-style
    // sale — confirm enough stock exists before committing.
    if (payload.warehouse) {
      for (const line of payload.items) {
        const stock =
          await StockRepository.findByWarehouseAndItem(
            payload.company,
            payload.warehouse,
            line.item
          );

        const available = stock
          ? stock.quantity
          : 0;

        if (available < Number(line.quantity)) {
          throw new AppError(
            `Insufficient stock. Only ${available} available.`,
            409,
            "INSUFFICIENT_STOCK"
          );
        }
      }
    }

    const invoice =
      await SalesInvoiceRepository.create({
        ...payload,
        invoiceNumber,
        subTotal,
        discountTotal,
        taxTotal,
        grandTotal
      });

    if (payload.warehouse) {
      for (const line of payload.items) {
        const stock =
          await StockRepository.findByWarehouseAndItem(
            payload.company,
            payload.warehouse,
            line.item
          );

        await StockRepository.update(
          stock._id,
          {
            quantity:
              stock.quantity -
              Number(line.quantity),
            lastIssueDate: new Date()
          }
        );
      }
    }

    return invoice;
  }

  static async getById(id) {
    const invoice =
      await SalesInvoiceRepository.findById(
        id
      );

    if (!invoice) {
      throw new AppError(
        "Sales invoice not found.",
        404,
        "SALES_INVOICE_NOT_FOUND"
      );
    }

    return invoice;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return SalesInvoiceRepository.list(
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

    return SalesInvoiceRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return SalesInvoiceRepository.delete(
      id
    );
  }
}

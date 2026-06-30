// server/src/services/GoodsIssueService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import SalesOrderRepository from "../repositories/SalesOrderRepository.js";
import WarehouseRepository from "../repositories/WarehouseRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";
import GoodsIssueRepository from "../repositories/GoodsIssueRepository.js";

export default class GoodsIssueService {
  static async create(payload) {
    const [company, salesOrder, warehouse] =
      await Promise.all([
        CompanyRepository.findById(payload.company),
        SalesOrderRepository.findById(
          payload.salesOrder
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

    if (!salesOrder) {
      throw new AppError(
        "Sales order not found.",
        404,
        "SALES_ORDER_NOT_FOUND"
      );
    }

    if (!warehouse) {
      throw new AppError(
        "Warehouse not found.",
        404,
        "WAREHOUSE_NOT_FOUND"
      );
    }

    const issueNumber = payload.issueNumber
      .trim()
      .toUpperCase();

    const exists =
      await GoodsIssueRepository.existsByIssueNumber(
        company.id,
        issueNumber
      );

    if (exists) {
      throw new AppError(
        "Goods issue already exists.",
        409,
        "GOODS_ISSUE_EXISTS"
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
        line.issuedQuantity * line.unitCost;

      totalAmount += line.lineTotal;
    }

    return GoodsIssueRepository.create({
      ...payload,
      issueNumber,
      totalAmount
    });
  }

  static async getById(id) {
    const goodsIssue =
      await GoodsIssueRepository.findById(id);

    if (!goodsIssue) {
      throw new AppError(
        "Goods issue not found.",
        404,
        "GOODS_ISSUE_NOT_FOUND"
      );
    }

    return goodsIssue;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return GoodsIssueRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return GoodsIssueRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return GoodsIssueRepository.delete(id);
  }
}

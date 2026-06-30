// server/src/repositories/GoodsIssueRepository.js

import GoodsIssue from "../models/GoodsIssue.js";

export default class GoodsIssueRepository {
  static async create(payload) {
    return GoodsIssue.create(payload);
  }

  static async findById(id) {
    return GoodsIssue.findById(id)
      .populate("company", "code displayName")
      .populate("salesOrder", "orderNumber status")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async findByIssueNumber(
    companyId,
    issueNumber
  ) {
    return GoodsIssue.findOne({
      company: companyId,
      issueNumber: issueNumber
        .trim()
        .toUpperCase()
    })
      .populate("company", "code displayName")
      .populate("salesOrder", "orderNumber status")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async existsByIssueNumber(
    companyId,
    issueNumber
  ) {
    return GoodsIssue.exists({
      company: companyId,
      issueNumber: issueNumber
        .trim()
        .toUpperCase()
    });
  }

  static async list(filter = {}) {
    return GoodsIssue.find(filter)
      .populate("company", "code displayName")
      .populate("salesOrder", "orderNumber")
      .populate("warehouse", "code name")
      .sort({
        issueDate: -1,
        createdAt: -1
      });
  }

  static async update(id, payload) {
    return GoodsIssue.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("company", "code displayName")
      .populate("salesOrder", "orderNumber")
      .populate("warehouse", "code name")
      .populate("items.item", "code sku name");
  }

  static async delete(id) {
    return GoodsIssue.findByIdAndDelete(id);
  }
}

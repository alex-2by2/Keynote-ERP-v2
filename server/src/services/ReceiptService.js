// server/src/services/ReceiptService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import CustomerRepository from "../repositories/CustomerRepository.js";
import SalesInvoiceRepository from "../repositories/SalesInvoiceRepository.js";
import AccountLedgerRepository from "../repositories/AccountLedgerRepository.js";
import ReceiptRepository from "../repositories/ReceiptRepository.js";

export default class ReceiptService {
  static async create(payload) {
    const company =
      await CompanyRepository.findById(
        payload.company
      );

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    const customer =
      await CustomerRepository.findById(
        payload.customer
      );

    if (!customer) {
      throw new AppError(
        "Customer not found.",
        404,
        "CUSTOMER_NOT_FOUND"
      );
    }

    if (payload.salesInvoice) {
      const invoice =
        await SalesInvoiceRepository.findById(
          payload.salesInvoice
        );

      if (!invoice) {
        throw new AppError(
          "Sales invoice not found.",
          404,
          "SALES_INVOICE_NOT_FOUND"
        );
      }
    }

    const ledger =
      await AccountLedgerRepository.findById(
        payload.accountLedger
      );

    if (!ledger) {
      throw new AppError(
        "Account ledger not found.",
        404,
        "ACCOUNT_LEDGER_NOT_FOUND"
      );
    }

    const receiptNumber =
      payload.receiptNumber
        .trim()
        .toUpperCase();

    const exists =
      await ReceiptRepository.existsByReceiptNumber(
        company.id,
        receiptNumber
      );

    if (exists) {
      throw new AppError(
        "Receipt number already exists.",
        409,
        "RECEIPT_EXISTS"
      );
    }

    return ReceiptRepository.create({
      ...payload,
      receiptNumber
    });
  }

  static async getById(id) {
    const receipt =
      await ReceiptRepository.findById(
        id
      );

    if (!receipt) {
      throw new AppError(
        "Receipt not found.",
        404,
        "RECEIPT_NOT_FOUND"
      );
    }

    return receipt;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return ReceiptRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.receiptNumber) {
      payload.receiptNumber =
        payload.receiptNumber
          .trim()
          .toUpperCase();
    }

    return ReceiptRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return ReceiptRepository.delete(
      id
    );
  }
}

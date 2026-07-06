// server/src/services/PaymentService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import SupplierRepository from "../repositories/SupplierRepository.js";
import CustomerRepository from "../repositories/CustomerRepository.js";
import PurchaseInvoiceRepository from "../repositories/PurchaseInvoiceRepository.js";
import SalesInvoiceRepository from "../repositories/SalesInvoiceRepository.js";
import AccountLedgerRepository from "../repositories/AccountLedgerRepository.js";
import PaymentRepository from "../repositories/PaymentRepository.js";

function toSigned(balance, type) {
  return type === "DEBIT" ? balance : -balance;
}

function fromSigned(signedValue) {
  return {
    currentBalance: Math.abs(signedValue),
    balanceType:
      signedValue >= 0 ? "DEBIT" : "CREDIT"
  };
}

export default class PaymentService {
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

    if (
      !payload.supplier &&
      !payload.customer
    ) {
      throw new AppError(
        "Supplier or customer is required.",
        400,
        "PARTY_REQUIRED"
      );
    }

    if (payload.supplier) {
      const supplier =
        await SupplierRepository.findById(
          payload.supplier
        );

      if (!supplier) {
        throw new AppError(
          "Supplier not found.",
          404,
          "SUPPLIER_NOT_FOUND"
        );
      }
    }

    if (payload.customer) {
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
    }

    if (payload.purchaseInvoice) {
      const invoice =
        await PurchaseInvoiceRepository.findById(
          payload.purchaseInvoice
        );

      if (!invoice) {
        throw new AppError(
          "Purchase invoice not found.",
          404,
          "PURCHASE_INVOICE_NOT_FOUND"
        );
      }
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

    const paymentNumber =
      payload.paymentNumber
        .trim()
        .toUpperCase();

    const exists =
      await PaymentRepository.existsByPaymentNumber(
        company.id,
        paymentNumber
      );

    if (exists) {
      throw new AppError(
        "Payment number already exists.",
        409,
        "PAYMENT_EXISTS"
      );
    }

    const payment =
      await PaymentRepository.create({
        ...payload,
        paymentNumber
      });

    // Paying out of this ledger is a credit to it.
    const signed = toSigned(
      ledger.currentBalance,
      ledger.balanceType
    ) - Number(payload.amount);

    await AccountLedgerRepository.update(
      ledger.id,
      fromSigned(signed)
    );

    return payment;
  }

  static async getById(id) {
    const payment =
      await PaymentRepository.findById(
        id
      );

    if (!payment) {
      throw new AppError(
        "Payment not found.",
        404,
        "PAYMENT_NOT_FOUND"
      );
    }

    return payment;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return PaymentRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.paymentNumber) {
      payload.paymentNumber =
        payload.paymentNumber
          .trim()
          .toUpperCase();
    }

    return PaymentRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return PaymentRepository.delete(
      id
    );
  }
}

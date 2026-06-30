// server/src/services/VoucherService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import FinancialYearRepository from "../repositories/FinancialYearRepository.js";
import AccountLedgerRepository from "../repositories/AccountLedgerRepository.js";
import VoucherRepository from "../repositories/VoucherRepository.js";

export default class VoucherService {
  static async create(payload) {
    const [company, financialYear] =
      await Promise.all([
        CompanyRepository.findById(payload.company),
        FinancialYearRepository.findById(
          payload.financialYear
        )
      ]);

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    if (!financialYear) {
      throw new AppError(
        "Financial year not found.",
        404,
        "FINANCIAL_YEAR_NOT_FOUND"
      );
    }

    const voucherNumber = payload.voucherNumber
      .trim()
      .toUpperCase();

    const exists =
      await VoucherRepository.existsByVoucherNumber(
        company.id,
        voucherNumber
      );

    if (exists) {
      throw new AppError(
        "Voucher number already exists.",
        409,
        "VOUCHER_EXISTS"
      );
    }

    let totalDebit = 0;
    let totalCredit = 0;

    for (const entry of payload.entries) {
      const ledger =
        await AccountLedgerRepository.findById(
          entry.ledger
        );

      if (!ledger) {
        throw new AppError(
          "Ledger not found.",
          404,
          "LEDGER_NOT_FOUND"
        );
      }

      totalDebit += entry.debit || 0;
      totalCredit += entry.credit || 0;
    }

    if (totalDebit !== totalCredit) {
      throw new AppError(
        "Voucher is not balanced.",
        400,
        "UNBALANCED_VOUCHER"
      );
    }

    return VoucherRepository.create({
      ...payload,
      voucherNumber,
      totalDebit,
      totalCredit
    });
  }

  static async getById(id) {
    const voucher =
      await VoucherRepository.findById(id);

    if (!voucher) {
      throw new AppError(
        "Voucher not found.",
        404,
        "VOUCHER_NOT_FOUND"
      );
    }

    return voucher;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return VoucherRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return VoucherRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return VoucherRepository.delete(id);
  }
}

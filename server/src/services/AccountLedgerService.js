// server/src/services/AccountLedgerService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import AccountGroupRepository from "../repositories/AccountGroupRepository.js";
import AccountLedgerRepository from "../repositories/AccountLedgerRepository.js";

export default class AccountLedgerService {
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

    const accountGroup =
      await AccountGroupRepository.findById(
        payload.accountGroup
      );

    if (!accountGroup) {
      throw new AppError(
        "Account group not found.",
        404,
        "ACCOUNT_GROUP_NOT_FOUND"
      );
    }

    const code = payload.code.trim().toUpperCase();

    const exists =
      await AccountLedgerRepository.existsByCode(
        company.id,
        code
      );

    if (exists) {
      throw new AppError(
        "Account ledger code already exists.",
        409,
        "ACCOUNT_LEDGER_EXISTS"
      );
    }

    return AccountLedgerRepository.create({
      ...payload,
      code,
      currentBalance:
        payload.openingBalance || 0,
      balanceType:
        payload.openingBalanceType || "DEBIT"
    });
  }

  static async getById(id) {
    const ledger =
      await AccountLedgerRepository.findById(id);

    if (!ledger) {
      throw new AppError(
        "Account ledger not found.",
        404,
        "ACCOUNT_LEDGER_NOT_FOUND"
      );
    }

    return ledger;
  }

  static async list(company = null) {
    const filter = {
      active: true
    };

    if (company) {
      filter.company = company;
    }

    return AccountLedgerRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code
        .trim()
        .toUpperCase();
    }

    return AccountLedgerRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return AccountLedgerRepository.delete(id);
  }
}

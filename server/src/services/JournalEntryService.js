// server/src/services/JournalEntryService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import FinancialYearRepository from "../repositories/FinancialYearRepository.js";
import AccountLedgerRepository from "../repositories/AccountLedgerRepository.js";
import JournalEntryRepository from "../repositories/JournalEntryRepository.js";

export default class JournalEntryService {
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

    const journalNumber = payload.journalNumber
      .trim()
      .toUpperCase();

    const exists =
      await JournalEntryRepository.existsByJournalNumber(
        company.id,
        journalNumber
      );

    if (exists) {
      throw new AppError(
        "Journal number already exists.",
        409,
        "JOURNAL_EXISTS"
      );
    }

    let totalDebit = 0;
    let totalCredit = 0;

    for (const line of payload.entries) {
      const ledger =
        await AccountLedgerRepository.findById(
          line.ledger
        );

      if (!ledger) {
        throw new AppError(
          "Ledger not found.",
          404,
          "LEDGER_NOT_FOUND"
        );
      }

      totalDebit += line.debit || 0;
      totalCredit += line.credit || 0;
    }

    if (totalDebit !== totalCredit) {
      throw new AppError(
        "Journal entry is not balanced.",
        400,
        "UNBALANCED_JOURNAL"
      );
    }

    return JournalEntryRepository.create({
      ...payload,
      journalNumber,
      totalDebit,
      totalCredit
    });
  }

  static async getById(id) {
    const journal =
      await JournalEntryRepository.findById(id);

    if (!journal) {
      throw new AppError(
        "Journal entry not found.",
        404,
        "JOURNAL_NOT_FOUND"
      );
    }

    return journal;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    return JournalEntryRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    return JournalEntryRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return JournalEntryRepository.delete(id);
  }
}

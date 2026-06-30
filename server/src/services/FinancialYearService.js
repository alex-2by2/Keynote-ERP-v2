// server/src/services/FinancialYearService.js

import AppError from "../utils/AppError.js";

import FinancialYearRepository from "../repositories/FinancialYearRepository.js";
import CompanyRepository from "../repositories/CompanyRepository.js";

export default class FinancialYearService {
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

    const code = payload.code.trim().toUpperCase();

    const exists =
      await FinancialYearRepository.existsByCode(
        payload.company,
        code
      );

    if (exists) {
      throw new AppError(
        "Financial year code already exists.",
        409,
        "FINANCIAL_YEAR_ALREADY_EXISTS"
      );
    }

    if (
      new Date(payload.startDate) >=
      new Date(payload.endDate)
    ) {
      throw new AppError(
        "Start date must be earlier than end date.",
        400,
        "INVALID_DATE_RANGE"
      );
    }

    if (payload.isCurrent) {
      const current =
        await FinancialYearRepository.findCurrent(
          payload.company
        );

      if (current) {
        await FinancialYearRepository.update(current.id, {
          isCurrent: false
        });
      }
    }

    return FinancialYearRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const financialYear =
      await FinancialYearRepository.findById(id);

    if (!financialYear) {
      throw new AppError(
        "Financial year not found.",
        404,
        "FINANCIAL_YEAR_NOT_FOUND"
      );
    }

    return financialYear;
  }

  static async list(companyId = null) {
    const filter = {};

    if (companyId) {
      filter.company = companyId;
    }

    return FinancialYearRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code.trim().toUpperCase();
    }

    if (
      payload.startDate &&
      payload.endDate &&
      new Date(payload.startDate) >=
        new Date(payload.endDate)
    ) {
      throw new AppError(
        "Start date must be earlier than end date.",
        400,
        "INVALID_DATE_RANGE"
      );
    }

    return FinancialYearRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return FinancialYearRepository.delete(id);
  }
}

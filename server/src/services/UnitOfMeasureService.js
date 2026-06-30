// server/src/services/UnitOfMeasureService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import UnitOfMeasureRepository from "../repositories/UnitOfMeasureRepository.js";

export default class UnitOfMeasureService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

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

    const exists =
      await UnitOfMeasureRepository.existsByCode(
        company.id,
        code
      );

    if (exists) {
      throw new AppError(
        "Unit of measure code already exists.",
        409,
        "UNIT_OF_MEASURE_ALREADY_EXISTS"
      );
    }

    if (payload.baseUnit) {
      const baseUnits =
        await UnitOfMeasureRepository.list({
          company: company.id,
          category: payload.category,
          baseUnit: true
        });

      if (baseUnits.length > 0) {
        throw new AppError(
          "A base unit already exists for this category.",
          409,
          "BASE_UNIT_ALREADY_EXISTS"
        );
      }

      payload.conversionFactor = 1;
    }

    return UnitOfMeasureRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const unit =
      await UnitOfMeasureRepository.findById(id);

    if (!unit) {
      throw new AppError(
        "Unit of measure not found.",
        404,
        "UNIT_OF_MEASURE_NOT_FOUND"
      );
    }

    return unit;
  }

  static async list(company = null) {
    const filter = {
      active: true
    };

    if (company) {
      filter.company = company;
    }

    return UnitOfMeasureRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code
        .trim()
        .toUpperCase();
    }

    return UnitOfMeasureRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return UnitOfMeasureRepository.delete(id);
  }
}

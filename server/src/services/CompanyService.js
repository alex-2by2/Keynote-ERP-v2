// server/src/services/CompanyService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import BranchRepository from "../repositories/BranchRepository.js";

export default class CompanyService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

    const exists = await CompanyRepository.existsByCode(code);

    if (exists) {
      throw new AppError(
        "Company code already exists.",
        409,
        "COMPANY_ALREADY_EXISTS"
      );
    }

    if (payload.headquarters) {
      const headquarters = await BranchRepository.findById(
        payload.headquarters
      );

      if (!headquarters) {
        throw new AppError(
          "Headquarters branch not found.",
          404,
          "HEADQUARTERS_NOT_FOUND"
        );
      }
    }

    return CompanyRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const company = await CompanyRepository.findById(id);

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    return company;
  }

  static async getByCode(code) {
    return CompanyRepository.findByCode(code);
  }

  static async list() {
    return CompanyRepository.list({
      active: true
    });
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code.trim().toUpperCase();
    }

    if (payload.headquarters) {
      const headquarters = await BranchRepository.findById(
        payload.headquarters
      );

      if (!headquarters) {
        throw new AppError(
          "Headquarters branch not found.",
          404,
          "HEADQUARTERS_NOT_FOUND"
        );
      }
    }

    return CompanyRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return CompanyRepository.delete(id);
  }
}

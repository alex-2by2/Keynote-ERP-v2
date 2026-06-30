// server/src/services/SupplierService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import SupplierRepository from "../repositories/SupplierRepository.js";

export default class SupplierService {
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
      await SupplierRepository.existsByCode(
        company.id,
        code
      );

    if (exists) {
      throw new AppError(
        "Supplier code already exists.",
        409,
        "SUPPLIER_ALREADY_EXISTS"
      );
    }

    return SupplierRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const supplier =
      await SupplierRepository.findById(id);

    if (!supplier) {
      throw new AppError(
        "Supplier not found.",
        404,
        "SUPPLIER_NOT_FOUND"
      );
    }

    return supplier;
  }

  static async getByCode(companyId, code) {
    return SupplierRepository.findByCode(
      companyId,
      code
    );
  }

  static async list(company = null) {
    const filter = {
      active: true
    };

    if (company) {
      filter.company = company;
    }

    return SupplierRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code
        .trim()
        .toUpperCase();
    }

    return SupplierRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return SupplierRepository.delete(id);
  }
}

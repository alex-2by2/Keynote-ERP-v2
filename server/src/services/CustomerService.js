// server/src/services/CustomerService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import CustomerRepository from "../repositories/CustomerRepository.js";

export default class CustomerService {
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
      await CustomerRepository.existsByCode(
        company.id,
        code
      );

    if (exists) {
      throw new AppError(
        "Customer code already exists.",
        409,
        "CUSTOMER_ALREADY_EXISTS"
      );
    }

    return CustomerRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const customer =
      await CustomerRepository.findById(id);

    if (!customer) {
      throw new AppError(
        "Customer not found.",
        404,
        "CUSTOMER_NOT_FOUND"
      );
    }

    return customer;
  }

  static async getByCode(companyId, code) {
    return CustomerRepository.findByCode(
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

    return CustomerRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code
        .trim()
        .toUpperCase();
    }

    return CustomerRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return CustomerRepository.delete(id);
  }
}

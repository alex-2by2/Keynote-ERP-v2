// server/src/services/CostCenterService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import DepartmentRepository from "../repositories/DepartmentRepository.js";
import EmployeeRepository from "../repositories/EmployeeRepository.js";
import CostCenterRepository from "../repositories/CostCenterRepository.js";

export default class CostCenterService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

    const [company, department, manager] = await Promise.all([
      CompanyRepository.findById(payload.company),
      payload.department
        ? DepartmentRepository.findById(payload.department)
        : Promise.resolve(null),
      payload.manager
        ? EmployeeRepository.findById(payload.manager)
        : Promise.resolve(null)
    ]);

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    if (payload.department && !department) {
      throw new AppError(
        "Department not found.",
        404,
        "DEPARTMENT_NOT_FOUND"
      );
    }

    if (payload.manager && !manager) {
      throw new AppError(
        "Manager not found.",
        404,
        "MANAGER_NOT_FOUND"
      );
    }

    const exists =
      await CostCenterRepository.existsByCode(
        company.id,
        code
      );

    if (exists) {
      throw new AppError(
        "Cost center code already exists.",
        409,
        "COST_CENTER_ALREADY_EXISTS"
      );
    }

    return CostCenterRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const costCenter =
      await CostCenterRepository.findById(id);

    if (!costCenter) {
      throw new AppError(
        "Cost center not found.",
        404,
        "COST_CENTER_NOT_FOUND"
      );
    }

    return costCenter;
  }

  static async list(company = null) {
    const filter = {};

    if (company) {
      filter.company = company;
    }

    filter.active = true;

    return CostCenterRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code
        .trim()
        .toUpperCase();
    }

    return CostCenterRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return CostCenterRepository.delete(id);
  }
}

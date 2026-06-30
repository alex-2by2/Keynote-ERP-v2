// server/src/services/WarehouseService.js

import AppError from "../utils/AppError.js";

import WarehouseRepository from "../repositories/WarehouseRepository.js";
import CompanyRepository from "../repositories/CompanyRepository.js";
import BranchRepository from "../repositories/BranchRepository.js";
import EmployeeRepository from "../repositories/EmployeeRepository.js";

export default class WarehouseService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

    const [company, branch, manager] = await Promise.all([
      CompanyRepository.findById(payload.company),
      BranchRepository.findById(payload.branch),
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

    if (!branch) {
      throw new AppError(
        "Branch not found.",
        404,
        "BRANCH_NOT_FOUND"
      );
    }

    if (payload.manager && !manager) {
      throw new AppError(
        "Warehouse manager not found.",
        404,
        "WAREHOUSE_MANAGER_NOT_FOUND"
      );
    }

    const exists =
      await WarehouseRepository.existsByCode(
        company.id,
        code
      );

    if (exists) {
      throw new AppError(
        "Warehouse code already exists.",
        409,
        "WAREHOUSE_ALREADY_EXISTS"
      );
    }

    return WarehouseRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const warehouse =
      await WarehouseRepository.findById(id);

    if (!warehouse) {
      throw new AppError(
        "Warehouse not found.",
        404,
        "WAREHOUSE_NOT_FOUND"
      );
    }

    return warehouse;
  }

  static async list(company = null) {
    const filter = {
      active: true
    };

    if (company) {
      filter.company = company;
    }

    return WarehouseRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code
        .trim()
        .toUpperCase();
    }

    return WarehouseRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return WarehouseRepository.delete(id);
  }
}

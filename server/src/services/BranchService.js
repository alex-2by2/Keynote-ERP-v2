// server/src/services/BranchService.js

import AppError from "../utils/AppError.js";

import BranchRepository from "../repositories/BranchRepository.js";
import EmployeeRepository from "../repositories/EmployeeRepository.js";

export default class BranchService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

    const exists = await BranchRepository.existsByCode(code);

    if (exists) {
      throw new AppError(
        "Branch code already exists.",
        409,
        "BRANCH_ALREADY_EXISTS"
      );
    }

    if (payload.manager) {
      const manager = await EmployeeRepository.findById(
        payload.manager
      );

      if (!manager) {
        throw new AppError(
          "Branch manager not found.",
          404,
          "BRANCH_MANAGER_NOT_FOUND"
        );
      }
    }

    return BranchRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const branch = await BranchRepository.findById(id);

    if (!branch) {
      throw new AppError(
        "Branch not found.",
        404,
        "BRANCH_NOT_FOUND"
      );
    }

    return branch;
  }

  static async getByCode(code) {
    return BranchRepository.findByCode(code);
  }

  static async list() {
    return BranchRepository.list({
      active: true
    });
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code.trim().toUpperCase();
    }

    if (payload.manager) {
      const manager = await EmployeeRepository.findById(
        payload.manager
      );

      if (!manager) {
        throw new AppError(
          "Branch manager not found.",
          404,
          "BRANCH_MANAGER_NOT_FOUND"
        );
      }
    }

    return BranchRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return BranchRepository.delete(id);
  }
}

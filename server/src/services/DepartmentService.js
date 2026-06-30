// server/src/services/DepartmentService.js

import DepartmentRepository from "../repositories/DepartmentRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import AppError from "../utils/AppError.js";

export default class DepartmentService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

    const exists = await DepartmentRepository.existsByCode(code);

    if (exists) {
      throw new AppError(
        "Department code already exists.",
        409,
        "DEPARTMENT_ALREADY_EXISTS"
      );
    }

    if (payload.manager) {
      const manager = await UserRepository.findById(payload.manager);

      if (!manager) {
        throw new AppError(
          "Department manager not found.",
          404,
          "MANAGER_NOT_FOUND"
        );
      }
    }

    return DepartmentRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const department = await DepartmentRepository.findById(id);

    if (!department) {
      throw new AppError(
        "Department not found.",
        404,
        "DEPARTMENT_NOT_FOUND"
      );
    }

    return department;
  }

  static async getByCode(code) {
    return DepartmentRepository.findByCode(code);
  }

  static async list() {
    return DepartmentRepository.list({
      active: true
    });
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code.trim().toUpperCase();
    }

    if (payload.manager) {
      const manager = await UserRepository.findById(payload.manager);

      if (!manager) {
        throw new AppError(
          "Department manager not found.",
          404,
          "MANAGER_NOT_FOUND"
        );
      }
    }

    return DepartmentRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return DepartmentRepository.delete(id);
  }
}

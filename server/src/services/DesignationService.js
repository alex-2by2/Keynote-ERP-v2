// server/src/services/DesignationService.js

import DesignationRepository from "../repositories/DesignationRepository.js";
import DepartmentRepository from "../repositories/DepartmentRepository.js";
import AppError from "../utils/AppError.js";

export default class DesignationService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

    const exists = await DesignationRepository.existsByCode(code);

    if (exists) {
      throw new AppError(
        "Designation code already exists.",
        409,
        "DESIGNATION_ALREADY_EXISTS"
      );
    }

    const department = await DepartmentRepository.findById(
      payload.department
    );

    if (!department) {
      throw new AppError(
        "Department not found.",
        404,
        "DEPARTMENT_NOT_FOUND"
      );
    }

    return DesignationRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const designation = await DesignationRepository.findById(id);

    if (!designation) {
      throw new AppError(
        "Designation not found.",
        404,
        "DESIGNATION_NOT_FOUND"
      );
    }

    return designation;
  }

  static async getByCode(code) {
    return DesignationRepository.findByCode(code);
  }

  static async list() {
    return DesignationRepository.list({
      active: true
    });
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code.trim().toUpperCase();
    }

    if (payload.department) {
      const department = await DepartmentRepository.findById(
        payload.department
      );

      if (!department) {
        throw new AppError(
          "Department not found.",
          404,
          "DEPARTMENT_NOT_FOUND"
        );
      }
    }

    return DesignationRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return DesignationRepository.delete(id);
  }
}

// server/src/services/EmployeeService.js

import AppError from "../utils/AppError.js";

import EmployeeRepository from "../repositories/EmployeeRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import DepartmentRepository from "../repositories/DepartmentRepository.js";
import DesignationRepository from "../repositories/DesignationRepository.js";

export default class EmployeeService {
  static async create(payload) {
    const employeeCode = payload.employeeCode
      .trim()
      .toUpperCase();

    const exists =
      await EmployeeRepository.existsByEmployeeCode(
        employeeCode
      );

    if (exists) {
      throw new AppError(
        "Employee code already exists.",
        409,
        "EMPLOYEE_ALREADY_EXISTS"
      );
    }

    const [user, department, designation] =
      await Promise.all([
        UserRepository.findById(payload.user),
        DepartmentRepository.findById(payload.department),
        DesignationRepository.findById(payload.designation)
      ]);

    if (!user) {
      throw new AppError(
        "User not found.",
        404,
        "USER_NOT_FOUND"
      );
    }

    if (!department) {
      throw new AppError(
        "Department not found.",
        404,
        "DEPARTMENT_NOT_FOUND"
      );
    }

    if (!designation) {
      throw new AppError(
        "Designation not found.",
        404,
        "DESIGNATION_NOT_FOUND"
      );
    }

    if (payload.reportingManager) {
      const manager =
        await EmployeeRepository.findById(
          payload.reportingManager
        );

      if (!manager) {
        throw new AppError(
          "Reporting manager not found.",
          404,
          "REPORTING_MANAGER_NOT_FOUND"
        );
      }
    }

    return EmployeeRepository.create({
      ...payload,
      employeeCode
    });
  }

  static async getById(id) {
    const employee =
      await EmployeeRepository.findById(id);

    if (!employee) {
      throw new AppError(
        "Employee not found.",
        404,
        "EMPLOYEE_NOT_FOUND"
      );
    }

    return employee;
  }

  static async list() {
    return EmployeeRepository.list();
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.employeeCode) {
      payload.employeeCode =
        payload.employeeCode
          .trim()
          .toUpperCase();
    }

    return EmployeeRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return EmployeeRepository.delete(id);
  }
}

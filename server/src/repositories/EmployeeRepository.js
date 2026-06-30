// server/src/repositories/EmployeeRepository.js

import Employee from "../models/Employee.js";

export default class EmployeeRepository {
  static async create(payload) {
    return Employee.create(payload);
  }

  static async findById(id) {
    return Employee.findById(id)
      .populate("user", "firstName lastName email role")
      .populate("department", "code name")
      .populate("designation", "code name level")
      .populate(
        "reportingManager",
        "employeeCode"
      );
  }

  static async findByEmployeeCode(employeeCode) {
    return Employee.findOne({
      employeeCode: employeeCode.trim().toUpperCase()
    })
      .populate("user", "firstName lastName email role")
      .populate("department", "code name")
      .populate("designation", "code name level")
      .populate(
        "reportingManager",
        "employeeCode"
      );
  }

  static async existsByEmployeeCode(employeeCode) {
    return Employee.exists({
      employeeCode: employeeCode.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Employee.find(filter)
      .populate("user", "firstName lastName email role")
      .populate("department", "code name")
      .populate("designation", "code name level")
      .populate(
        "reportingManager",
        "employeeCode"
      )
      .sort({
        employeeCode: 1
      });
  }

  static async update(id, payload) {
    return Employee.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("user", "firstName lastName email role")
      .populate("department", "code name")
      .populate("designation", "code name level")
      .populate(
        "reportingManager",
        "employeeCode"
      );
  }

  static async delete(id) {
    return Employee.findByIdAndDelete(id);
  }
}

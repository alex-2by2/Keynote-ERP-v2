// server/src/repositories/BranchRepository.js

import Branch from "../models/Branch.js";

export default class BranchRepository {
  static async create(payload) {
    return Branch.create(payload);
  }

  static async findById(id) {
    return Branch.findById(id).populate({
      path: "manager",
      select: "employeeCode",
      populate: {
        path: "user",
        select: "firstName lastName email"
      }
    });
  }

  static async findByCode(code) {
    return Branch.findOne({
      code: code.trim().toUpperCase()
    }).populate({
      path: "manager",
      select: "employeeCode",
      populate: {
        path: "user",
        select: "firstName lastName email"
      }
    });
  }

  static async existsByCode(code) {
    return Branch.exists({
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Branch.find(filter)
      .populate({
        path: "manager",
        select: "employeeCode",
        populate: {
          path: "user",
          select: "firstName lastName email"
        }
      })
      .sort({
        name: 1
      });
  }

  static async update(id, payload) {
    return Branch.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    ).populate({
      path: "manager",
      select: "employeeCode",
      populate: {
        path: "user",
        select: "firstName lastName email"
      }
    });
  }

  static async delete(id) {
    return Branch.findByIdAndDelete(id);
  }
}

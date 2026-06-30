// server/src/repositories/CustomerRepository.js

import Customer from "../models/Customer.js";

export default class CustomerRepository {
  static async create(payload) {
    return Customer.create(payload);
  }

  static async findById(id) {
    return Customer.findById(id).populate(
      "company",
      "code displayName"
    );
  }

  static async findByCode(companyId, code) {
    return Customer.findOne({
      company: companyId,
      code: code.trim().toUpperCase()
    }).populate(
      "company",
      "code displayName"
    );
  }

  static async existsByCode(companyId, code) {
    return Customer.exists({
      company: companyId,
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Customer.find(filter)
      .populate(
        "company",
        "code displayName"
      )
      .sort({
        name: 1
      });
  }

  static async update(id, payload) {
    return Customer.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    ).populate(
      "company",
      "code displayName"
    );
  }

  static async delete(id) {
    return Customer.findByIdAndDelete(id);
  }
}

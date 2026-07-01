// server/src/repositories/CompanyRepository.js

import Company from "../models/Company.js";

export default class CompanyRepository {
  static async create(
  payload,
  session = null
) {
  if (session) {
    const [company] =
      await Company.create(
        [payload],
        { session }
      );

    return company;
  }

  return Company.create(payload);
}

  static async findById(id) {
    return Company.findById(id).populate(
      "headquarters",
      "code name city state country"
    );
  }

  static async findByCode(code) {
    return Company.findOne({
      code: code.trim().toUpperCase()
    }).populate(
      "headquarters",
      "code name city state country"
    );
  }

  static async existsByCode(code) {
    return Company.exists({
      code: code.trim().toUpperCase()
    });
  }

  static async list(filter = {}) {
    return Company.find(filter)
      .populate(
        "headquarters",
        "code name city state country"
      )
      .sort({
        legalName: 1
      });
  }

  static async update(id, payload) {
    return Company.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    ).populate(
      "headquarters",
      "code name city state country"
    );
  }

  static async delete(id) {
    return Company.findByIdAndDelete(id);
  }
}

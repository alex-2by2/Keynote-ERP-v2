// server/src/services/AccountGroupService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import AccountGroupRepository from "../repositories/AccountGroupRepository.js";

export default class AccountGroupService {
  static async create(payload) {
    const company = await CompanyRepository.findById(
      payload.company
    );

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    const code = payload.code.trim().toUpperCase();

    const exists =
      await AccountGroupRepository.existsByCode(
        company.id,
        code
      );

    if (exists) {
      throw new AppError(
        "Account group code already exists.",
        409,
        "ACCOUNT_GROUP_EXISTS"
      );
    }

    if (payload.parentGroup) {
      const parent =
        await AccountGroupRepository.findById(
          payload.parentGroup
        );

      if (!parent) {
        throw new AppError(
          "Parent account group not found.",
          404,
          "PARENT_ACCOUNT_GROUP_NOT_FOUND"
        );
      }
    }

    return AccountGroupRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const accountGroup =
      await AccountGroupRepository.findById(id);

    if (!accountGroup) {
      throw new AppError(
        "Account group not found.",
        404,
        "ACCOUNT_GROUP_NOT_FOUND"
      );
    }

    return accountGroup;
  }

  static async list(company = null) {
    const filter = {
      active: true
    };

    if (company) {
      filter.company = company;
    }

    return AccountGroupRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code
        .trim()
        .toUpperCase();
    }

    return AccountGroupRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return AccountGroupRepository.delete(id);
  }
}

// server/src/services/ItemCategoryService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import ItemCategoryRepository from "../repositories/ItemCategoryRepository.js";

export default class ItemCategoryService {
  static async create(payload) {
    const code = payload.code.trim().toUpperCase();

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

    const exists =
      await ItemCategoryRepository.existsByCode(
        company.id,
        code
      );

    if (exists) {
      throw new AppError(
        "Item category code already exists.",
        409,
        "ITEM_CATEGORY_ALREADY_EXISTS"
      );
    }

    if (payload.parentCategory) {
      const parent =
        await ItemCategoryRepository.findById(
          payload.parentCategory
        );

      if (!parent) {
        throw new AppError(
          "Parent category not found.",
          404,
          "PARENT_CATEGORY_NOT_FOUND"
        );
      }
    }

    return ItemCategoryRepository.create({
      ...payload,
      code
    });
  }

  static async getById(id) {
    const category =
      await ItemCategoryRepository.findById(id);

    if (!category) {
      throw new AppError(
        "Item category not found.",
        404,
        "ITEM_CATEGORY_NOT_FOUND"
      );
    }

    return category;
  }

  static async list(company = null) {
    const filter = {
      active: true
    };

    if (company) {
      filter.company = company;
    }

    return ItemCategoryRepository.list(filter);
  }

  static async update(id, payload) {
    await this.getById(id);

    if (payload.code) {
      payload.code = payload.code
        .trim()
        .toUpperCase();
    }

    if (payload.parentCategory) {
      const parent =
        await ItemCategoryRepository.findById(
          payload.parentCategory
        );

      if (!parent) {
        throw new AppError(
          "Parent category not found.",
          404,
          "PARENT_CATEGORY_NOT_FOUND"
        );
      }
    }

    return ItemCategoryRepository.update(
      id,
      payload
    );
  }

  static async delete(id) {
    await this.getById(id);

    return ItemCategoryRepository.delete(id);
  }
}

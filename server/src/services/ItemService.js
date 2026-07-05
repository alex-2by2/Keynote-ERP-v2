// server/src/services/ItemService.js

import AppError from "../utils/AppError.js";

import CompanyRepository from "../repositories/CompanyRepository.js";
import ItemCategoryRepository from "../repositories/ItemCategoryRepository.js";
import UnitOfMeasureRepository from "../repositories/UnitOfMeasureRepository.js";
import ItemRepository from "../repositories/ItemRepository.js";

export default class ItemService {
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

    const category =
      await ItemCategoryRepository.findById(
        payload.category
      );

    if (!category) {
      throw new AppError(
        "Item category not found.",
        404,
        "ITEM_CATEGORY_NOT_FOUND"
      );
    }

    const unit =
      await UnitOfMeasureRepository.findById(
        payload.unit
      );

    if (!unit) {
      throw new AppError(
        "Unit of measure not found.",
        404,
        "UNIT_OF_MEASURE_NOT_FOUND"
      );
    }

    const code = payload.code.trim().toUpperCase();
    const sku = payload.sku.trim().toUpperCase();

    const [codeExists, skuExists] = await Promise.all([
      ItemRepository.existsByCode(company.id, code),
      ItemRepository.existsBySku(company.id, sku)
    ]);

    if (codeExists) {
      throw new AppError(
        "Item code already exists.",
        409,
        "ITEM_CODE_ALREADY_EXISTS"
      );
    }

    if (skuExists) {
      throw new AppError(
        "Item SKU already exists.",
        409,
        "ITEM_SKU_ALREADY_EXISTS"
      );
    }

    if (payload.barcode && payload.barcode.trim()) {
      const barcodeExists =
        await ItemRepository.existsByBarcode(
          company.id,
          payload.barcode
        );

      if (barcodeExists) {
        throw new AppError(
          "Barcode already exists.",
          409,
          "ITEM_BARCODE_ALREADY_EXISTS"
        );
      }
    }

    return ItemRepository.create({
      ...payload,
      code,
      sku
    });
  }

  static async getById(id) {
    const item = await ItemRepository.findById(id);

    if (!item) {
      throw new AppError(
        "Item not found.",
        404,
        "ITEM_NOT_FOUND"
      );
    }

    return item;
  }

  static async list(company = null) {
    const filter = {
      active: true
    };

    if (company) {
      filter.company = company;
    }

    return ItemRepository.list(filter);
  }

  static async update(id, payload) {
    const existingItem = await this.getById(id);

    if (payload.code) {
      payload.code = payload.code.trim().toUpperCase();
    }

    if (payload.sku) {
      payload.sku = payload.sku.trim().toUpperCase();
    }

    if (payload.barcode && payload.barcode.trim()) {
      const barcodeExists =
        await ItemRepository.existsByBarcode(
          existingItem.company._id || existingItem.company,
          payload.barcode,
          id
        );

      if (barcodeExists) {
        throw new AppError(
          "Barcode already exists.",
          409,
          "ITEM_BARCODE_ALREADY_EXISTS"
        );
      }
    }

    return ItemRepository.update(id, payload);
  }

  static async delete(id) {
    await this.getById(id);

    return ItemRepository.delete(id);
  }
}

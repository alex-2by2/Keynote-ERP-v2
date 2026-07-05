// server/src/services/DashboardService.js

import Company from "../models/Company.js";
import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import Item from "../models/Item.js";

export default class DashboardService {
  static async getStats() {
    const [
      companyTotal,
      customerTotal,
      customerActive,
      supplierTotal,
      supplierActive,
      itemTotal,
      itemActive
    ] = await Promise.all([
      Company.countDocuments(),
      Customer.countDocuments(),
      Customer.countDocuments({ active: true }),
      Supplier.countDocuments(),
      Supplier.countDocuments({ active: true }),
      Item.countDocuments(),
      Item.countDocuments({ active: true })
    ]);

    return {
      companies: {
        total: companyTotal
      },
      customers: {
        total: customerTotal,
        active: customerActive
      },
      suppliers: {
        total: supplierTotal,
        active: supplierActive
      },
      items: {
        total: itemTotal,
        active: itemActive
      }
    };
  }
}
